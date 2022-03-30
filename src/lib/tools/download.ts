import type { Idea } from "$lib/core/interfaces";

export function downloadIdeaAsFile(idea: Idea): void {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(idea.content));
	element.setAttribute("download", idea.title + ".txt");
	element.style.display = "none";

	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
