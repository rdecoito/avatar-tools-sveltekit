<script lang="ts">
	import type { NonPlayerCharacter } from "../types/avatar-legends";
	import { NpcImportance } from "../constants/avatar-legends";
	import Npc from "../Components/Npc.svelte";
	import Card from "../Components/Card.svelte";

	export let npcs: Array<NonPlayerCharacter>;
	export let row = true;

	const handleNewNpc = () => {
		npcs.push({
			name: "",
			importance: NpcImportance.MINOR,
			conditions: [],
			drive: "To ",
			principle: "",
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

<div class="manager-container">
	<button on:click={handleNewNpc} class="new-npc-btn">+ New NPC</button>

	<div class="npcs-block" class:row>
		{#each npcs as npc, index (npc)}
			<div class="Card-container">
				<Card>
					<div class="button-row">
						<button
							class="small"
							on:click={() => handleEraseNpc(index)}
						>
							x
						</button>
						<button
							class="small"
							on:click={() => handleResetNpc(index)}
						>
							{"⟳"}
						</button>
					</div>
					<Npc {npc} />
				</Card>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	div.manager-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.npcs-block {
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
