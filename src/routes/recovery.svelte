<script lang="ts">
	import { Commands } from "$lib/core/commands";

	let email = "";
	let recovered = false;

	function sendRecovery() {
		Commands.recoverAccount(email, () => {
			recovered = true;
		});
	}
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<h1>Recovery</h1>
		<p>
			If you forgot your password, simply enter your email adress below. A recovery password will be
			created and sent to your email.
		</p>
		<hr />

		<form on:submit|preventDefault={sendRecovery} class="input-group p-3">
			<span class="input-group-text">@</span>
			<input
				type="email"
				name="email"
				class="form-control"
				placeholder="E-Mail"
				bind:value={email}
			/>
			<button type="submit" class="btn btn-primary" disabled={recovered}>Send</button>
		</form>

		{#if recovered}
			<p class="text-success">Check your inbox for the recovery password.</p>
		{/if}
	</div>
</template>

<style lang="scss">
</style>
