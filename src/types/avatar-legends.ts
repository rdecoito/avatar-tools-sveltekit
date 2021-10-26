import type {
	NpcImportance,
	Approach,
	MasteryLevel
} from '../constants/avatar-legends';

export type Fatigue<T extends NpcImportance> = T extends NpcImportance.MINOR
	? 0 | 1
	: T extends NpcImportance.MODERATE
	? 0 | 1 | 2 | 3 | 4 | 5
	: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Condition = [string, boolean];
export type Conditions = Array<Condition>;

export type Balance<T extends NpcImportance> = T extends NpcImportance.MINOR
	? 0 | 1
	: T extends NpcImportance.MODERATE
	? 0 | 1 | 2
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
	name: string;
	playbook: string;
	training: string;
	fightingStyle: string;
	stats: PlayerStats;
	moves: Array<string>;
	techniques: Array<FightingTechnique>;
	growth: number;
	fatigue: number;
	conditions: Array<Condition>;
	principles: [string, string];
	balance: number;
}
