#!/usr/bin/env python3
"""加载 solvers/python/solution.py 并执行 metadata.tests。"""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path
from typing import Any, Callable


def slug_to_python_project(slug: str) -> str:
    name = slug.replace("-", "_")
    if re.match(r"^[0-9]", name):
        name = f"lc_{name}"
    return name


def load_metadata(problem_dir: Path) -> dict[str, Any]:
    meta_path = problem_dir / "metadata.json"
    if not meta_path.is_file():
        raise FileNotFoundError(f"missing metadata: {meta_path}")
    return json.loads(meta_path.read_text(encoding="utf-8"))


def _read_pair(prelude_path: Path, solution_path: Path) -> str | None:
    if prelude_path.is_file() and solution_path.is_file():
        prelude = prelude_path.read_text(encoding="utf-8").rstrip()
        solution = solution_path.read_text(encoding="utf-8").lstrip()
        if prelude:
            return f"{prelude}\n\n{solution}\n"
        return f"{solution}\n"
    if solution_path.is_file():
        return solution_path.read_text(encoding="utf-8")
    return None


def load_python_source(problem_dir: Path, slug: str) -> str:
    canonical = problem_dir / "solvers" / "python" / "solution.py"
    if canonical.is_file():
        return canonical.read_text(encoding="utf-8")

    project_name = slug_to_python_project(slug)
    legacy_roots = [
        problem_dir / "solvers" / "python" / project_name,
        problem_dir / "solvers" / "python" / "reference",
        problem_dir / "solvers" / "python" / "lcd",
        problem_dir / "solvers" / "python",
    ]
    for root in legacy_roots:
        merged = _read_pair(root / "prelude.py", root / "solution.py")
        if merged is not None:
            return merged
        nested = root / project_name
        merged = _read_pair(nested / "prelude.py", nested / "solution.py")
        if merged is not None:
            return merged

    raise FileNotFoundError(f"missing solvers/python/solution.py (or legacy layout) under {problem_dir}")


def resolve_candidate(entry_point: str, namespace: dict[str, Any]) -> Callable[..., Any]:
    expr = entry_point.strip()
    if "(" in expr:
        return eval(expr, namespace)  # noqa: S307
    return namespace[expr]


def run_check(candidate: Callable[..., Any], tests: list[dict[str, Any]]) -> None:
    for index, case in enumerate(tests):
        args = case.get("args")
        if not isinstance(args, dict):
            raise ValueError(f"tests[{index}].args 必须是 object")
        expected = case["expected"]
        try:
            actual = candidate(**args)
        except Exception as exc:  # noqa: BLE001
            if isinstance(expected, str) and expected.startswith("Error:"):
                actual_err = f"Error: {exc}"
                if actual_err == expected:
                    continue
                raise AssertionError(
                    f"tests[{index}]: expected {expected!r}, got {actual_err!r}, args={args!r}",
                ) from exc
            raise
        if isinstance(expected, str) and expected.startswith("Error:"):
            raise AssertionError(
                f"tests[{index}]: expected {expected!r}, no exception raised, args={args!r}",
            )
        if actual != expected:
            raise AssertionError(f"tests[{index}]: expected {expected!r}, got {actual!r}, args={args!r}")


def load_solver_context(problem_dir: Path) -> tuple[Callable[..., Any], list[dict[str, Any]]]:
    python_dir = problem_dir / "solvers" / "python"
    if not (python_dir / "pyproject.toml").is_file():
        raise FileNotFoundError(f"missing solvers/python/pyproject.toml under {problem_dir}")

    meta = load_metadata(problem_dir)
    slug = meta.get("id") or meta.get("task_id")
    if not slug:
        raise ValueError("metadata.id 缺失")

    tests = meta.get("tests")
    if not tests:
        raise ValueError("metadata.tests 为空")

    invoke = meta.get("invoke") or {}
    entry_point = invoke.get("python")
    if not entry_point:
        raise ValueError("metadata.invoke.python 缺失")

    source = load_python_source(problem_dir, slug)
    namespace: dict[str, Any] = {"__name__": "__main__"}
    exec(source, namespace)  # noqa: S102
    candidate = resolve_candidate(entry_point, namespace)
    return candidate, tests


def run_solver(problem_dir: Path) -> None:
    candidate, tests = load_solver_context(problem_dir)
    run_check(candidate, tests)


def median_ms(values: list[float]) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    mid = len(ordered) // 2
    if len(ordered) % 2 == 0:
        return (ordered[mid - 1] + ordered[mid]) / 2.0
    return ordered[mid]


def bench_solver(problem_dir: Path, iterations: int, warmup: int) -> float:
    """单 Python 进程内加载题解后只计 metadata.tests 循环（对齐 TS in-process）。"""
    candidate, tests = load_solver_context(problem_dir)

    def run_all() -> None:
        run_check(candidate, tests)

    for _ in range(warmup):
        run_all()

    samples: list[float] = []
    for _ in range(iterations):
        start = time.perf_counter()
        run_all()
        samples.append((time.perf_counter() - start) * 1000.0)
    return median_ms(samples)


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: run_python_solver.py <problem-dir> [--bench [--iterations N] [--warmup N]]", file=sys.stderr)
        return 2

    problem_dir = Path(sys.argv[1])
    if not problem_dir.is_dir():
        print(f"missing problem dir: {problem_dir}", file=sys.stderr)
        return 2

    bench_mode = "--bench" in sys.argv[2:]
    iterations = 50
    warmup = 5
    if bench_mode:
        for index, token in enumerate(sys.argv[2:], start=2):
            if token == "--iterations" and index + 1 < len(sys.argv):
                iterations = int(sys.argv[index + 1])
            elif token == "--warmup" and index + 1 < len(sys.argv):
                warmup = int(sys.argv[index + 1])

    try:
        if bench_mode:
            median = bench_solver(problem_dir, iterations, warmup)
            print(json.dumps({"medianMs": median}))
        else:
            run_solver(problem_dir)
    except Exception as exc:  # noqa: BLE001
        print(f"FAILED {problem_dir}: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
