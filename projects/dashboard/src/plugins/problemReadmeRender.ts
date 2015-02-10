import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import type { Plugin } from 'vite';

import { renderMarkdown, stripReadmeTitle } from '../utils/markdown';

const VIRTUAL_PREFIX = '\0problem-readme:';

function renderReadmeModule(filePath: string): string {
    const markdown = readFileSync(filePath, 'utf8');
    const html = renderMarkdown(stripReadmeTitle(markdown));
    return `export default ${JSON.stringify(html)}`;
}

function hasRenderQuery(id: string): boolean {
    const queryIndex = id.indexOf('?');
    if (queryIndex === -1) {
        return false;
    }
    const query = id.slice(queryIndex + 1);
    return query.split('&').some((part) => part === 'render' || part.startsWith('render='));
}

/** 从模块 id 或 import 源解析 readme 绝对路径（仅 ?render 请求）。 */
function resolveReadmeFilePath(source: string, importer?: string): string | null {
    if (!source.includes('readme.md')) {
        return null;
    }

    let filePath = source;
    let isRender = false;

    if (source.startsWith(VIRTUAL_PREFIX)) {
        filePath = source.slice(VIRTUAL_PREFIX.length);
        isRender = true;
    } else if (hasRenderQuery(source)) {
        filePath = source.slice(0, source.indexOf('?'));
        isRender = true;
    } else {
        return null;
    }

    if (!filePath.endsWith('readme.md')) {
        return null;
    }

    if (!isAbsolute(filePath) && importer) {
        filePath = resolve(dirname(importer), filePath);
    }

    if (!existsSync(filePath)) {
        return null;
    }

    return isRender ? filePath : null;
}

export function problemReadmeRenderPlugin(): Plugin {
    return {
        name: 'problem-readme-render',
        enforce: 'pre',
        async resolveId(source, importer, options) {
            if (!source.includes('readme.md') || !source.includes('render')) {
                return null;
            }

            const resolved = resolveReadmeFilePath(source, importer);
            if (!resolved) {
                const match = source.match(/^(.*readme\.md)\?render(?:&.*)?$/);
                if (!match) {
                    return null;
                }
                const inner = await this.resolve(match[1], importer, {
                    ...options,
                    skipSelf: true,
                });
                if (!inner) {
                    return null;
                }
                const filePath = inner.id.split('?')[0];
                if (!filePath.endsWith('readme.md') || !existsSync(filePath)) {
                    return null;
                }
                return `${VIRTUAL_PREFIX}${filePath}`;
            }

            return `${VIRTUAL_PREFIX}${resolved}`;
        },
        load(id) {
            const filePath = resolveReadmeFilePath(id);
            if (!filePath) {
                return null;
            }
            return renderReadmeModule(filePath);
        },
        transform(_code, id) {
            const filePath = resolveReadmeFilePath(id);
            if (!filePath) {
                return null;
            }
            return {
                code: renderReadmeModule(filePath),
                map: null,
            };
        },
    };
}
