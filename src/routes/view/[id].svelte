<script lang="ts">
	import { goto } from "$app/navigation";

	import { page } from "$app/stores";
	import CommentCard from "$lib/components/comments/CommentCard.svelte";
	import MarkdownRender from "$lib/components/markdown/MarkdownRender.svelte";
	import { Commands } from "$lib/core/commands";
	import {
		COMMENTS_STORE,
		CURRENT_IDEA_STORE,
		ROLE_STORE,
		TOKEN_STORE,
		UID_STORE
	} from "$lib/core/stores";
	import { downloadIdeaAsFile } from "$lib/tools/download";
	import { isValidComment } from "$lib/tools/validation";
	import { onMount } from "svelte";

	let id = $page.params.id;
	let comment = "";

	function downloadIdea() {
		downloadIdeaAsFile($CURRENT_IDEA_STORE);
	}

	function toggleIdeaLike() {
		if ($CURRENT_IDEA_STORE.liked) {
			Commands.unlikeIdea(id, () => {
				$CURRENT_IDEA_STORE.likes -= 1;
				$CURRENT_IDEA_STORE.liked = false;
			});
		} else {
			Commands.likeIdea(id, () => {
				$CURRENT_IDEA_STORE.likes += 1;
				$CURRENT_IDEA_STORE.liked = true;
			});
		}
	}

	function toggleIdeaSave() {
		if ($CURRENT_IDEA_STORE.saved) {
			Commands.unsaveIdea(id, () => {
				$CURRENT_IDEA_STORE.saved = false;
			});
		} else {
			Commands.saveIdea(id, () => {
				$CURRENT_IDEA_STORE.saved = true;
			});
		}
	}

	function deleteIdea() {
		if (!confirm("Do you really want to delete this idea?")) {
			return;
		}
		Commands.deleteIdea(id, () => {
			goto("/", { replaceState: true });
		});
	}

	function postComment() {
		Commands.createComment(id, comment, () => {
			comment = "";
			Commands.loadComments(id);
		});
	}

	onMount(() => {
		Commands.clearIdea();
		Commands.clearComments();

		Commands.loadIdea(id, () => {
			Commands.loadComments(id);
		});
	});
</script>

<template>
	<div class="card card-text shadow container-fluid p-3">
		{#if $CURRENT_IDEA_STORE}
			<!-- Heading -->
			<h1 class="pt-3 card-title">{$CURRENT_IDEA_STORE.title}</h1>

			<!-- Meta Data -->
			<div class="card-text d-flex flex-wrap gap-1 align-items-center mb-2">
				{#if $CURRENT_IDEA_STORE.authorID != $UID_STORE}
					<a
						href="/user/{$CURRENT_IDEA_STORE.authorID}"
						title={$CURRENT_IDEA_STORE.author}
						class="badge bg-success text-white text-decoration-none"
						>By {$CURRENT_IDEA_STORE.author}</a
					>
				{/if}

				<span
					class="badge bg-success"
					title="Created on {$CURRENT_IDEA_STORE.created.toLocaleDateString()}"
				>
					<i class="bi bi-plus-square" />
					<span>{$CURRENT_IDEA_STORE.created.toLocaleDateString()}</span>
				</span>

				{#if $CURRENT_IDEA_STORE.created.getTime() != $CURRENT_IDEA_STORE.updated.getTime()}
					<span
						class="badge bg-success"
						title="Edited on {$CURRENT_IDEA_STORE.updated.toLocaleDateString()}"
					>
						<i class="bi bi-pencil-square" />
						<span>{$CURRENT_IDEA_STORE.updated.toLocaleDateString()}</span>
					</span>
				{/if}
			</div>

			<!-- Tags -->
			<div class="card-text d-flex flex-wrap gap-1 mb-5">
				{#each $CURRENT_IDEA_STORE.tags as tag}
					<span class="badge bg-primary">{tag}</span>
				{/each}
			</div>

			<!-- Actions -->
			<div class="card-text d-flex flex-wrap gap-3 align-items-center">
				{#if $UID_STORE == $CURRENT_IDEA_STORE.authorID}
					<a href="/edit/{$CURRENT_IDEA_STORE.id}" title="Edit" class="btn btn-primary">
						<i class="bi bi-pencil-square" />
						<span>Edit</span>
					</a>
				{/if}

				{#if $UID_STORE == $CURRENT_IDEA_STORE.authorID || $ROLE_STORE == "admin"}
					<button type="button" title="Delete" class="btn btn-danger" on:click={deleteIdea}>
						<i class="bi bi-trash" />
						<span>Delete</span>
					</button>
				{/if}

				<div class="flex-fill" />

				<div class="d-flex gap-3">
					<button
						on:click={toggleIdeaLike}
						class="btn btn-outline-danger"
						title="Like"
						disabled={!$TOKEN_STORE}
					>
						<i class="bi {$CURRENT_IDEA_STORE.liked ? 'bi-heart-fill' : 'bi-heart'}" />
						<span class="ms-2">{$CURRENT_IDEA_STORE.likes}</span>
					</button>

					<button
						on:click={toggleIdeaSave}
						class="btn btn-outline-primary"
						title="Bookmark"
						disabled={!$TOKEN_STORE}
					>
						<i class="bi {$CURRENT_IDEA_STORE.saved ? 'bi-bookmark-fill' : 'bi-bookmark'}" />
					</button>

					<button on:click={downloadIdea} class="btn btn-outline-secondary" title="Download Idea">
						<i class="bi bi-download" />
					</button>
				</div>
			</div>

			<!-- Content -->
			<hr />
			<div class="card-text p-3 my-3">
				<MarkdownRender content={$CURRENT_IDEA_STORE.content} />
			</div>
			<hr class="mb-5" />

			<!-- Comments -->
			<h2>Comments ({$COMMENTS_STORE.length})</h2>

			{#if $TOKEN_STORE}
				<div class="card-text">
					<input
						type="text"
						placeholder="Start writing..."
						class="form-control my-3"
						bind:value={comment}
					/>
					<button
						type="button"
						class="btn btn-primary"
						disabled={!isValidComment(comment)}
						on:click={postComment}>Post Comment</button
					>
				</div>
			{/if}

			<div class="card-text my-3">
				{#each $COMMENTS_STORE as comment}
					<CommentCard {comment} />
				{/each}
			</div>
		{:else}
			<span class="badge bg-secondary text-white">loading...</span>
		{/if}
	</div>
</template>

<style lang="scss">
</style>
