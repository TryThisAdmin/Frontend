<script lang="ts">
	import { Commands } from "$lib/core/commands";

	import { TOKEN_STORE, USERNAME_STORE } from "$lib/core/stores";
	import { showLogin } from "$lib/tools/login";
	import { fade, fly } from "svelte/transition";

	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function logout() {
		Commands.logout();
	}
</script>

<template>
	<!-- Desktop Header -->
	<header
		class="d-none d-md-flex flex-row flex-wrap align-items-center justify-content-center px-3 py-2 shadow header"
	>
		<div class="flex-fill d-flex justify-content-center">
			<a href="/">
				<img src="/logo.png" alt="TryThis Logo" width="32" height="32" />
			</a>
		</div>

		<div class="flex-fill d-flex gap-2 justify-content-center">
			<a href="/" class="nav-link">Home</a>
			<a href="/create" class="nav-link">Create</a>
			<a href="/top" class="nav-link">Most Liked</a>
			<a href="/recent" class="nav-link">Most Recent</a>
			<a href="/search" class="nav-link">Search</a>
		</div>

		<div class="flex-fill d-flex gap-2 justify-content-center">
			{#if $TOKEN_STORE}
				<a href="/account" role="button" class="btn btn-outline-primary text-white">
					<i class="bi bi-person-fill" />
					<span>{$USERNAME_STORE}</span>
				</a>
				<button type="button" class="btn btn-primary" on:click={logout}>Logout</button>
			{:else}
				<button type="button" class="btn btn-outline-primary text-white" on:click={showLogin}
					>Login</button
				>
				<a href="/signup" role="button" class="btn btn-primary">Sign Up</a>
			{/if}
		</div>
	</header>

	<!-- Mobile Header -->
	<header
		class="d-flex d-md-none flex-row gap-3 flex-wrap align-items-center justify-content-center px-3 py-2 shadow header"
	>
		<div class="flex-fill d-flex justify-content-center align-items-center">
			<a
				href="/"
				class="text-decoration-none d-flex justify-content-center align-items-center gap-2"
			>
				<img src="/logo.png" alt="TryThis Logo" width="32" height="32" />
				<span class="text-white fs-2 fw-bold">TryThis</span>
			</a>
		</div>

		<div class="flex-fill d-flex justify-content-center">
			<button type="button" class="btn btn-outline-primary text-white" on:click={toggleMenu}
				>Menu</button
			>
		</div>
	</header>

	<!-- Mobile Menu Overlay -->
	{#if showMenu}
		<div class="overlay fixed-top" on:click|self={toggleMenu} transition:fade>
			<div class="menu bg-white p-3" transition:fly={{ x: -200 }}>
				<div class="d-flex flex-wrap align-items-center justify-content-start gap-3 py-3">
					<img
						src="/logo.png"
						alt="TryThis Logo"
						class="bg-secondary rounded p-2"
						width="48"
						height="48"
					/>
					<span class="text-secondary fw-bold fs-2">Navigation</span>
				</div>
				<hr />

				<a href="/" class="nav-link" on:click={toggleMenu}>Home</a>
				<a href="/create" class="nav-link" on:click={toggleMenu}>Create</a>
				<a href="/top" class="nav-link" on:click={toggleMenu}>Most Liked</a>
				<a href="/recent" class="nav-link" on:click={toggleMenu}>Most Recent</a>
				<a href="/search" class="nav-link" on:click={toggleMenu}>Search</a>
				<hr />

				<div class="d-flex flex-wrap justify-content-evenly gap-3">
					{#if $TOKEN_STORE}
						<a href="/account" role="button" class="btn btn-outline-primary" on:click={toggleMenu}>
							<i class="bi bi-person-fill" />
							<span>{$USERNAME_STORE}</span>
						</a>
						<button type="button" class="btn btn-primary" on:click={logout}>Logout</button>
					{:else}
						<button type="button" class="btn btn-outline-primary" on:click={showLogin}>Login</button
						>
						<a href="/signup" role="button" class="btn btn-primary" on:click={toggleMenu}>Sign Up</a
						>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</template>

<style lang="scss">
	.header {
		background-color: #37415a;

		.nav-link {
			color: #ffffff;

			&:hover {
				color: rgba(255, 255, 255, 0.7);
			}
		}
	}

	.overlay {
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
		z-index: 1000;

		.menu {
			height: 100%;
			width: 256px;
		}
	}
</style>
