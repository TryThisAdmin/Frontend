<script lang="ts">
	import { goto } from "$app/navigation";

	import IdeaCard from "$lib/components/ideas/IdeaCard.svelte";
	import IdeaListItem from "$lib/components/ideas/IdeaListItem.svelte";
	import { Commands } from "$lib/core/commands";
	import {
		ACCOUNT_STORE,
		OWN_IDEAS_STORE,
		ROLE_STORE,
		TOKEN_STORE,
		UID_STORE
	} from "$lib/core/stores";
	import { isValidPassword, isValidUsername } from "$lib/tools/validation";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

	let cnt = 18;
	let hasMore = true;
	let tileMode = true;
	let editMode: "username" | "email" | "github" | "password" = null;

	let newUsername = "";
	let newEmail = "";
	let newGithub = "";
	let newPassword = "";

	let editErrorMessage = "";

	let unsubscribe = () => {};

	function toggleListMode() {
		tileMode = false;
	}

	function toggleTileMode() {
		tileMode = true;
	}

	function loadMore() {
		if (!hasMore) return;
		const previousCount = $OWN_IDEAS_STORE.length;
		Commands.appendOwnIdeas(18, cnt, () => {
			if ($OWN_IDEAS_STORE.length < previousCount + 18) hasMore = false;
			cnt += 18;
		});
	}

	function changeUsername() {
		if (!isValidUsername(newUsername)) {
			editErrorMessage = "Invalid Username! Needs at least 3 characters.";
			return;
		}

		Commands.editUsername(newUsername, () => {
			newUsername = "";
			editErrorMessage = "";
			editMode = null;
			Commands.loadAccount();
		});
	}

	function changeEmail() {
		if (!newEmail) {
			editErrorMessage = "Invalid Email!";
			return;
		}

		Commands.editEmail(newEmail, () => {
			newEmail = "";
			editErrorMessage = "";
			editMode = null;
			Commands.loadAccount();
		});
	}

	function changeGithub() {
		if (!newGithub) {
			editErrorMessage = "Invalid GitHub name!";
			return;
		}

		Commands.editGithub(newGithub, () => {
			newGithub = "";
			editErrorMessage = "";
			editMode = null;
			Commands.loadAccount();
		});
	}

	function changePassword() {
		if (!isValidPassword(newPassword)) {
			editErrorMessage = "Invalid Password! Needs at least 8 characters.";
			return;
		}

		Commands.editPassword(newPassword, () => {
			newPassword = "";
			editErrorMessage = "";
			editMode = null;
			Commands.loadAccount();
		});
	}

	function rewokeRights() {
		if (!confirm("Do you really want to give up on your administrator rights?")) return;
		Commands.demoteUserPermission($UID_STORE, () => {
			Commands.loadAccount();
		});
	}

	function deleteAccount() {
		if (!confirm("Do you really want to delete your account forever?")) return;
		Commands.deleteUser($UID_STORE, () => {
			Commands.logout();
		});
	}

	onMount(() => {
		unsubscribe = TOKEN_STORE.subscribe((ts) => {
			if (!ts) {
				goto("/", { replaceState: true });
				return;
			} else {
				Commands.loadAccount();
				Commands.loadOwnIdeas(cnt, 0, () => {
					if ($OWN_IDEAS_STORE.length < cnt) hasMore = false;
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
		<h1>Account Details</h1>

		<hr />

		<!-- User Infos -->
		{#if $ACCOUNT_STORE}
			<div class="d-flex justify-content-center align-items-center py-3">
				<div class="card card-body shadow user-card">
					<div class="d-flex align-items-center gap-3">
						<i class="bi bi-person-circle fs-1" />
						<strong class="fs-2">{$ACCOUNT_STORE.name}</strong>
					</div>

					<hr />

					<div class="d-flex flex-wrap gap-1">
						{#if $ACCOUNT_STORE.github}
							<span class="badge bg-success fs-6">
								<i class="bi bi-github" />
								<span>{$ACCOUNT_STORE.github}</span>
							</span>
						{/if}

						<span class="badge bg-success fs-6">
							<i class="bi bi-envelope-fill" />
							<span>{$ACCOUNT_STORE.email}</span>
						</span>

						<span class="badge bg-success fs-6">
							<i class="bi bi-file-person" />
							<span>{$ACCOUNT_STORE.role}</span>
						</span>
					</div>

					<div class="d-flex flex-wrap gap-1 mt-1">
						<span class="badge bg-primary fs-6">
							<i class="bi bi-files" />
							<span>{$ACCOUNT_STORE.ideas} Ideas</span>
						</span>

						<span class="badge bg-primary fs-6">
							<i class="bi bi-chat-left" />
							<span>{$ACCOUNT_STORE.comments} Comments</span>
						</span>

						<span class="badge bg-primary fs-6">
							<i class="bi bi-people" />
							<span>{$ACCOUNT_STORE.followers} Followers</span>
						</span>
					</div>

					<div class="d-flex flex-wrap gap-1 mt-1">
						<span class="badge bg-danger fs-6">
							<i class="bi bi-heart" />
							<span>{$ACCOUNT_STORE.ideaLikes} Idealikes</span>
						</span>

						<span class="badge bg-danger fs-6">
							<i class="bi bi-heart" />
							<span>{$ACCOUNT_STORE.commentLikes} Commentlikes</span>
						</span>
					</div>
				</div>
			</div>

			<div class="py-3" />

			<div class="d-flex flex-wrap justify-content-center gap-2">
				<a href="/my-ideas" class="btn btn-primary rounded-pill">My Ideas</a>
				<a href="/bookmarks" class="btn btn-primary rounded-pill">Bookmarks</a>
				<a href="/following" class="btn btn-primary rounded-pill">Ideas By Followed Users</a>
				<a href="/likes" class="btn btn-primary rounded-pill">Liked Ideas</a>
			</div>

			<hr />

			<h3 class="mb-3">Change Account Details</h3>

			{#if editErrorMessage}
				<div transition:fade class="alert alert-danger">{editErrorMessage}</div>
			{/if}

			<div class="btn-group">
				<button
					type="button"
					class="btn {editMode == 'username' ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={() => {
						editMode = "username";
					}}
				>
					<i class="bi bi-person-circle" />
					<span class="d-none d-sm-block">Username</span>
				</button>

				<button
					type="button"
					class="btn {editMode == 'email' ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={() => {
						editMode = "email";
					}}
				>
					<i class="bi bi-envelope-fill" />
					<span class="d-none d-sm-block">E-Mail</span>
				</button>

				<button
					type="button"
					class="btn {editMode == 'github' ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={() => {
						editMode = "github";
					}}
				>
					<i class="bi bi-github" />
					<span class="d-none d-sm-block">GitHub</span>
				</button>

				<button
					type="button"
					class="btn {editMode == 'password' ? 'btn-primary' : 'btn-outline-primary'}"
					on:click={() => {
						editMode = "password";
					}}
				>
					<i class="bi bi-lock-fill" />
					<span class="d-none d-sm-block">Password</span>
				</button>
			</div>

			{#if editMode}
				<div class="d-flex justify-content-center py-3">
					<form class="input-group py-3 change-form">
						{#if editMode == "username"}
							<span class="input-group-text">
								<i class="bi bi-person-circle" />
							</span>
							<input
								type="text"
								name="username"
								class="form-control"
								placeholder={$ACCOUNT_STORE.name}
								bind:value={newUsername}
							/>
							<button type="button" class="btn btn-primary" on:click={changeUsername}>Save</button>
						{:else if editMode == "email"}
							<span class="input-group-text">
								<i class="bi bi-at" />
							</span>
							<input
								type="email"
								name="email"
								class="form-control"
								placeholder={$ACCOUNT_STORE.email}
								bind:value={newEmail}
							/>
							<button type="button" class="btn btn-primary" on:click={changeEmail}>Save</button>
						{:else if editMode == "github"}
							<span class="input-group-text">
								<i class="bi bi-github" />
							</span>
							<input
								type="text"
								name="github"
								class="form-control"
								placeholder={$ACCOUNT_STORE.github}
								bind:value={newGithub}
							/>
							<button type="button" class="btn btn-primary" on:click={changeGithub}>Save</button>
						{:else if editMode == "password"}
							<span class="input-group-text">
								<i class="bi bi-lock-fill" />
							</span>
							<input
								type="password"
								name="password"
								class="form-control"
								placeholder="********"
								bind:value={newPassword}
							/>
							<button type="button" class="btn btn-primary" on:click={changePassword}>Save</button>
						{/if}
					</form>
				</div>
			{/if}
		{/if}

		<div class="py-3" />

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
			{#each $OWN_IDEAS_STORE as idea}
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
		{#if !$OWN_IDEAS_STORE.length}
			<div class="d-flex justify-content-center py-3">
				<span class="badge bg-secondary fs-5">No Ideas Found</span>
			</div>
		{/if}

		<hr />

		<div class="py-3" />

		<h3 class="mb-3">Danger Zone</h3>

		<div class="d-flex flex-wrap gap-2">
			{#if $ROLE_STORE == "admin"}
				<button type="button" class="btn btn-outline-danger flex-fill" on:click={rewokeRights}>
					<i class="bi bi-mortarboard-fill" />
					<span>Rewoke Admin Permissions</span>
				</button>
			{/if}

			<button type="button" class="btn btn-outline-danger flex-fill" on:click={deleteAccount}>
				<i class="bi bi-trash-fill" />
				<span>Permanently Delete Account</span>
			</button>
		</div>
	</div>
</template>

<style lang="scss">
	.user-card {
		max-width: 500px;
	}

	.change-form {
		max-width: 400px;
	}
</style>
