<div class="card">
	<slot />
</div>

<style lang="scss">
	$backgroundColor: rgb(88, 81, 38);

	div.card {
		color: white;
		background-color: $backgroundColor;
		box-shadow: 0 0 5px 2px $backgroundColor;
		padding: 5px;
	}
</style>
