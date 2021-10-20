<script lang="ts">
	import type { NonPlayerCharacter } from 'src/global';
	import Npc from '../Components/Npc.svelte';
	import Card from '../Components/Card.svelte';
	import { NpcImportance } from '../globals';

	export let npcs: Array<NonPlayerCharacter> = [];

	const handleNewNpc = () => {
		npcs.push({
			name: '',
			importance: NpcImportance.MINOR,
			conditions: [['', false]],
			drive: 'To ',
			principle: '',
			fatigue: 0,
			balance: 0
		});

		npcs = npcs;
	}

	const handleResetNpc = (index: number) => {
		const npc = npcs[index];
		npc.fatigue = 0;
		npc.balance = 0;
		npc.conditions.forEach((condition) => condition[1] = false);

		npcs = npcs;
	}

	const handleEraseNpc = (index: number) => {
		npcs.splice(index, 1);

		npcs = npcs;
	}
</script>

<button on:click={handleNewNpc} class="new-npc-btn">+ New NPC</button>

<div class="npcs-block">
	{#each npcs as npc, index (npc)}
	<div class="Card-container">
		<Card>
			<div class="button-row">
				<button on:click={() => handleEraseNpc(index)}>X</button>
				<button on:click={() => handleResetNpc(index)}>{'<-'}</button>
			</div>
			<Npc npc={npc} />
		</Card>
	</div>
	{/each}
</div>

<style lang="scss">
	button.new-npc-btn {
		margin-bottom: 5px;
	}

	.npcs-block {
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
