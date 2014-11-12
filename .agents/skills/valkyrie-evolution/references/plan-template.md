# 演进切片计划模板

复制一节用于每个上游切片（可写在 issue、handoff 或会话开头， **不必** 提交独立 markdown 文件）。

---

## 切片：<标题>

### 动机

- **Backlog ID**：V-0xx
- **leetcode**：`projects/problems/<slug>/`（coach 算法一句话）
- **现状**：阻塞注释 / `legion` 报错摘要

### 目标能力

- 用户可见 API（签名级，V 语法）：
- 不在本切片范围：

### 上游改动

| 仓            | 路径                      | 改动摘要 |
|---------------|---------------------------|----------|
| `valkyrie.v`  | `projects/std/source/...` |          |
| `valkyrie.v`  | `projects/std/test/...`   |          |
| `valkyrie.rs` | （若需要）                |          |

### 验收

1. 上游：`legion test` 或 std 单测命令（写全）
2. leetcode：`legion build .../solvers/valkyrie --target node` 通过
3. （可选）`metadata.tests` 全绿

### 风险与回滚

- API 破坏性：
- 依赖 adaptor / Wasm：

### 完成后

- [ ] 更新 `capability-backlog.md` 状态
- [ ] 删除 `solution.v` 阻塞注释
- [ ] 若扩大 phase-1，改 `v-phase1-capabilities.md`
