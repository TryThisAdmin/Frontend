import Mermaid from "mermaid";
import type { PluginWithOptions } from "markdown-it";

const MermaidChart = (code: string) => {
	try {
		let html = "";
		const uniqueId = "mermaid" + Date.now();

		// Check for valid mermaid chart
		if (Mermaid.parse(code)) {
			Mermaid.render(uniqueId, code, (sc) => {
				html = sc;
			});
		}
		return `<div class="mermaid">${html}</div>`;
	} catch (err) {
		return `<div class="mermaid"></div>`;
	}
};

const MermaidPlugIn: PluginWithOptions = (md, opts) => {
	Mermaid.initialize(Object.assign(MermaidPlugIn, opts));

	if (!md.renderer.rules.fence) {
		throw new Error("No renderer was found!");
	}

	const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

	md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
		const token = tokens[idx];
		const code = token.content.trim();
		if (token.info.startsWith("mermaid")) {
			return MermaidChart(code);
		}
		return defaultRenderer(tokens, idx, opts, env, self);
	};
};

export default MermaidPlugIn;
