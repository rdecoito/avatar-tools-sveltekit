<script lang="ts">
	import type { PlayerCharacter } from '../global';

	export let pcs: Array<PlayerCharacter> = [];
</script>

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
	
</style>
