# How to use the Backend API

## Endpoint

In order to use the Backend API a valid endpoint is needed.
This can be specified in [endpoint.ts](../src/lib/core/api/endpoint.ts) and needs to point to a deployed Backend.

## Basics

To use the the api there are two important constructs: Stores and Commands.

- Stores keep data in svelte stores and can be easily accessed in svelte files via the `$` operator
- Stores have default values, either being empty list for lists, empty string for strings or null for objects
- Commands interact with the backend and modify the stores
- every Command has a function as its last parameter to be executed on successful loading. This makes it possible to chain commands if needed.
- the `ERROR_MESSAGE_STORE` contains the latest error message
- some Commands append to store, some replace the content and other clear it

All commands are collected in the [Commands](../src/lib/core/commands/index.ts) Object.
Please check it out for information about the existing commands.

Below you can find some examples on how to interact with the backend

## Examples
### Example 1 - Showing top ideas

```svelte
<script>
	// ... imports
	onMount(() => {
		Commands.clearTopIdeas(); // Clear the TOP_IDEAS_STORE
		Commands.loadTopIdeas(10); // load the top 10 ideas to the TOP_IDEAS_STORE
		Commands.appendTopIdeas(10, 10); // append the next top 10 ideas to the TOP_IDEAS_STORE
	});
</script>

<div>
	{#each $TOP_IDEAS_STORE as idea}
		<span>{idea.title}</span>
	{/each}
</div>
```

### Example 2 - Showing idea details

```svelte
<script>
	// ... imports
	onMount(() => {
		Commands.clearIdea(); // Clear the CURRENT_IDEA_STORE
		Commands.loadIdea("1"); // load data of idea with id = 1 into the CURRENT_IDEA_STORE
	});
</script>

<div>
	{#if $CURRENT_IDEA_STORE}
		<span>{$CURRENT_IDEA_STORE.title}</span>
		<span>{$CURRENT_IDEA_STORE.content}</span>
	{/if}
</div>
```

### Example 3 - Liking an idea

```svelte
<script>
	// ... imports
	function likeIdea() {
		Commands.likeIdea("1"); // Like idea with id = 1
	}
</script>

<div>
	<button on:click={likeIdea}>Like</button>
</div>
```

### Example 4 Check if user is logged in

```svelte
<script>
	// ... imports
	onMount(() => {
		if (!$TOKEN_STORE) goto("/login", { replaceState: true }); // Redirect if user is not logged in
	});
</script>

<div>
	<span>Only for members</span>
</div>
```
