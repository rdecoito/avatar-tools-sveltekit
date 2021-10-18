/// <reference types="@sveltejs/kit" />

type MinorImportance = 'Minor';
type ModerateImportance = 'Moderate';
type MajorImportance = 'Major';

type AnyNpcImportance = MinorImportance | ModerateImportance | MajorImportance;

type Fatigue<T extends NpcImportance> = T extends MinorImportance ? 0 | 1
	: T extends ModerateImportance ? 0 | 1 | 2 | 3 | 4 | 5
	: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Condition = [string, boolean];
type Conditions<T extends AnyNpcImportance> = T extends MinorImportance ? [Condition]
	: T extends ModerateImportance ? [Condition, Condition, Condition]
	: [Condition, Condition, Condition, Condition, Condition]

type Balance<T extends AnyNpcImportance> = T extends MinorImportance ? 0 | 1
	: T extends ModerateImportance ? 0 | 1 | 2
	: 0 | 1 | 2 | 3;

export interface NonPlayerCharacter<T extends AnyNpcImportance = AnyNpcImportance> {
	/** The name of the NPC */
	name: string;
	/** The importance level of the NPC */
	importance: T;
	/** The principle the NPC  tries to embody */
	principle: string;
	/** The drive the NPC works toward. Must be in the format 'To <something>' */
	drive: `To ${string}`;
	/** A mapping between the names of possible conditions and whether the condition is marked */
	conditions: Conditions<T>;
	/** The amount of fatigue the NPC has marked */
	fatigue: Fatigue<T>;
	/** The position of the NPCs balance in the direction of their principle */
	balance: Balance<T>;
}
