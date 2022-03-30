<script lang="ts">
	import { page } from "$app/stores";
	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import IdeaListItem from "$lib/components/ideas/IdeaListItem.svelte";
	import { Commands } from "$lib/core/commands";
	import { ROLE_STORE, TOKEN_STORE, USER_IDEAS_STORE, USER_STORE } from "$lib/core/stores";
	import { onDestroy, onMount } from "svelte";

	let uid = $page.params.uid;
	let cnt = 18;
	let hasMore = true;
	let tileMode = true;

	let unsubscribe = () => {};

	function toggleListMode() {
		tileMode = false;
	}

	function toggleTileMode() {
		tileMode = true;
	}

	function loadMore() {
		if (!hasMore) return;
		const previousCount = $USER_IDEAS_STORE.length;
		Commands.appendUserIdeas(uid, 18, cnt, () => {
			if ($USER_IDEAS_STORE.length < previousCount + 18) hasMore = false;
			cnt += 18;
		});
	}

	function toggleFollow() {
		if ($USER_STORE.following) {
			Commands.unfollowUser(uid, () => {
				$USER_STORE.following = false;
				$USER_STORE.followers -= 1;
			});
		} else {
			Commands.followUser(uid, () => {
				$USER_STORE.following = true;
				$USER_STORE.followers += 1;
			});
		}
	}

	function giveRights() {
		if (!confirm("Do you really want to make that user an administrator?")) return;
		Commands.elevateUserPermission(uid, () => {
			Commands.loadUser(uid);
		});
	}

	function deleteUser() {
		if (!confirm("Do you really want to delete that user?")) return;
		Commands.deleteUser(uid, () => {
			window.history.back();
		});
	}

	onMount(() => {
		unsubscribe = TOKEN_STORE.subscribe(() => Commands.loadUser(uid));
		Commands.loadUserIdeas(uid, cnt, 0, () => {
			if ($USER_IDEAS_STORE.length < cnt) hasMore = false;
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<h1>User Details</h1>

		<hr />

		<!-- User Infos -->
		{#if $USER_STORE}
			<div class="d-flex justify-content-center align-items-center py-3">
				<div class="card card-body shadow user-card">
					<div class="d-flex align-items-center gap-3">
						<i class="bi bi-person-circle fs-1" />
						<strong class="fs-2">{$USER_STORE.name}</strong>
					</div>

					<div class="my-3 position-relative">
						<hr class="my-0" />
						<span class="badge bg-secondary position-absolute top-0 start-50 translate-middle"
							>{$USER_STORE.role}</span
						>
					</div>

					<div class="d-flex flex-wrap gap-1">
						<span class="badge bg-primary fs-6">
							<i class="bi bi-files" />
							<span>{$USER_STORE.ideas} Ideas</span>
						</span>

						<span class="badge bg-primary fs-6">
							<i class="bi bi-chat-left" />
							<span>{$USER_STORE.comments} Comments</span>
						</span>

						<span class="badge bg-primary fs-6">
							<i class="bi bi-people" />
							<span>{$USER_STORE.followers} Followers</span>
						</span>
					</div>

					<div class="d-flex flex-wrap gap-1 mt-1">
						<span class="badge bg-danger fs-6">
							<i class="bi bi-heart" />
							<span>{$USER_STORE.ideaLikes} Idealikes</span>
						</span>

						<span class="badge bg-danger fs-6">
							<i class="bi bi-heart" />
							<span>{$USER_STORE.commentLikes} Commentlikes</span>
						</span>
					</div>

					<hr />

					<!-- Actions -->
					<div class="d-flex justify-content-end gap-2">
						{#if $ROLE_STORE == "admin" && $USER_STORE.role != "admin"}
							<button class="btn btn-success" title="Give Admin Permissions" on:click={giveRights}>
								<i class="bi bi-mortarboard-fill" />
								<span>Make Admin</span>
							</button>

							<button class="btn btn-danger" on:click={deleteUser} title="Purge User">
								<i class="bi bi-trash" />
								<span>Purge</span>
							</button>
						{/if}

						<button
							class="btn {$USER_STORE.following ? 'btn-primary' : 'btn-outline-primary'}"
							on:click={toggleFollow}
							title={$USER_STORE.following ? "Unfollow" : "follow"}
							disabled={!$TOKEN_STORE}
						>
							<i class="bi {$USER_STORE.following ? 'bi-person-dash-fill' : 'bi-person-plus'}" />
							<span>{$USER_STORE.followers}</span>
						</button>

						{#if $USER_STORE.github}
							<a
								href="https://github.com/{$USER_STORE.github}"
								target="_blank"
								class="btn btn-outline-dark"
							>
								<i class="bi bi-github" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}

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
			{#each $USER_IDEAS_STORE as idea}
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
		{#if !$USER_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Ideas Found</span>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
	.user-card {
		max-width: 500px;
	}
</style>
