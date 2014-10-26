#!/usr/bin/env python3
"""加载 solvers/python/solution.py 并执行 metadata.tests。"""
from __future__ import annotations

import json
import re
import sys
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
        actual = candidate(**args)
        if actual != expected:
            raise AssertionError(f"tests[{index}]: expected {expected!r}, got {actual!r}, args={args!r}")


def run_solver(problem_dir: Path) -> None:
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
    run_check(candidate, tests)


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: run_python_solver.py <problem-dir>", file=sys.stderr)
        return 2

    problem_dir = Path(sys.argv[1])
    if not problem_dir.is_dir():
        print(f"missing problem dir: {problem_dir}", file=sys.stderr)
        return 2

    try:
        run_solver(problem_dir)
    except Exception as exc:  # noqa: BLE001
        print(f"FAILED {problem_dir}: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
