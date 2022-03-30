<script lang="ts">
	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import { Commands } from "$lib/core/commands";
	import { showLogin } from "$lib/tools/login";

	import {
		FOLLOWED_IDEAS_STORE,
		OWN_IDEAS_STORE,
		RECENT_IDEAS_STORE,
		TOKEN_STORE,
		TOP_IDEAS_STORE
	} from "$lib/core/stores";
	import { onDestroy, onMount } from "svelte";

	let unsubscribe = () => {};

	onMount(() => {
		Commands.clearRecentIdeas();
		Commands.clearTopIdeas();

		Commands.loadRecentIdeas(6);
		Commands.loadTopIdeas(6);

		// load own ideas when logged in
		unsubscribe = TOKEN_STORE.subscribe((ts) => {
			if (ts) {
				Commands.loadOwnIdeas(6);
				Commands.loadFollowedIdeas(6);
			} else {
				Commands.clearOwnIdeas();
				Commands.clearFollowedIdeas();
			}
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<template>
	<!-- Welcome Screen -->
	<div
		class="d-inline-flex flex-column align-items-center justify-content-center text-white text-center"
	>
		<img src="/logo.png" alt="TryThis Logo" width="150px" />
		<div class="py-2" />
		<h1>Welcome to TryThis!</h1>
		<h4>Your hub for sharing programming ideas with the world!</h4>
	</div>

	<!-- Spacer -->
	<div class="p-5" />

	<!-- Dashboard -->
	<div class="container-fluid p-3 card shadow border">
		<h1>Dashboard</h1>
		<hr class="my-5" />

		<div class="d-flex flex-wrap gap-3">
			{#if $TOKEN_STORE}
				<a href="/create" class="btn btn-primary rounded-pill shadow">+ Create Idea</a>
				<a href="/account" class="btn btn-primary rounded-pill shadow">Manage Account</a>
				<a href="/following" class="btn btn-primary rounded-pill shadow">Ideas by Followed Users</a>
				<a href="/my-ideas" class="btn btn-primary rounded-pill shadow">My Ideas</a>
				<a href="/bookmarks" class="btn btn-primary rounded-pill shadow">Bookmarks</a>
				<a href="/likes" class="btn btn-primary rounded-pill shadow">My Likes</a>
			{:else}
				<button type="button" class="btn btn-primary rounded-pill shadow" on:click={showLogin}
					>Login</button
				>
				<a href="/signup" class="btn btn-primary rounded-pill shadow">Sign Up</a>
			{/if}
			<a href="/top" class="btn btn-primary rounded-pill shadow">Most Liked Ideas</a>
			<a href="/recent" class="btn btn-primary rounded-pill shadow">Most Recent Ideas</a>
			<a href="/search" class="btn btn-primary rounded-pill shadow">Search Ideas</a>
		</div>
		<hr class="my-5" />

		{#if $TOKEN_STORE}
			<h3 class="mb-3">Ideas By Followed Users</h3>
			<div class="row">
				{#each $FOLLOWED_IDEAS_STORE as idea}
					<div class="col-12 col-sm-6 col-md-4 p-2 d-flex">
						<IdeaCard {idea} />
					</div>
				{/each}
			</div>
			<!-- No results found -->
			{#if !$FOLLOWED_IDEAS_STORE.length}
				<div class="d-flex justify-content-center py-3">
					<span class="badge bg-secondary fs-5">No Entries</span>
				</div>
			{/if}
			<hr class="my-5" />

			<h3 class="mb-3">My Ideas</h3>
			<div class="row">
				{#each $OWN_IDEAS_STORE as idea}
					<div class="col-12 col-sm-6 col-md-4 p-2 d-flex">
						<IdeaCard {idea} />
					</div>
				{/each}
			</div>
			<!-- No results found -->
			{#if !$OWN_IDEAS_STORE.length}
				<div class="d-flex justify-content-center py-3">
					<span class="badge bg-secondary fs-5">No Entries</span>
				</div>
			{/if}
			<hr class="my-5" />
		{/if}

		<h3 class="mb-3">Most Liked Ideas</h3>
		<div class="row">
			{#each $TOP_IDEAS_STORE as idea}
				<div class="col-12 col-sm-6 col-md-4 p-2 d-flex">
					<IdeaCard {idea} />
				</div>
			{/each}
		</div>
		<!-- No results found -->
		{#if !$TOP_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Entries</span>
			</div>
		{/if}
		<hr class="my-5" />

		<h3 class="mb-3">Most Recent Ideas</h3>
		<div class="row">
			{#each $RECENT_IDEAS_STORE as idea}
				<div class="col-12 col-sm-6 col-md-4 p-2 d-flex">
					<IdeaCard {idea} />
				</div>
			{/each}
		</div>
		<!-- No results found -->
		{#if !$RECENT_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Entries</span>
			</div>
		{/if}
		<hr class="my-5" />
	</div>
</template>

<style lang="scss">
</style>
