<script lang="ts">
	import { Commands } from "$lib/core/commands";
	import type { Comment } from "$lib/core/interfaces";
	import { ROLE_STORE, TOKEN_STORE, UID_STORE } from "$lib/core/stores";
	import { isValidComment } from "$lib/tools/validation";

	export let comment: Comment;
	let editMode = false;

	function toggleEditMode() {
		editMode = !editMode;
	}

	function editComment() {
		Commands.editComment(comment.id, comment.idea, comment.content, () => {
			editMode = false;
		});
	}

	function deleteComment() {
		if (!confirm("Do you really want to delete this comment?")) {
			return;
		}

		Commands.deleteComment(comment.id, () => {
			Commands.loadComments(comment.idea);
		});
	}

	function toggleLike() {
		if (comment.liked) {
			Commands.unlikeComment(comment.id, () => {
				comment.likes -= 1;
				comment.liked = false;
			});
		} else {
			Commands.likeComment(comment.id, () => {
				comment.likes += 1;
				comment.liked = true;
			});
		}
	}
</script>

<template>
	<div class="card card-body my-2">
		<div class="card-title d-flex flex-wrap gap-3 align-items-center">
			<a
				href="/user/{comment.authorID}"
				title={comment.author}
				class="badge rounded-pill bg-secondary text-white fs-5 text-decoration-none"
			>
				<i class="bi bi-person-circle" />
				{comment.author}
			</a>

			<div>
				<span
					class="badge bg-success"
					title="Commented on {comment.created.toLocaleDateString()}{comment.created.getTime() !=
					comment.updated.getTime()
						? ' (edited)'
						: ''}"
				>
					<i class="bi bi-plus-square" />
					<span>{comment.created.toLocaleDateString()}</span>
				</span>
			</div>
		</div>

		<hr />

		<div class="card-text mb-2">
			{#if editMode}
				<input type="text" bind:value={comment.content} class="form-control" />
			{:else}
				<span>{comment.content}</span>
			{/if}
		</div>

		<div class="d-flex flex-wrap justify-content-end gap-3">
			{#if $TOKEN_STORE && comment.authorID == $UID_STORE}
				{#if editMode}
					<button
						on:click={editComment}
						type="button"
						class="btn btn-primary"
						disabled={!isValidComment(comment.content)}
					>
						<i class="bi bi-check-lg" />
						<span>Save</span>
					</button>

					<button on:click={toggleEditMode} type="button" class="btn btn-primary">
						<i class="bi bi-x" />
						<span>Cancel</span>
					</button>
				{:else}
					<button on:click={toggleEditMode} type="button" class="btn btn-primary">
						<i class="bi bi-pencil-square" />
						<span>Edit</span>
					</button>
				{/if}
			{/if}

			{#if $TOKEN_STORE && (comment.authorID == $UID_STORE || $ROLE_STORE == "admin")}
				<button type="button" class="btn btn-danger" on:click={deleteComment}>
					<i class="bi bi-trash" />
					<span>Delete</span>
				</button>
			{/if}

			<button
				on:click={toggleLike}
				class="btn btn-outline-danger"
				title="Like"
				disabled={!$TOKEN_STORE}
			>
				<i class="bi {comment.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}" />
				<span class="ms-2">{comment.likes}</span>
			</button>
		</div>
	</div>
</template>

<style lang="scss">
</style>
