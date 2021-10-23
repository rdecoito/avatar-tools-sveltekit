import type { NonPlayerCharacter, PlayerCharacter } from "../global";

export const validateNpc = (npc: NonPlayerCharacter): boolean  => true;

export const createNewPc = (): PlayerCharacter => ({
	name: '',
	playbook: '',
	training: '',
	fightingStyle: '',
	stats: {
		creativity: 0,
		harmony: 0,
		focus: 0,
		passion: 0
	},
	moves: [],
	techniques: [],
	growth: 0,
	fatigue: 0,
	conditions: [
		['Afraid', false],
		['Angry', false],
		['Foolish', false],
		['Guilty', false],
		['Insecure', false]
	],
	principles: ['', ''],
	balance: 0
});