import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    renameSync,
    writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

import { CONFORMANCE_CACHE_ROOT } from "../../domain/paths.ts";
import type { AttemptRecord } from "../../domain/measurement.ts";
import type { ConformanceIndex, IndexEntry, RunManifest, RunRecord } from "./types.ts";
import { indexKey } from "./types.ts";

const RUNS_DIR = join(CONFORMANCE_CACHE_ROOT, "runs");
const INDEX_PATH = join(CONFORMANCE_CACHE_ROOT, "indexes", "latest.json");

function runDir(runId: string): string {
    return join(RUNS_DIR, runId);
}

export function readIndex(): ConformanceIndex {
    if (!existsSync(INDEX_PATH)) {
        return { updatedAt: new Date(0).toISOString(), entries: {} };
    }
    return JSON.parse(readFileSync(INDEX_PATH, "utf8")) as ConformanceIndex;
}

function writeIndexAtomic(index: ConformanceIndex): void {
    mkdirSync(dirname(INDEX_PATH), { recursive: true });
    const tempPath = `${INDEX_PATH}.${process.pid}.tmp`;
    writeFileSync(tempPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");
    renameSync(tempPath, INDEX_PATH);
}

export function appendAttempt(runId: string, attempt: AttemptRecord): void {
    const attemptsPath = join(runDir(runId), "attempts.jsonl");
    mkdirSync(dirname(attemptsPath), { recursive: true });
    appendFileSync(attemptsPath, `${JSON.stringify(attempt)}\n`, "utf8");
}

/** 先写完整 run，再原子更新索引。 */
export function writeRunRecord(record: RunRecord, markCurrent = true): void {
    const dir = runDir(record.manifest.runId);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
        join(dir, "manifest.json"),
        `${JSON.stringify(record.manifest, null, 2)}\n`,
        "utf8",
    );
    writeFileSync(join(dir, "result.json"), `${JSON.stringify(record.result, null, 2)}\n`, "utf8");
    if (record.measurement) {
        writeFileSync(
            join(dir, "measurement.json"),
            `${JSON.stringify(record.measurement, null, 2)}\n`,
            "utf8",
        );
        const attemptsPath = join(dir, "attempts.jsonl");
        for (const attempt of record.measurement.attempts) {
            appendFileSync(attemptsPath, `${JSON.stringify(attempt)}\n`, "utf8");
        }
    }

    const index = readIndex();
    const key = indexKey(
        record.manifest.problemId,
        record.manifest.implementationId,
        record.manifest.mode,
    );
    if (markCurrent) {
        for (const [entryKey, entry] of Object.entries(index.entries)) {
            if (entryKey === key) {
                index.entries[entryKey] = { ...entry, current: false };
            }
        }
    }
    const entry: IndexEntry = {
        runId: record.manifest.runId,
        createdAt: record.manifest.createdAt,
        sourceDigest: record.manifest.sourceDigest,
        status: record.result.status,
        current: markCurrent,
    };
    index.entries[key] = entry;
    index.updatedAt = new Date().toISOString();
    writeIndexAtomic(index);
}

export function readRunRecord(runId: string): RunRecord | null {
    const dir = runDir(runId);
    const manifestPath = join(dir, "manifest.json");
    const resultPath = join(dir, "result.json");
    if (!existsSync(manifestPath) || !existsSync(resultPath)) {
        return null;
    }
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as RunManifest;
    const result = JSON.parse(readFileSync(resultPath, "utf8")) as RunRecord["result"];
    const measurementPath = join(dir, "measurement.json");
    const measurement = existsSync(measurementPath)
        ? (JSON.parse(readFileSync(measurementPath, "utf8")) as RunRecord["measurement"])
        : undefined;
    return { manifest, result, measurement };
}

export function resolveCurrentRunId(
    problemId: string,
    implementationId: string,
    mode: "correctness" | "benchmark",
): string | null {
    const index = readIndex();
    const entry = index.entries[indexKey(problemId, implementationId, mode)];
    return entry?.current ? entry.runId : null;
}

export function listCurrentRunRecords(): RunRecord[] {
    const index = readIndex();
    const records: RunRecord[] = [];
    for (const entry of Object.values(index.entries)) {
        if (!entry.current) {
            continue;
        }
        const record = readRunRecord(entry.runId);
        if (record) {
            records.push(record);
        }
    }
    return records;
}
