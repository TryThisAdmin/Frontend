<script lang="ts">
	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import IdeaListItem from "$lib/components/ideas/IdeaListItem.svelte";
	import { Commands } from "$lib/core/commands";
	import { TOP_IDEAS_STORE } from "$lib/core/stores";
	import { onMount } from "svelte";

	let cnt = 18;
	let hasMore = true;
	let tileMode = false;

	function toggleListMode() {
		tileMode = false;
	}

	function toggleTileMode() {
		tileMode = true;
	}

	function loadMore() {
		if (!hasMore) return;
		const previousCount = $TOP_IDEAS_STORE.length;
		Commands.appendTopIdeas(18, cnt, () => {
			if ($TOP_IDEAS_STORE.length < previousCount + 18) hasMore = false;
			cnt += 18;
		});
	}

	onMount(() => {
		Commands.clearTopIdeas();
		Commands.loadTopIdeas(cnt, 0, () => {
			if ($TOP_IDEAS_STORE.length < cnt) hasMore = false;
		});
	});
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<!-- Heading -->
		<h1>Most Liked Ideas</h1>

		<!-- Tile mode toggle -->
		<div class="d-none d-sm-flex justify-content-end">
			<div class="btn-group">
				<button
					type="button"
					class="btn {tileMode ? 'btn-outline-primary' : 'btn-primary'}"
					on:click={toggleListMode}
				>
					<i class="bi bi-list" />
				</button>
				<button
					type="button"
					class="btn {tileMode ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={toggleTileMode}
				>
					<i class="bi bi-grid" />
				</button>
			</div>
		</div>

		<hr />

		<!-- Items -->
		<div class="row">
			{#each $TOP_IDEAS_STORE as idea}
				{#if tileMode}
					<div class="col-12 col-sm-6 col-md-4 p-2 d-flex">
						<IdeaCard {idea} />
					</div>
				{:else}
					<div class="col-12 p-2">
						<IdeaListItem {idea} />
					</div>
				{/if}
			{/each}
		</div>

		<!-- Load More -->
		{#if hasMore}
			<div class="d-flex justify-content-center align-items-center p-3">
				<button type="button" class="btn btn-outline-primary" on:click={loadMore}>
					<i class="bi bi-arrow-clockwise" />
					<span>Load More</span>
				</button>
			</div>
		{/if}

		<!-- No results found -->
		{#if !$TOP_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Ideas Found</span>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
</style>
