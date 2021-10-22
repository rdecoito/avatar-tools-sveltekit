<script lang="ts">
	import type { PlayerCharacter } from '../global';
	import Card from './Card.svelte';
	import Pc from './Pc.svelte';

	export let pcs: Array<PlayerCharacter> = [];

	const handleErasePc = (index: number) => {
		pcs.splice(index, 1);

		pcs = pcs;
	}

	const handleResetPc = (index: number) => {
		const pc = pcs[index];
		pc.fatigue = 0;
		pc.conditions.forEach((cond) => cond[1] = false);
		pc.balance = 0;

		pcs = pcs;
	}
</script>

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

<style lang="scss">
	
</style>
