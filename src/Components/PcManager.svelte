<script lang="ts">
	import { createNewPc } from '../utilities/characters';

	import type { PlayerCharacter } from '../globals';
	import Card from './Card.svelte';
	import Pc from './Pc.svelte';

	export let pcs: Array<PlayerCharacter> = [];

	const handleNewPc = () => {
		pcs.push(createNewPc())
		pcs = pcs;
	}

	const handleErasePc = (index: number) => {
		pcs.splice(index, 1);

		pcs = pcs;
	}

	const handleResetPc = (index: number) => {
		const pc = pcs[index];
		pc.fatigue = 0;
		pc.conditions.forEach((cond) => cond[1] = false);
		pc.balance = 0;
		pc.growth = 0;

		pcs = pcs;
	}
</script>

<div>
	<button on:click={handleNewPc} class="new-npc-btn">+ New NPC</button>
	
	<div class="pcs-block">
		{#each pcs as pc, index (pc)}
		<div class="Card-container">
			<Card>
				<div class="button-row">
					<button on:click={() => handleErasePc(index)}>X</button>
					<button on:click={() => handleResetPc(index)}>{'<-'}</button>
				</div>
				<Pc pc={pc} />
			</Card>
		</div>
		{/each}
	</div>
</div>

<style lang="scss">
	button.new-npc-btn {
		margin-bottom: 5px;
	}

	.pcs-block {
		display: flex;
		flex-flow: column;
		align-items: flex-start;

		.Card-container {
			.button-row {
				position: absolute;
			}

			&:not(:last-child) {
				margin-bottom: 7px;
			}
		}
	}
</style>
