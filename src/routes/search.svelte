<script lang="ts">
	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import IdeaListItem from "$lib/components/ideas/IdeaListItem.svelte";
	import { Commands } from "$lib/core/commands";
	import { SEARCH_RESULTS_STORE } from "$lib/core/stores";
	import { onMount } from "svelte";

	let cnt = 18;
	let hasMore = true;
	let hasSearched = false;
	let query = "";
	let tileMode = false;

	function toggleListMode() {
		tileMode = false;
	}

	function toggleTileMode() {
		tileMode = true;
	}

	function loadMore() {
		if (!hasMore) return;
		const previousCount = $SEARCH_RESULTS_STORE.length;
		Commands.appendSearchResults(query, 18, cnt, () => {
			if ($SEARCH_RESULTS_STORE.length < previousCount + 18) hasMore = false;
			cnt += 18;
		});
	}

	function search() {
		Commands.loadSearchResults(query, 18, 0, () => {
			hasSearched = true;
			if ($SEARCH_RESULTS_STORE.length < 18) hasMore = false;
		});
	}

	onMount(() => {
		Commands.clearSearchResults();
	});
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<!-- Heading -->
		<h1>Search for Ideas</h1>

		<!-- Search Form -->
		<form on:submit|preventDefault={search} class="d-flex justify-content-center gap-3 py-3">
			<div class="input-group searchbar">
				<span class="input-group-text">
					<i class="bi bi-search" />
				</span>

				<input
					type="text"
					name="search"
					minlength="3"
					class="form-control"
					placeholder="Search..."
					required
					bind:value={query}
				/>

				<button type="submit" class="btn btn-primary" disabled={query.length < 3}>Search</button>
			</div>
		</form>

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

		<!-- Results -->
		<div class="row">
			{#each $SEARCH_RESULTS_STORE as idea}
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

		<!-- Load More Button -->
		{#if hasMore && hasSearched}
			<div class="d-flex justify-content-center align-items-center p-3">
				<button type="button" class="btn btn-outline-primary" on:click={loadMore}>
					<i class="bi bi-arrow-clockwise" />
					<span>Load More</span>
				</button>
			</div>
		{/if}

		<!-- No results found -->
		{#if hasSearched && !$SEARCH_RESULTS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Results Found</span>
			</div>
		{/if}

		<!-- Not yet searched -->
		{#if !hasSearched}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">Enter Something To Search</span>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
	.searchbar {
		max-width: 400px;
	}
</style>
