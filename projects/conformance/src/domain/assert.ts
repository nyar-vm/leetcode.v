/** `void` 解返回 `undefined`；metadata 用 `null` 表示无返回值断言。 */
export function normalizeTsTestResult(value: unknown): unknown {
    return value === undefined ? null : value;
}

/** metadata 中 `expected: "Error: ..."` 表示应抛出异常且消息匹配。 */
export function assertTestCase(index: number, expected: unknown, run: () => unknown): void {
    if (typeof expected === 'string' && expected.startsWith('Error:')) {
        try {
            run();
        } catch (err) {
            const actual = err instanceof Error ? `Error: ${err.message}` : `Error: ${String(err)}`;
            if (actual !== expected) {
                throw new Error(`tests[${index}]: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
            }
            return;
        }
        throw new Error(`tests[${index}]: expected ${JSON.stringify(expected)}, no exception raised`);
    }
    const actual = normalizeTsTestResult(run());
    const normalized = normalizeTsTestResult(expected);
    if (JSON.stringify(actual) !== JSON.stringify(normalized)) {
        throw new Error(`tests[${index}]: expected ${JSON.stringify(normalized)}, got ${JSON.stringify(actual)}`);
    }
}
