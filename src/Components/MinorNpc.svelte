<script lang='ts'>
	import type { NonPlayerCharacter } from '../global';
	import { NpcImportance } from '../globals';

	let npc: NonPlayerCharacter<NpcImportance.MODERATE> = {
		name: 'Geoff',
		importance: NpcImportance.MODERATE,
		conditions: {
			'Afraid': false,
			'Angry': false,
			'Guilty': false
		},
		drive: 'To defeat his foes',
		principle: 'Freedom',
		fatigue: 0,
		balance: 0
	}

	$: console.log(npc);
</script>

<label for="name">
	Name
</label>
<input type="text" bind:value={npc.name}>

<br>
<label for="importance">
	Importance
</label>
<select id="importance" bind:value={npc.importance}>
	{#each Object.values(NpcImportance) as importanceOption}
		<option value={importanceOption}>
			{importanceOption}
		</option>
	{/each}
</select>

<br>
<label for="conditions">
	Conditions
</label>
{#each Object.keys(npc.conditions) as condName}
	<input type="checkbox" bind:checked={npc.conditions[condName]}>
{/each}

<br>
<label for="drive">
	Drive
</label>
<textarea bind:value={npc.drive}></textarea>

<div class="balance-track">
	<label for="balance">
		Balance
	</label>
	<input type="number" bind:value={npc.balance}>

	<label for="principle">
		Principle
	</label>
	<input type="text" bind:value={npc.principle}>
</div>

<style>
	div.balance-track {
		display: flex;
		flex-flow: row wrap;
		
	}
</style>