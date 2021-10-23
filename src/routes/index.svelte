<script lang="ts">
	import { PlayerCharacter, NonPlayerCharacter, Training } from '../globals';
	import { NpcImportance, Playbook } from '../globals';
	import NpcManager from '../Components/NpcManager.svelte';
	import PcManager from '../Components/PcManager.svelte';

	let pcs: Array<PlayerCharacter> = [
		{
			name: 'Sue',
			playbook: Playbook.BOLD,
			training: Training.FIREBENDING,
			fightingStyle: 'Fire Fists',
			stats: {
				creativity: 2,
				focus: 1,
				harmony: 0,
				passion: -1
			},
			moves: [],
			techniques: [],
			growth: 0,
			fatigue: 3,
			conditions: [
				['Afraid', false],
				['Angry', false],
				['Foolish', false],
			],
			principles: ['Freedom', 'Role'],
			balance: 1
		}
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
