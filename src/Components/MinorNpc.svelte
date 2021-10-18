<script lang='ts'>
	import type { ModerateImportance, NonPlayerCharacter } from '../global';
	import { NpcImportance, NpcMaxStats } from '../globals';

	export let npc: NonPlayerCharacter;
</script>

<div class="npc-container">
	<div class="info-block">
		<div>
			<select id="importance" bind:value={npc.importance}>
				{#each Object.values(NpcImportance) as importanceOption}
					<option value={importanceOption}>
						{importanceOption}
					</option>
				{/each}
			</select>
			&nbsp;NPC<br>
		</div>

		<input type="text" bind:value={npc.name}>

		<hr aria-hidden="true">

		<div>
			<label for="drive">
				Drive
			</label>
			<input type="text" bind:value={npc.drive}>
		</div>
	</div>

	<div class="status-block">
		<div class="condition-track">
			Conditions
			{#each npc.conditions as condition, index (condition)}
				{#if index < NpcMaxStats[npc.importance].conditions}
				<div>
					<input type="checkbox" bind:checked={condition[1]}>
					<input type="text" class="medium" bind:value={condition[0]}>
				</div>
				{/if}
			{/each}
		</div>

		<div class="balance-track">
			Balance
			<div>
				<input class="medium" type="text" bind:value={npc.principle}>
				<input class="small" type="number" bind:value={npc.balance}>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	input.small {
		width: 40px;
	}
	
	input.medium {
		width: 100px;
	}

	hr {
		align-self: center;
		border: 0;
		height: 1px;
		background: #333;
		background-image: linear-gradient(to right, #ccc, #333, #ccc);
	}

	.npc-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		max-width: 500px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

		>:not(:last-child) {
			margin-bottom: 5px;
		}

		.info-block {
			text-align: center;

			>:not(:last-child) >:not(hr) {
				margin-bottom: 2px;
			}

			>input {
				font-family: inherit;
			}
		}

		.status-block {
			display: flex;
			flex-flow: row wrap;

			>:not(:last-child) {
				margin-right: 4px;
			}

			.condition-track {
				display: flex;
				flex-flow: column wrap;
				align-items: center;
			}

			.balance-track {
				display: flex;
				flex-flow: column wrap;
				align-items: center;
			}
		}
	}	
</style>
