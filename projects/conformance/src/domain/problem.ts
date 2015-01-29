/** 单题测试用例；题目目录 `metadata.json` 为事实所有者。 */
export type TestCase = {
    args: Record<string, unknown>;
    expected: unknown;
};

/** 稳定题目标识与元数据；catalog 仅为索引视图。 */
export type ProblemSpec = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    tests: TestCase[];
    invoke: Record<string, string | undefined>;
};

/** 某题某一语言实现的入口声明。 */
export type ImplementationSpec = {
    /** 与适配器注册 ID 一致，如 `python`、`typescript-node`。 */
    implementationId: string;
    problemId: string;
    invokeKey: string;
    solverPath: string;
};
