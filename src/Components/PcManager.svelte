<script lang="ts">
	import { createNewPc } from "../utilities/characters";
	import type { PlayerCharacter } from "../types/avatar-legends";
	import Card from "./Card.svelte";
	import Pc from "./Pc.svelte";

	export let pcs: Array<PlayerCharacter>;
	export let row = false;

	const handleNewPc = () => {
		pcs.push(createNewPc());

		pcs = pcs;
	};

	const handleErasePc = (index: number) => {
		pcs.splice(index, 1);

		pcs = pcs;
	};

	const handleResetPc = (index: number) => {
		const pc = pcs[index];
		pc.fatigue = 0;
		pc.conditions.forEach((cond) => (cond[1] = false));
		pc.balance = 0;
		pc.growth = 0;

		pcs = pcs;
	};
</script>

<div class="manager-container">
	<button on:click={handleNewPc} class="new-npc-btn">+ New PC</button>

	<div class="pcs-block" class:row>
		{#if Array.isArray(pcs)}
			{#each pcs as pc, index (pc)}
				<div class="Card-container">
					<Card>
						<div class="button-row">
							<button on:click={() => handleErasePc(index)}
								>X</button
							>
							<button on:click={() => handleResetPc(index)}
								>{"<-"}</button
							>
						</div>
						<Pc {pc} />
					</Card>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	div.manager-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.pcs-block {
		display: flex;
		flex-flow: column;
		align-items: center;

		&.row {
			flex-flow: row wrap;
			justify-content: center;
		}

		.Card-container {
			margin: var(--theme-space-separation);

			.button-row {
				position: absolute;
			}
		}
	}
</style>
