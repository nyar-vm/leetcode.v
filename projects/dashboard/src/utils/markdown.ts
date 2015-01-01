import katex from "katex";
import { marked } from "marked";

const codePlaceholders: string[] = [];

function protectCode(markdown: string): string {
    codePlaceholders.length = 0;
    return markdown.replace(/```[\s\S]*?```|`[^`\n]+`/g, (match) => {
        const index = codePlaceholders.length;
        codePlaceholders.push(match);
        return `@@CODE${index}@@`;
    });
}

function restoreCode(markdown: string): string {
    return markdown.replace(/@@CODE(\d+)@@/g, (_, index) => codePlaceholders[Number(index)] ?? "");
}

function renderKatex(tex: string, displayMode: boolean): string {
    try {
        return katex.renderToString(tex, {
            displayMode,
            throwOnError: false,
            strict: "ignore",
        });
    } catch {
        return displayMode ? `$$${tex}$$` : `$${tex}$`;
    }
}

function renderMath(markdown: string): string {
    let next = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => renderKatex(tex.trim(), true));
    next = next.replace(/(?<![\\$])\$([^$\n]+?)\$(?!\$)/g, (_, tex) =>
        renderKatex(tex.trim(), false),
    );
    return next;
}

/** 详情页已有标题时去掉 readme 首行 H1。 */
export function stripReadmeTitle(markdown: string): string {
    const lines = markdown.split("\n");
    if (lines[0]?.startsWith("# ")) {
        return lines.slice(1).join("\n").trimStart();
    }
    return markdown;
}

const renderer = new marked.Renderer();

renderer.link = ({ href, title, text }) => {
    const safeHref = href ?? "#";
    const external = safeHref.startsWith("http");
    const titleAttr = title ? ` title="${title}"` : "";
    const rel = external ? ' rel="noreferrer" target="_blank"' : "";
    return `<a href="${safeHref}"${titleAttr}${rel}>${text}</a>`;
};

marked.setOptions({
    gfm: true,
    breaks: false,
});

marked.use({ renderer });

export function renderMarkdown(markdown: string): string {
    const protectedMd = protectCode(markdown);
    const withMath = renderMath(protectedMd);
    const restored = restoreCode(withMath);
    return marked.parse(restored, { async: false }) as string;
}
