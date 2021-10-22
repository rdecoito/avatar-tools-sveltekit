<script lang="ts">
	import type { PlayerCharacter, NonPlayerCharacter } from '../global';
	import { NpcImportance } from '../global';
	import NpcManager from '../Components/NpcManager.svelte';
	import PcManager from '../Components/Pc.svelte';

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

<div class="top">
	<div>
		<PcManager {pcs} />
	</div>
	<div>
		<NpcManager {npcs} />
	</div>
</div>

<style lang="scss">
	div.top {
		display: flex;
		flex-flow: row nowrap;

		:not(:last-child) {
			margin-right: 10px;
		}
	}
</style>
