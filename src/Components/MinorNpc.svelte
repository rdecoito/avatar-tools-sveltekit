<script lang='ts'>
	import type { NonPlayerCharacter } from '../global';
	import { NpcImportance } from '../global';

	let npc: NonPlayerCharacter<NpcImportance.MODERATE> = {
		name: 'Geoff',
		importance: NpcImportance.MODERATE,
		conditions: ['Afraid', 'Angry', 'Guilty'],
		drive: 'To defeat his foes',
		principle: 'Freedom',
		status: {
			markedBalance: 2,
			markedConditions: ['Afraid'],
			
		}
	}
</script>

