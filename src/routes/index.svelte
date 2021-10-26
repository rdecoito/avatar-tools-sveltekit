<script lang="ts">
	import PcManager from "../Components/PcManager.svelte";
	import NpcManager from "../Components/NpcManager.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type {
		NonPlayerCharacter,
		PlayerCharacter,
	} from "src/types/avatar-legends";

	const pcStore = getContext<Writable<PlayerCharacter[]>>("pcStore");
	const npcStore = getContext<Writable<NonPlayerCharacter[]>>("npcStore");

	const SHOW_PLAYERS = "Players";
	const SHOW_NPCS = "NPCs";

	let show = "Players";
</script>

<div class="manager-switcher">
	<div
		class:highlighted={show === SHOW_PLAYERS}
		on:click={() => (show = SHOW_PLAYERS)}
	>
		Players
	</div>
	<div
		class:highlighted={show === SHOW_NPCS}
		on:click={() => (show = SHOW_NPCS)}
	>
		NPCs
	</div>
</div>

<div class="top">
	<div class:small-shown={show === SHOW_PLAYERS}>
		<PcManager bind:pcs={$pcStore} row={true} />
	</div>
	<div class:small-shown={show === SHOW_NPCS}>
		<NpcManager bind:npcs={$npcStore} row={true} />
	</div>
</div>

<style lang="scss">
	@media (max-width: 570px) {
		div.top {
			display: flex;
			flex-flow: column;
			align-items: center;
			overflow: auto;
			min-height: 100%;
			padding: var(--theme-space-separation);

			> div.small-shown {
				display: none;
			}
		}

		div.manager-switcher {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			position: sticky;
			bottom: 0;
			height: 2em;
			width: 100%;

			> div {
				display: flex;
				align-items: center;
				justify-content: center;

				color: var(--theme-colors-text);
				text-align: center;
				width: 50%;
				height: 100%;
				background-color: var(--theme-colors-background-contrast);
				cursor: default;

				&.highlighted {
					background-color: var(--theme-colors-background-accent);
					box-shadow: 0 0 20px var(--theme-colors-background-accent);
				}

				&:not(:last-child) {
					border-right: 1px solid var(--theme-colors-background);
				}

				&:hover {
					background-color: var(--theme-colors-background-accent);
				}
			}
		}
	}

	@media (min-width: 571px) {
		div.top {
			display: flex;
			flex-flow: row nowrap;

			> div {
				display: flex;
				flex-flow: row wrap;
				justify-content: center;

				width: 50%;
			}
		}

		div.manager-switcher {
			display: none;
		}
	}
</style>
