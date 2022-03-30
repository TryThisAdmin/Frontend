<script lang="ts">
	import type { IdeaPreview } from "$lib/core/interfaces";
	import { UID_STORE } from "$lib/core/stores";

	export let idea: IdeaPreview;
</script>

<template>
	<a href="/view/{idea.id}" class="card card-body text-decoration-none text-dark shadow">
		<h5 class="text-truncate fw-bold" title={idea.title}>{idea.title}</h5>

		<div class="d-flex flex-wrap gap-1">
			{#if $UID_STORE != idea.authorID}
				<a
					href="/user/{idea.authorID}"
					title="Created by {idea.author}"
					class="badge bg-success text-light text-decoration-none"
				>
					<i class="bi bi-person-fill" />
					<span>{idea.author}</span>
				</a>
			{/if}

			{#if idea.created.getTime() == idea.updated.getTime()}
				<span class="badge bg-success" title="Created on {idea.created.toLocaleDateString()}"
					>{idea.created.toLocaleDateString()}</span
				>
			{:else}
				<span class="badge bg-success" title="Updated on {idea.updated.toLocaleDateString()}"
					>{idea.updated.toLocaleDateString()}</span
				>
			{/if}
		</div>

		<hr class="my-2" />

		<div class="d-flex flex-wrap gap-1">
			<span class="badge bg-danger" title="{idea.likes} Likes">
				<i class="bi bi-heart-fill" />
				<span>{idea.likes}</span>
			</span>

			{#each idea.tags as tag}
				<span class="badge bg-primary">{tag}</span>
			{/each}
		</div>
	</a>
</template>

<style lang="scss">
</style>
