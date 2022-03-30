<script lang="ts">
	import { md2html } from "$lib/markdown/md2html";

	import { onDestroy, onMount } from "svelte";
	import "easymde/dist/easymde.min.css";
	import "./highlightjs.scss";
	import type EasyMDEType from "easymde";

	export let value = "";
	let textarea: HTMLTextAreaElement;
	let editor: EasyMDEType;

	onMount(async () => {
		const EasyMDE = (await import("easymde")).default;
		editor = new EasyMDE({
			element: textarea,
			initialValue: value,
			previewRender: (plainText) => {
				return md2html(plainText);
			},
			spellChecker: false,
			lineNumbers: true,
			tabSize: 4,
			sideBySideFullscreen: false,
			placeholder: "Start writing...",
			autoDownloadFontAwesome: false,
			toolbar: [
				{
					name: "bold",
					action: EasyMDE.toggleBold,
					className: "bi bi-type-bold",
					title: "Bold"
				},
				{
					name: "italic",
					action: EasyMDE.toggleItalic,
					className: "bi bi-type-italic",
					title: "Italic"
				},
				{
					name: "strikethrough",
					action: EasyMDE.toggleStrikethrough,
					className: "bi bi-type-strikethrough",
					title: "Strikethrough"
				},
				"|",
				{
					name: "heading",
					action: EasyMDE.toggleHeadingSmaller,
					className: "bi bi-type-h1",
					title: "Heading"
				},
				"|",
				{
					name: "ordered-list",
					action: EasyMDE.toggleOrderedList,
					className: "bi bi-list-ol",
					title: "Ordered List"
				},
				{
					name: "unordered-list",
					action: EasyMDE.toggleUnorderedList,
					className: "bi bi-list-ul",
					title: "Unordered List"
				},
				"|",
				{
					name: "image",
					action: EasyMDE.drawImage,
					className: "bi bi-image",
					title: "Insert Image"
				},
				{
					name: "table",
					action: EasyMDE.drawTable,
					className: "bi bi-table",
					title: "Insert Table"
				},
				{
					name: "quote",
					action: EasyMDE.toggleBlockquote,
					className: "bi bi-chat-square-quote",
					title: "Quote"
				},
				{
					name: "code",
					action: EasyMDE.toggleCodeBlock,
					className: "bi bi-code-slash",
					title: "Code"
				},
				{
					name: "horizontal-rule",
					action: EasyMDE.drawHorizontalRule,
					className: "bi bi-hr",
					title: "Insert Horizontal Line"
				},
				"|",
				{
					name: "preview",
					action: EasyMDE.togglePreview,
					className: "bi bi-eye no-disable",
					title: "Toggle Preview"
				},
				{
					name: "fullscreen",
					action: EasyMDE.toggleFullScreen,
					className: "bi bi-arrows-fullscreen no-disable",
					title: "Toggle Fullscreen"
				},
				"|",
				{
					name: "undo",
					action: EasyMDE.undo,
					className: "bi bi-arrow-counterclockwise",
					title: "Undo"
				},
				{
					name: "redo",
					action: EasyMDE.redo,
					className: "bi bi-arrow-clockwise",
					title: "Redo"
				}
			],
			shortcuts: {
				preview: "Cmd-Alt-P"
			}
		});
		editor.codemirror.on("change", () => {
			value = editor.value();
		});
	});

	onDestroy(() => {
		editor?.toTextArea();
		editor = null;
	});
</script>

<div>
	<textarea bind:this={textarea} />
</div>

<style lang="scss" global>
	.editor-toolbar {
		background-color: white;
		button{
			display:inline-flex;
			justify-content: center;
			align-items: center;
			font-size: 1.25rem;
		}
	}
</style>
