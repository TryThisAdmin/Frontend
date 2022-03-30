<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let visible = false;

	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	onMount(() => {
		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 20) visible = true;
			else visible = false;
		});
	});
</script>

<template>
	{#if visible}
		<button
			transition:fade
			class="btn btn-primary rounded-circle m-3 p-4 shadow d-flex justify-content-center align-items-center"
			on:click={scrollToTop}
		>
			<i class="bi bi-arrow-up" />
		</button>
	{/if}
</template>

<style lang="scss">
	button {
		position: fixed;
		width: 0;
		height: 0;
		bottom: 0;
		right: 0;
		z-index: 1000;
	}
</style>
