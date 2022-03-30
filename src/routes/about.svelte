<script lang="ts">
</script>

<template>
	<div class="container-fluid p-3 card shadow border">
		<h1>About - TryThis</h1>
		<hr />

		<h3 class="mb-3">What</h3>
		<p>
			TryThis was an internal project of some students at the Schmalkalden University of Applied
			Science. The goal was to craft a platform for sharing IT related ideas. This website is meant
			as a showcase of our product.
		</p>

		<h3 class="mb-3">How</h3>
		<p>
			The platform uses an handcrafted PHP backend with SQLite for the database. The frontend was
			created using SvelteKit and Bootstrap. Content is stored and rendered as markdown. Other than
			the standard features, the markdown interpreter can also mostly understand GitHubs Markdown as
			well as mermaid. The editor is build using EasyMDE.
		</p>
		<p>
			See our GitHub page for more info.
		</p>

		<hr />

		<h2>Contact</h2>
		<p>
			ProjektInformatik.TryThis@gmail.com
		</p>

		<hr>
		
		<h5 class="fw-bold">Follow us on:</h5>

		<div class="d-flex flex-wrap gap-2">
			<a href="https://github.com/TryThisAdmin" target="_blank" class="btn btn-primary fs-1">
				<i class="bi bi-github" />
			</a>

			<a
				href="https://www.facebook.com/people/Try-This/100079124689844/"
				target="_blank"
				class="btn btn-primary fs-1"
			>
				<i class="bi bi-facebook" />
			</a>

			<a href="https://twitter.com/TryThisProjekt" target="_blank" class="btn btn-primary fs-1">
				<i class="bi bi-twitter" />
			</a>

			<a
				href="https://www.instagram.com/trythisprojekt/"
				target="_blank"
				class="btn btn-primary fs-1"
			>
				<i class="bi bi-instagram" />
			</a>
		</div>
	</div>
</template>

<style lang="scss">
</style>
