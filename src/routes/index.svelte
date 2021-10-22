<script lang="ts">
	import type { PlayerCharacter, NonPlayerCharacter } from 'src/global';
	import { NpcImportance } from 'src/global';
	import NpcManager from 'src/Components/NpcManager.svelte';
	import PcManager from 'src/Components/Pc.svelte';

	let pcs: Array<PlayerCharacter> = [
		
	];

	let npcs: Array<NonPlayerCharacter> = [
		{
			name: 'Geoff',
			importance: NpcImportance.MODERATE,
			conditions: [['Angry', false], ['Afraid', false], ['Foolish', false]],
			drive: 'To defeat his foes',
			principle: 'Serendipity',
			fatigue: 3,
			balance: 0
		}
	];
</script>

<PcManager {pcs} />
<NpcManager {npcs} />

<style lang="scss">
	
</style>
