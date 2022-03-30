import MarkdownIt from "markdown-it";
import checkbox from "markdown-it-checkbox";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import highlightjs from "markdown-it-highlightjs";
import mark from "markdown-it-mark";
import toc from "markdown-it-table-of-contents";
import anchor from "markdown-it-anchor";
import MermaidPlugIn from "./mermaidPlugin";

const mdit = MarkdownIt({ html: true, breaks: false })
	.use(anchor)
	.use(checkbox, { divWrap: true })
	.use(emoji)
	.use(footnote)
	.use(highlightjs)
	.use(mark)
	.use(MermaidPlugIn)
	.use(toc);

// add support for bootstrap
mdit.renderer.rules.table_open = () => `<table class="table">`;
mdit.renderer.rules.blockquote_open = () => `<blockquote class="blockquote">`;

/**
 * Translates Markdown to HTML
 * @param md Markdown
 * @returns HTML
 */
export function md2html(md: string): string {
	return mdit.render(md);
}
