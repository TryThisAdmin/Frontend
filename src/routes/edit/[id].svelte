<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import MarkdownEditor from "$lib/components/markdown/MarkdownEditor.svelte";
	import { Commands } from "$lib/core/commands";
	import {
		CURRENT_IDEA_STORE,
		ERROR_MESSAGE_STORE,
		TAG_STORE,
		TOKEN_STORE,
		UID_STORE
	} from "$lib/core/stores";
	import { isValidContent, isValidTag, isValidTitle } from "$lib/tools/validation";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

	let id = $page.params.id;

	let title = "";
	let content = "";
	let tags: string[] = [];
	let currentTag = "";

	let loaded = false;
	let errorMessage = "";

	let unsubscribe = () => {};

	function cancle() {
		if (confirm("Do you really want to quit?")) goto("/view/" + id);
	}

	function addTag() {
		if (tags.includes(currentTag) || !isValidTag(currentTag)) {
			return;
		}
		tags = [...tags, currentTag.toLowerCase()];
		currentTag = "";
	}

	function removeTag(i: number) {
		tags = tags.filter((_, index) => {
			return index != i;
		});
	}

	function updateIdea() {
		// validate contents
		if (!isValidTitle(title)) {
			errorMessage = "Invalid Title! Needs at least 8 characters.";
			window.scrollTo(0, 0);
			return;
		} else if (!isValidContent(content)) {
			errorMessage = "Invalid Content! Needs at least 120 characters.";
			window.scrollTo(0, 0);
			return;
		} else if (!tags.length) {
			errorMessage = "You need to assign at least one tag!";
			window.scrollTo(0, 0);
			return;
		} else if (!$TOKEN_STORE) {
			errorMessage = "You need to be logged in first!";
			window.scrollTo(0, 0);
			return;
		} else {
			errorMessage = "";
		}

		// post idea
		Commands.editIdea(id, title, content, tags, () => {
			goto("/view/" + id);
		});
	}

	onMount(() => {
		Commands.clearErrors();
		Commands.loadTags();
		Commands.loadIdea(id, () => {
			// check ownership
			unsubscribe = UID_STORE.subscribe((us) => {
				if ($CURRENT_IDEA_STORE.authorID != us) {
					goto("/view/" + id, { replaceState: true });
				}
			});

			title = $CURRENT_IDEA_STORE.title;
			content = $CURRENT_IDEA_STORE.content;
			tags = $CURRENT_IDEA_STORE.tags;

			loaded = true;
		});
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<h1>Edit Idea</h1>
		<hr />

		{#if errorMessage}
			<div transition:fade class="alert alert-danger">
				{errorMessage}
			</div>
		{/if}

		{#if $ERROR_MESSAGE_STORE}
			<div transition:fade class="alert alert-danger">Something went wrong</div>
		{/if}

		{#if loaded}
			<div class="p-3 form-group d-flex flex-column gap-3 border rounded">
				<h4>Title</h4>
				<input
					type="text"
					name="title"
					class="form-control"
					minlength="8"
					required
					placeholder="Title..."
					bind:value={title}
				/>

				<div>
					<h4>Content</h4>
					<MarkdownEditor bind:value={content} />
				</div>

				<hr />

				<h4>Tags</h4>
				<form on:submit|preventDefault={addTag} class="input-group">
					<span class="input-group-text">Tag</span>

					<input
						type="text"
						list="tags"
						class="form-control form-inline"
						placeholder="Add Tag..."
						required
						bind:value={currentTag}
					/>
					<datalist id="tags">
						{#each $TAG_STORE.filter((t) => !tags.includes(t)) as tag}
							<option value={tag}>{tag}</option>
						{/each}
					</datalist>
					<button
						type="submit"
						class="btn btn-primary"
						disabled={tags.includes(currentTag) || !isValidTag(currentTag)}
					>
						<i class="bi bi-plus" />
						<span>Add</span>
					</button>
				</form>

				<div class="d-flex gap-3">
					{#each tags as tag, i}
						<button
							type="button"
							class="btn btn-sm btn-primary"
							on:click={() => {
								removeTag(i);
							}}
						>
							<span>{tag}</span>
							<i class="bi bi-x" />
						</button>
					{/each}
				</div>

				<hr />

				<div class="d-flex justify-content-end align-items-center gap-3">
					<button type="button" class="btn btn-primary" on:click={updateIdea}>
						<i class="bi bi-check2" />
						<span>Save</span>
					</button>

					<button type="button" class="btn btn-outline-danger" on:click={cancle}>
						<i class="bi bi-x" />
						<span>Cancel</span>
					</button>
				</div>
			</div>
		{/if}
	</div>
</template>

<style lang="scss">
</style>
