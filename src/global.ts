/// <reference types="@sveltejs/kit" />

/* ========= ========= ========= */
/* ========= CONSTANTS ========= */
/* ========= ========= ========= */

export enum Playbook {
	BOLD = 'The Bold',
	GUARDIAN = 'The Guardian',
	HAMMER = 'The Hammer',
	ICON = 'The Icon',
	IDEALIST = 'The Idealist',
	SUCCESSOR = 'The Successor'
};

export enum MasteryLevel {
	LEARNED = 'Learned',
	PRACTICED = 'Practiced',
	MASTERED = 'Mastered'
};

export enum Approach {
	DM = 'D&M',
	AA = 'A&A',
	EO = 'E&O'
};

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
};

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

/* ========= ===== ========= */
/* ========= TYPES ========= */
/* ========= ===== ========= */

export type Fatigue<T extends NpcImportance> = T extends NpcImportance.MINOR ? 0 | 1
	: T extends NpcImportance.MODERATE ? 0 | 1 | 2 | 3 | 4 | 5
	: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Condition = [string, boolean];
export type Conditions = Array<Condition>;

export type Balance<T extends NpcImportance> = T extends NpcImportance.MINOR ? 0 | 1
	: T extends NpcImportance.MODERATE ? 0 | 1 | 2
	: 0 | 1 | 2 | 3;

export interface NonPlayerCharacter<T extends NpcImportance = NpcImportance> {
	/** The name of the NPC */
	name: string;
	/** The importance level of the NPC */
	importance: T;
	/** The principle the NPC  tries to embody */
	principle: string;
	/** The drive the NPC works toward. Must be in the format 'To <something>' */
	drive: `To ${string}`;
	/** A mapping between the names of possible conditions and whether the condition is marked */
	conditions: Conditions;
	/** The amount of fatigue the NPC has marked */
	fatigue: Fatigue<T>;
	/** The position of the NPCs balance in the direction of their principle */
	balance: Balance<T>;
}

export interface FightingTechnique {
	name: string;
	approach: Approach;
	mastery: MasteryLevel;
}

export interface PlayerStats {
	creativity: number;
	focus: number;
	harmony: number;
	passion: number;
}

export interface PlayerCharacter {
	playbook: string;
	trainings: Array<string>;
	fightingStyle: string;
	stats: PlayerStats;
	moves: Array<string>;
	techniques: Array<FightingTechnique>;
	growth: number;
	fatigue: 0 | 1 | 2 | 3 | 5;
	conditions: Array<Condition>;
	principles: [string, string];
	balance: 3 | 2 | 1 | 0 | -1 | -2 | -3;
}
