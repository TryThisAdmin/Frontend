<script lang="ts">
	import Footer from "$lib/components/layout/Footer.svelte";
	import Header from "$lib/components/layout/Header.svelte";
	import TopButton from "$lib/components/layout/TopButton.svelte";
	import Login from "$lib/components/login/Login.svelte";
	import { SHOW_LOGIN } from "$lib/tools/login";
</script>

<template>
	<!-- Page layout -->
	<div class="layout d-flex flex-column">
		<Header />

		<div class="p-3" />

		<div class="flex-fill d-flex justify-content-center">
			<div class="content p-3 d-flex flex-column justify-content-start align-items-center">
				<slot />
			</div>
		</div>

		<div class="p-5" />

		<Footer />
	</div>

	<!-- Back to top button -->
	<TopButton />

	<!-- Login overlay -->
	{#if $SHOW_LOGIN}
		<Login />
	{/if}
</template>

<style lang="scss">
	:global(html, body) {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;

		background-color: #374151;
	}

	:global(*) {
		scroll-behavior: smooth;
	}

	.layout {
		width: 100%;
		min-height: 100%;

		.content {
			width: 100%;
			max-width: 1024px;
		}
	}
</style>
