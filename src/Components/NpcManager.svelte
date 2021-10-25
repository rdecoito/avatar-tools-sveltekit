<script lang="ts">
	import type { NonPlayerCharacter } from '../types/avatar-legends';
	import { NpcImportance } from '../constants/avatar-legends';
	import Npc from '../Components/Npc.svelte';
	import Card from '../Components/Card.svelte';

	export let npcs: Array<NonPlayerCharacter>;
	export let row: boolean = true;

	const handleNewNpc = () => {
		npcs.push({
			name: '',
			importance: NpcImportance.MINOR,
			conditions: [['', false]],
			drive: 'To ',
			principle: '',
			fatigue: 0,
			balance: 0,
		});

		npcs = npcs;
	};

	const handleResetNpc = (index: number) => {
		const npc = npcs[index];
		npc.fatigue = 0;
		npc.balance = 0;
		npc.conditions.forEach((condition) => (condition[1] = false));

		npcs = npcs;
	};

	const handleEraseNpc = (index: number) => {
		npcs.splice(index, 1);

		npcs = npcs;
	};
</script>

<div>
	<button on:click={handleNewNpc} class="new-npc-btn">+ New NPC</button>

	<div class="npcs-block" class:row>
		{#each npcs as npc, index (npc)}
			<div class="Card-container">
				<Card>
					<div class="button-row">
						<button on:click={() => handleEraseNpc(index)}>X</button
						>
						<button on:click={() => handleResetNpc(index)}
							>{'<-'}</button
						>
					</div>
					<Npc {npc} />
				</Card>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.npcs-block {
		display: flex;
		flex-flow: column;
		align-items: flex-start;

		&.row {
			flex-flow: row wrap;
		}

		.Card-container {
			margin: var(--theme-space-separation);

			.button-row {
				position: absolute;
			}
		}
	}
</style>
