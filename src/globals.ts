import type {
	AnyNpcImportance,
	MajorImportance,
	MinorImportance,
	ModerateImportance
} from "./global";

export const NpcImportance = Object.freeze({
	/**
	 * An NPC who may participate in conversations or fights but is unlikely to reappear in the adventure
	 */
	MINOR: 'Minor' as MinorImportance,
	/**
	 * An NPC who may be the focus of a session, but likely not the focus of an entire adventure
	 */
	MODERATE: 'Moderate' as ModerateImportance,
	/**
	 * An NPC who may be a significant recurring character and may be the focus of an adventure
	 */
	MAJOR: 'Major' as MajorImportance
});

export const NpcMaxStats = Object.freeze({
	['Minor' as MinorImportance]: Object.freeze({
		fatigue: 3,
		conditions: 1,
		balance: 1
	}),
	['Moderate' as ModerateImportance]: Object.freeze({
		fatigue: 5,
		conditions: 3,
		balance: 2
	}),
	['Major' as MajorImportance]: Object.freeze({
		fatigue: 10,
		conditions: 5,
		balance: 3
	})
});
