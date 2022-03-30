<script lang="ts">
	import { goto } from "$app/navigation";

	import { Commands } from "$lib/core/commands";
	import { ERROR_MESSAGE_STORE } from "$lib/core/stores";
	import { isValidPassword, isValidUsername } from "$lib/tools/validation";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let username: string;
	let email: string;
	let password: string;
	let confirmation: string;

	let errorMessage = "";

	function register() {
		if (!isValidUsername(username)) {
			errorMessage = "Username is not valid! Needs at least 3 characters.";
			return;
		} else if (!isValidPassword(password)) {
			alert("Password is not valid");
			return;
		} else if (password !== confirmation) {
			errorMessage = "Passwords do not match!";
			return;
		} else {
			errorMessage = "";
		}

		Commands.register(username, email, password, () => {
			Commands.login(username, password, () => {
				goto("/");
			});
		});
	}

	onMount(() => {
		Commands.clearErrors();
	});
</script>

<template>
	<form on:submit|preventDefault={register} class="card shadow p-5">
		<h1 class="text-center">Sign Up</h1>
		<hr />

		{#if errorMessage}
			<div transition:fade class="alert alert-danger">
				{errorMessage}
			</div>
		{/if}

		{#if $ERROR_MESSAGE_STORE}
			<div transition:fade class="alert alert-danger">
				Register failed! Username might already be used.
			</div>
		{/if}

		<div class="row py-3">
			<div class="col-12 col-md-6">
				<div class="form-floating my-1">
					<input
						type="text"
						name="username"
						class="form-control"
						placeholder="Username"
						required
						minlength="3"
						bind:value={username}
					/>
					<label for="username">Username</label>
				</div>
			</div>

			<div class="col-12 col-md-6">
				<div class="form-floating my-1">
					<input
						type="email"
						name="email"
						class="form-control"
						placeholder="E-Mail"
						required
						bind:value={email}
					/>
					<label for="email">E-Mail</label>
				</div>
			</div>

			<div class="col-12 col-md-6">
				<div class="form-floating my-1">
					<input
						type="password"
						name="password"
						class="form-control"
						placeholder="Password"
						required
						minlength="8"
						bind:value={password}
					/>
					<label for="password">Password</label>
				</div>
			</div>

			<div class="col-12 col-md-6">
				<div class="form-floating my-1">
					<input
						type="password"
						name="confirmation"
						class="form-control"
						placeholder="Confirm Password"
						required
						minlength="8"
						bind:value={confirmation}
					/>
					<label for="confirmation">Confirm Password</label>
				</div>
			</div>
		</div>
		<hr />

		<div class="d-flex flex-column gap-3">
			<button type="submit" class="btn btn-primary">Register</button>
		</div>
		<hr />

		<div class="d-flex flex-column gap-3 align-items-center">
			<a href="/login">Already have an account?</a>
			<span>© {new Date().getFullYear()} TryThis</span>
		</div>
	</form>
</template>

<style lang="scss">
</style>
