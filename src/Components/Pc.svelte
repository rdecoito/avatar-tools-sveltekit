<script lang="ts">
	import type { PlayerCharacter } from '../global';
	import { Playbook, Training } from '../global';

	export let pc: PlayerCharacter = {};
</script>

<div class="pc-container">
	<div class="info-block">
		<select class="medium" bind:value={pc.playbook}>
			{#each Object.values(Playbook) as playbook}
				<option value={playbook}>
					{playbook}
				</option>
			{/each}
		</select>

		<input class="medium" type="text" bind:value={pc.name}>

		<select class="medium" type="text" bind:value={pc.training}>
			{#each Object.values(Training) as training}
				<option value={training}>
					{training}
				</option>
			{/each}
		</select>

		<input class="medium" type="text" bind:value={pc.fightingStyle}>
	</div>
</div>

<style lang="scss">
	input {
		font-family: inherit;
	}

	input.small {
		width: 40px;
	}
	
	input.medium {
		width: 100px;
	}

	.pc-container {
		display: flex;
		flex-flow: column nowrap;

		max-width: 300px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

		.info-block {
			display: flex;
			flex-flow: column nowrap;
		}
	}
</style>
