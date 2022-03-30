<script lang="ts">
	import { md2html } from "$lib/markdown/md2html";
	import "./highlightjs.scss";
	export let content = "";
</script>

<div class="markdown">
	{@html md2html(content)}
</div>

<style lang="scss" global>
	.markdown {
		max-width: 100%;

		* {
			max-width: 100%;
		}

		ul {
			padding-left: 2rem;
		}

		table {
			display: block;
			overflow-x: auto;
		}

		img {
			border-radius: 0.25rem;
		}

		input[type="checkbox"] {
			margin-right: 0.5rem;
		}
	}
</style>
