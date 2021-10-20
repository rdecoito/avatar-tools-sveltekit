import type {
	Balance,
	Conditions,
	Fatigue,
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
		fatigue: 3 as Fatigue<MinorImportance>,
		conditions: 1 as Conditions<MinorImportance>['length'],
		balance: 1 as Balance<MinorImportance>
	}),
	['Moderate' as ModerateImportance]: Object.freeze({
		fatigue: 5 as Fatigue<ModerateImportance>,
		conditions: 3 as Conditions<ModerateImportance>['length'],
		balance: 2 as Balance<ModerateImportance>
	}),
	['Major' as MajorImportance]: Object.freeze({
		fatigue: 10 as Fatigue<MajorImportance>,
		conditions: 5 as Conditions<MajorImportance>['length'],
		balance: 3 as Balance<MajorImportance>
	})
});
