<script lang="ts">
	import type { PlayerCharacter } from '../globals';
	import { Playbook, Training } from '../globals';
	import FakeCheckbox from './FakeCheckbox.svelte';

	export let pc: PlayerCharacter;

	const handleFatigueClick = (newFatigue: number) => {
		if (newFatigue === pc.fatigue) {
			pc.fatigue = 0;
		} else {
			pc.fatigue = newFatigue;
		}
	}

	const handleGrowthClick = (newGrowth: number) => {
		if (newGrowth === pc.growth) {
			pc.growth = 0;
		} else {
			pc.growth = newGrowth;
		}
	}
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

		<select class="medium" bind:value={pc.training}>
			{#each Object.values(Training) as training}
				<option value={training}>
					{training}
				</option>
			{/each}
		</select>

		<input class="medium" type="text" bind:value={pc.fightingStyle}>
	</div>

	<div class="stat-reference">
		<div class="left">
			<div>
				Creativity&nbsp;
				<input class="small" type="number" bind:value={pc.stats.creativity}>
			</div>
			<div>
				Focus&nbsp;
				<input class="small" type="number" bind:value={pc.stats.focus}>
			</div>
		</div>

		<div class="right">
			<div>
				Harmony&nbsp;
				<input class="small" type="number" bind:value={pc.stats.harmony}>
			</div>
			<div>
				Passion&nbsp;
				<input class="small" type="number" bind:value={pc.stats.passion}>
			</div>
		</div>
	</div>

	<div class="stat-block">
		<div class="fatigue-track">
			Fatigue
			{#each [1, 2, 3, 4, 5] as index (index)}
				<div>
					<FakeCheckbox on:click={() => handleFatigueClick(index)} checked={index <= pc.fatigue} />
				</div>
			{/each}
		</div>

		<div class="stat-row">
			<div class="condition-track">
				Conditions
				{#each pc.conditions as condition (condition)}
					<div>
						<input type="checkbox" bind:checked={condition[1]}>
						<input type="text" class="medium" bind:value={condition[0]}>
					</div>
				{/each}
			</div>

			<div class="balance-track">
				Balance
				<input class="medium" type="text" bind:value={pc.principles[1]}>
				<input class="small" type="number" bind:value={pc.balance}>
				<input class="medium" type="text" bind:value={pc.principles[0]}>
			</div>
		</div>
	</div>

	<div class="fatigue-track">
		Growth
		{#each [1, 2, 3, 4] as index (index)}
			<div>
				<FakeCheckbox on:click={() => handleGrowthClick(index)} checked={index <= pc.growth} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	input, select {
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
		align-items: center;

		max-width: 300px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

		:not(:last-child) {
			margin-bottom: 2px;
		}

		.info-block {
			display: flex;
			flex-flow: column nowrap;
		}

		.fatigue-track {
			display: flex;
			flex-flow: row nowrap;
			
			>div {
				margin-left: 2px;
			}
		}

		.stat-reference {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.left {
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;

				margin-right: 2px;
			}

			.right {
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;
			}
		}

		.stat-block {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			margin-top: 2px;

			.stat-row {
				display: flex;
				flex-flow: row nowrap;

				:not(:last-child) {
					margin-right: 2px;
				}

				.condition-track {
					text-align: center;
				}

				.balance-track {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
				}
			}
		}
	}
</style>
