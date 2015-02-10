#!/usr/bin/env node
/**
 * 批量 reword commit message（UTF-8 安全，适配 Windows）。
 *
 * 规范见根目录 AGENTS.md「Git 提交（gitmoji）」。
 *
 * 用法：
 *   node scripts/reword.mjs --help
 *   node scripts/reword.mjs --lint-log --base origin/dev
 *   node scripts/reword.mjs --lint --file scripts/reword.example.txt
 *   node scripts/reword.mjs --dry-run --file reword.pending.txt --base origin/dev
 *   node scripts/reword.mjs --file reword.pending.txt --base origin/dev
 *
 * 消息文件格式（UTF-8）：
 *   - 每个 commit 一块，块之间用单独一行的 `---` 分隔
 *   - 块首行 = subject（gitmoji + 英文祈使句，末尾无句号）
 *   - 后续非空行 = body（可选，英文，句号结尾，禁止分号）
 *
 * 流程建议：
 *   1. git log --oneline <base>..HEAD 核对待改 commit 数量
 *   2. 按顺序写入 reword.pending.txt（勿提交该文件，已 gitignore）
 *   3. node scripts/reword.mjs --lint --file reword.pending.txt
 *   4. node scripts/reword.mjs --dry-run --file reword.pending.txt --base origin/dev
 *   5. node scripts/reword.mjs --file reword.pending.txt --base origin/dev
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statePath = join(root, '.git', 'reword-state.json');

const HELP = `reword.mjs — batch reword commit messages (UTF-8 safe)

Options:
  --file <path>       Message file (blocks separated by ---)
  --base <ref>        Reword commits after this ref (default: origin/dev)
  --dry-run           Print plan without running git rebase
  --lint              Lint messages in --file
  --lint-log          Lint existing commits in <base>..HEAD
  --help              Show this help

Examples:
  node scripts/reword.mjs --lint-log --base origin/dev
  node scripts/reword.mjs --lint --file scripts/reword.example.txt
  node scripts/reword.mjs --file reword.pending.txt --base origin/dev
`;

/** @param {string[]} argv */
function parseArgs(argv) {
    const opts = {
        file: '',
        base: 'origin/dev',
        dryRun: false,
        lint: false,
        lintLog: false,
        help: false,
    };
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--help' || arg === '-h') {
            opts.help = true;
        } else if (arg === '--file') {
            opts.file = argv[++i] ?? '';
        } else if (arg === '--base') {
            opts.base = argv[++i] ?? '';
        } else if (arg === '--dry-run') {
            opts.dryRun = true;
        } else if (arg === '--lint') {
            opts.lint = true;
        } else if (arg === '--lint-log') {
            opts.lintLog = true;
        } else {
            console.error(`reword: unknown argument: ${arg}`);
            process.exit(1);
        }
    }
    return opts;
}

/** @param {string} text */
function parseMessageFile(text) {
    return text
        .replace(/\r\n/g, '\n')
        .split(/\n---\n/)
        .map((block) => block.trim())
        .filter(Boolean);
}

/**
 * @param {string} raw
 * @returns {{ subject: string, body: string }}
 */
function splitMessage(raw) {
    const lines = raw.split('\n');
    const subject = (lines[0] ?? '').trim();
    const body = lines.slice(1).join('\n').trim();
    return { subject, body };
}

/** @param {string} raw */
function formatMessage(raw) {
    const { subject, body } = splitMessage(raw);
    return body ? `${subject}\n\n${body}\n` : `${subject}\n`;
}

const EMOJI_START = /^\p{Extended_Pictographic}/u;
const MILESTONE = /\b(phase\s*[-_]?\s*\d|m\d|s\d|a\d|f\d|gate[- ]?\d)\b/i;
const BARE_TS = /\bTS\b(?![a-z])/;

/** @param {string} raw @param {string} [label] */
function lintMessage(raw, label = 'message') {
    const errors = [];
    const { subject, body } = splitMessage(raw);
    const full = body ? `${subject}\n${body}` : subject;

    if (!subject) {
        errors.push(`${label}: subject is empty`);
        return errors;
    }
    if (!EMOJI_START.test(subject)) {
        errors.push(`${label}: subject must start with a real gitmoji character`);
    }
    if (subject.endsWith('.')) {
        errors.push(`${label}: subject must not end with a period`);
    }
    if (/[;；]/.test(full)) {
        errors.push(`${label}: must not contain semicolons (use periods or new lines)`);
    }
    if (MILESTONE.test(full)) {
        errors.push(`${label}: must not contain internal milestone codes (Phase, Gate-N, etc.)`);
    }
    if (BARE_TS.test(full)) {
        errors.push(`${label}: write TypeScript in full instead of bare TS`);
    }
    if (/\b0\.\d+\.\d+\b/.test(full)) {
        errors.push(`${label}: avoid version numbers in commit messages`);
    }
    return errors;
}

/** @param {string[]} args */
function git(...args) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    if (result.status !== 0) {
        const detail = (result.stderr || result.stdout || '').trim();
        throw new Error(detail || `git ${args.join(' ')} failed`);
    }
    return (result.stdout ?? '').trimEnd();
}

function assertCleanWorktree() {
    const status = git('status', '--porcelain');
    if (status) {
        throw new Error('working tree is not clean. Commit or stash changes before reword.');
    }
}

/** @param {string} base */
function listCommits(base) {
    const out = git('log', '--reverse', '--format=%H %s', `${base}..HEAD`);
    if (!out) {
        return [];
    }
    return out.split('\n').map((line) => {
        const space = line.indexOf(' ');
        return { hash: line.slice(0, space), subject: line.slice(space + 1) };
    });
}

/** @param {string} path */
function readMessagesFile(path) {
    const abs = resolve(root, path);
    if (!existsSync(abs)) {
        throw new Error(`message file not found: ${path}`);
    }
    const messages = parseMessageFile(readFileSync(abs, 'utf8'));
    if (messages.length === 0) {
        throw new Error(`no commit blocks in ${path}`);
    }
    return messages;
}

/** @param {string} base @param {string[]} messages @param {boolean} dryRun */
function planReword(base, messages, dryRun) {
    const commits = listCommits(base);
    if (commits.length === 0) {
        throw new Error(`no commits in range ${base}..HEAD`);
    }
    if (messages.length !== commits.length) {
        throw new Error(`message count (${messages.length}) does not match commit count (${commits.length}) in ${base}..HEAD`);
    }

    console.log(`reword plan: ${commits.length} commit(s) after ${base}\n`);
    for (let i = 0; i < commits.length; i++) {
        const { hash, subject } = commits[i];
        const { subject: nextSubject } = splitMessage(messages[i]);
        console.log(`${hash.slice(0, 8)}  ${subject}`);
        console.log(`       ->  ${nextSubject}\n`);
    }

    for (const [i, msg] of messages.entries()) {
        const errors = lintMessage(msg, `block ${i + 1}`);
        for (const err of errors) {
            console.error(`lint: ${err}`);
        }
        if (errors.length > 0) {
            process.exit(1);
        }
    }

    if (dryRun) {
        console.log('dry-run: no rebase performed');
        return;
    }
}

/** @param {string} base @param {string[]} messages */
function runReword(base, messages) {
    planReword(base, messages, false);
    assertCleanWorktree();

    writeFileSync(statePath, JSON.stringify({ index: 0, messages }, null, 2), 'utf8');

    // Copy editor into .git so rebase steps before this script exists can still invoke it.
    const editorCopy = join(root, '.git', 'reword-editor.mjs');
    writeFileSync(editorCopy, readFileSync(join(root, 'scripts', 'reword.mjs'), 'utf8'), 'utf8');

    const node = process.execPath;
    const env = {
        ...process.env,
        GIT_SEQUENCE_EDITOR: `"${node}" "${editorCopy}" --sequence-editor`,
        GIT_EDITOR: `"${node}" "${editorCopy}" --commit-editor`,
    };

    const result = spawnSync('git', ['rebase', '-i', base], {
        cwd: root,
        env,
        stdio: 'inherit',
        shell: true,
    });

    if (existsSync(statePath)) {
        unlinkSync(statePath);
    }
    if (existsSync(editorCopy)) {
        unlinkSync(editorCopy);
    }

    if (result.status !== 0) {
        process.exit(result.status === null ? 1 : result.status);
    }
}

/** @param {string} todoPath */
function sequenceEditor(todoPath) {
    const lines = readFileSync(todoPath, 'utf8').split(/\r?\n/);
    const next = lines.map((line) => (line.startsWith('pick ') ? `reword ${line.slice(5)}` : line)).join('\n');
    writeFileSync(todoPath, `${next}\n`, 'utf8');
}

/** @param {string} editPath */
function commitEditor(editPath) {
    if (!existsSync(statePath)) {
        throw new Error('reword state file missing (.git/reword-state.json)');
    }
    const state = JSON.parse(readFileSync(statePath, 'utf8'));
    const { index, messages } = state;
    if (index >= messages.length) {
        throw new Error(`commit editor index ${index} out of range (${messages.length})`);
    }
    writeFileSync(editPath, formatMessage(messages[index]), 'utf8');
    state.index = index + 1;
    writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
}

function lintLog(base) {
    const commits = listCommits(base);
    if (commits.length === 0) {
        console.log(`no commits in ${base}..HEAD`);
        return;
    }
    let failed = 0;
    for (const { hash, subject } of commits) {
        const raw = git('log', '-1', '--format=%B', hash);
        const errors = lintMessage(raw.trimEnd(), hash.slice(0, 8));
        if (errors.length === 0) {
            continue;
        }
        failed++;
        console.error(`\n${hash.slice(0, 8)}  ${subject}`);
        for (const err of errors) {
            console.error(`  - ${err}`);
        }
    }
    if (failed > 0) {
        console.error(`\nlint-log: ${failed} commit(s) failed`);
        process.exit(1);
    }
    console.log(`lint-log: ${commits.length} commit(s) OK`);
}

function main() {
    const argv = process.argv.slice(2);
    if (argv[0] === '--sequence-editor' && argv[1]) {
        sequenceEditor(argv[1]);
        return;
    }
    if (argv[0] === '--commit-editor' && argv[1]) {
        commitEditor(argv[1]);
        return;
    }

    const opts = parseArgs(argv);
    if (opts.help) {
        console.log(HELP);
        return;
    }

    if (opts.lintLog) {
        lintLog(opts.base);
        return;
    }

    if (!opts.file) {
        console.error('reword: --file is required unless using --lint-log');
        console.error(HELP);
        process.exit(1);
    }

    const messages = readMessagesFile(opts.file);

    if (opts.lint) {
        let failed = 0;
        for (const [i, msg] of messages.entries()) {
            const errors = lintMessage(msg, `block ${i + 1}`);
            for (const err of errors) {
                console.error(`lint: ${err}`);
            }
            if (errors.length > 0) {
                failed++;
            }
        }
        if (failed > 0) {
            process.exit(1);
        }
        console.log(`lint: ${messages.length} block(s) OK`);
        return;
    }

    if (opts.dryRun) {
        planReword(opts.base, messages, true);
        return;
    }

    runReword(opts.base, messages);
}

main();
