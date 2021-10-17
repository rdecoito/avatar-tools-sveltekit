/// <reference types="@sveltejs/kit" />
import { NpcImportance } from './global';

type MarkedFatigue<T extends NpcImportance> = T extends NpcImportance.MINOR ? 0 | 1
	: T extends NpcImportance.MODERATE ? 0 | 1 | 2 | 3 | 4 | 5
	: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface LookupConditionsType {
	[NpcImportance.MINOR]: [string];
	[NpcImportance.MODERATE]: [string, string, string];
	[NpcImportance.MAJOR]: [string, string, string, string, string];
}

type MarkedBalance<T extends NpcImportance> = T extends NpcImportance.MINOR ? 0 | 1
	: T extends NpcImportance.MODERATE ? 0 | 1 | 2
	: 0 | 1 | 2 | 3;

export interface NonPlayerCharacter<T extends NpcImportance> {
	/** The name of the NPC */
	name: string;
	/** The importance level of the NPC */
	importance: T;
	/** The principle the NPC  tries to embody */
	principle: string;
	/** The drive the NPC works toward. Must be in the format 'To <something>' */
	drive: `To ${string}`;
	/** A mapping between the names of possible conditions and whether the condition is marked */
	conditions: Record<string, boolean>;
	/** The amount of fatigue the NPC has marked */
	fatigue: MarkedFatigue;
	/** The position of the NPCs balance in the direction of their principle */
	balance: MarkedBalance;
}

export const NpcStatMap: Record<NpcImportance, NpcStatus> = Object.freeze({
	/*
		DEVELOPMENT NOTE: If the conditions value changes for any of these,
		make sure the NonPlayerCharacter#conditions type also changes
	*/
	[NpcImportance.MINOR]: Object.freeze({
		fatigue: 3,
		conditions: 1,
		balance: 1
	}),
	[NpcImportance.MODERATE]: Object.freeze({
		fatigue: 5,
		conditions: 3,
		balance: 2
	}),
	[NpcImportance.MAJOR]: Object.freeze({
		fatigue: 10,
		conditions: 5,
		balance: 3
	})
});

export interface NpcStatus<T extends NpcImportance> {
	/** The amount of fatigue the NPC currently has marked */
	markedFatigue: T extends NpcImportance.MINOR ? 0 | 1
		: T extends NpcImportance.MODERATE ? 0 | 1 | 2 | 3 | 4 | 5
		: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	/** The conditions the NPC currently has marked */
	markedConditions: Record<keyof LookupConditionsType[T], boolean>;
	/** The position of the NPCs balance in the direction of their principle */
	markedBalance: T extends NpcImportance.MINOR ? 0 | 1
		: T extends NpcImportance.MODERATE ? 0 | 1 | 2
		: 0 | 1 | 2 | 3;
}
