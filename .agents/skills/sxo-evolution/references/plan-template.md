# SXO 演进切片计划模板

复制一节用于每个上游切片（issue、handoff 或会话开头，**不必** 提交独立 markdown 文件）。

---

## 切片：<标题>

### 动机

- **Backlog ID**：S-0xx
- **leetcode**：`projects/problems/<slug>/`（coach 算法一句话）
- **方言**：Wolfram (sxo) / MATLAB (sxo)
- **现状**：阻塞注释 / `Expression.diagnostics` / matrix status

### 目标能力

- 用户可见行为（evaluate 输入/输出级）：
- feature matrix 目标状态：`supported` | `partial`
- 不在本切片范围：

### 上游改动

| 包 / 路径 | 改动摘要 |
|-----------|----------|
| `@sxo/mathematica` 或 `@sxo/matlab` | |
| `projects/dialects/sxo-dialect-*`（若需） | |
| `projects/platforms/native`（若需） | |

### 验收

1. 上游：`pnpm --filter @sxo/<pkg> test` 或指定 matrix case
2. leetcode：单题 `metadata.tests` 全绿（对应 sxo 脚本）
3. （可选）bench 行 `runtimeMs` 非 null，看板标签含 **(sxo)**

### 风险与回滚

- 渲染格式变化是否影响已有 matrix case：
- native ABI / 平台包：

### 完成后

- [ ] 更新 `capability-backlog.md` 状态
- [ ] 删除单脚本 `# 阻塞：` 行
- [ ] 确认未冒充官方 Wolfram / MATLAB 兼容性
