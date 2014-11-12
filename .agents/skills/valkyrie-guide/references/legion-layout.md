# legion 工程布局（leetcode.v）

## 单题

```text
projects/problems/<slug>/solvers/valkyrie/
├── legion.von
└── solution.v
```

## `legion.von` 最小字段

```von
{
  name: "leetcode-<slug>",
  version: "0.1.0",
  entry: "solution.v",
  dependencies: {
    core: true,
    std: true
  },
  build: [
    {
      target: "node"
    }
  ]
}
```

## workspace

仓库根 `legions.von` 将 `core` / `std` 指向 `../valkyrie.v/projects/...`。勿在题目 `legion.von` 写绝对盘符。

## 命令（本机）

使用 **`valkyrie.rs` Rust seed** `legion`（非 `valkyrie.v` 自举 `legion.tools`）。见 `AGENTS.md` §维护者陷阱。

```text
legion build solvers/valkyrie --target node -o .cache/out
legion test solvers/valkyrie --target node
```

路径相对于题目目录或传入绝对路径。leetcode 基准以外部 harness 跑 `metadata.tests` 为准，不依赖源码内 `[benchmark]`。
