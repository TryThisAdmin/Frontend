<script lang="ts">
	import { goto } from "$app/navigation";
	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import IdeaListItem from "$lib/components/ideas/IdeaListItem.svelte";
	import { Commands } from "$lib/core/commands";
	import { FOLLOWED_IDEAS_STORE, TOKEN_STORE } from "$lib/core/stores";
	import { onDestroy, onMount } from "svelte";

	let cnt = 18;
	let hasMore = true;
	let tileMode = false;

	let unsubscribe = () => {};

	function toggleListMode() {
		tileMode = false;
	}

	function toggleTileMode() {
		tileMode = true;
	}

	function loadMore() {
		if (!hasMore) return;
		const previousCount = $FOLLOWED_IDEAS_STORE.length;
		Commands.appendFollowedIdeas(18, cnt, () => {
			if ($FOLLOWED_IDEAS_STORE.length < previousCount + 18) hasMore = false;
			cnt += 18;
		});
	}

	onMount(() => {
		Commands.clearFollowedIdeas();

		unsubscribe = TOKEN_STORE.subscribe((ts) => {
			if (!ts) {
				goto("/", { replaceState: true });
				return;
			} else {
				Commands.clearFollowedIdeas();
				Commands.loadFollowedIdeas(cnt, 0, () => {
					if ($FOLLOWED_IDEAS_STORE.length < cnt) hasMore = false;
				});
			}
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<!-- Heading -->
		<h1>Ideas By Followed Users</h1>

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
			{#each $FOLLOWED_IDEAS_STORE as idea}
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

		<!-- Load more -->
		{#if hasMore}
			<div class="d-flex justify-content-center align-items-center p-3">
				<button type="button" class="btn btn-outline-primary" on:click={loadMore}>
					<i class="bi bi-arrow-clockwise" />
					<span>Load More</span>
				</button>
			</div>
		{/if}

		<!-- No results found -->
		{#if !$FOLLOWED_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Ideas Found</span>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
</style>
