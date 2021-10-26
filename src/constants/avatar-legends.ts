import type { Fatigue, Balance } from '../types/avatar-legends';

export enum PcMaxStats {
	stats = 3,
	balance = 3,
	fatigue = 5,
	conditions = 5,
	growth = 4
}

export enum Playbook {
	BOLD = 'The Bold',
	GUARDIAN = 'The Guardian',
	HAMMER = 'The Hammer',
	ICON = 'The Icon',
	IDEALIST = 'The Idealist',
	SUCCESSOR = 'The Successor'
}

export enum MasteryLevel {
	LEARNED = 'Learned',
	PRACTICED = 'Practiced',
	MASTERED = 'Mastered'
}

export enum Approach {
	DM = 'D&M',
	AA = 'A&A',
	EO = 'E&O'
}

export enum Training {
	WATERBENDING = 'Waterbending',
	FIREBENDING = 'Firebending',
	EARTHBENDING = 'Earthbending',
	AIRBENDING = 'Airbending',
	WEAPONS = 'Weapons',
	TECHNOLOGY = 'Technology'
}

export enum NpcImportance {
	/**
	 * An NPC who may participate in conversations or fights but is unlikely to reappear in the adventure
	 */
	MINOR = 'Minor',
	/**
	 * An NPC who may be the focus of a session, but likely not the focus of an entire adventure
	 */
	MODERATE = 'Moderate',
	/**
	 * An NPC who may be a significant recurring character and may be the focus of an adventure
	 */
	MAJOR = 'Major'
}

export const NpcMaxStats = Object.freeze({
	[NpcImportance.MINOR]: Object.freeze({
		fatigue: 3 as Fatigue<NpcImportance.MINOR>,
		conditions: 1,
		balance: 1 as Balance<NpcImportance.MINOR>
	}),
	[NpcImportance.MODERATE]: Object.freeze({
		fatigue: 5 as Fatigue<NpcImportance.MODERATE>,
		conditions: 3,
		balance: 2 as Balance<NpcImportance.MODERATE>
	}),
	[NpcImportance.MAJOR]: Object.freeze({
		fatigue: 10 as Fatigue<NpcImportance.MAJOR>,
		conditions: 5,
		balance: 3 as Balance<NpcImportance.MAJOR>
	})
});
