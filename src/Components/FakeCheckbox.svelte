<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let checked: boolean = false;

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('click', event.detail)
	}
</script>

<div
	class="fake-checkbox"
	class:checked
	on:click={forward}
></div>

<style lang="scss">
	.fake-checkbox {
		width: 1em;
		height: 1em;
		border-radius: 2px;
		background-color: white;

		&.checked {
			background-color: brown;
		}
	}
</style>