<script lang="ts">
	import { goto } from "$app/navigation";

	import { Commands } from "$lib/core/commands";
	import { ERROR_MESSAGE_STORE } from "$lib/core/stores";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let username: string;
	let password: string;

	function login() {
		Commands.login(username, password, () => {
			goto("/");
		});
	}

	onMount(() => {
		Commands.clearErrors();
	});
</script>

<template>
	<form on:submit|preventDefault={login} class="card shadow p-5">
		<h1 class="text-center">Login</h1>
		<hr />

		{#if $ERROR_MESSAGE_STORE}
			<div transition:fade class="alert alert-danger">Login Failed</div>
		{/if}

		<div class="d-flex flex-column py-3">
			<div class="form-floating my-1">
				<input
					type="text"
					name="username"
					class="form-control"
					placeholder="Username"
					required
					bind:value={username}
				/>
				<label for="username">Username</label>
			</div>
			<div class="form-floating my-1">
				<input
					type="password"
					name="password"
					class="form-control"
					placeholder="Password"
					required
					bind:value={password}
				/>
				<label for="password">Password</label>
			</div>
		</div>
		<hr />

		<div class="d-flex flex-column gap-3">
			<button type="submit" class="btn btn-primary">Login</button>
			<a href="/signup" class="btn btn-secondary">Sign Up</a>
		</div>
		<hr />

		<div class="d-flex flex-column gap-3 align-items-center">
			<a href="/recovery">Forgot your password?</a>
			<span>© {new Date().getFullYear()} TryThis</span>
		</div>
	</form>
</template>

<style lang="scss">
</style>
