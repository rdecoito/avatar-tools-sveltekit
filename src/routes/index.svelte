<script lang="ts">
	import MinorNpc from '../Components/MinorNpc.svelte';
	import { NpcImportance } from '../globals';
</script>

<MinorNpc npc={{
	name: 'Geoff',
	importance: NpcImportance.MODERATE,
	conditions: [['Angry', false], ['Afraid', false], ['Foolish', false]],
	drive: 'To defeat his foes',
	principle: 'Serendipity',
	fatigue: 0,
	balance: 0
}} />
