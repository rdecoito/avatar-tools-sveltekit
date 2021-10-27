<script lang="ts">
	import type {
		Condition,
		Fatigue,
		NonPlayerCharacter,
	} from "../types/avatar-legends";
	import { NpcImportance, NpcMaxStats } from "../constants/avatar-legends";
	import FakeCheckbox from "./FakeCheckbox.svelte";

	export let npc: NonPlayerCharacter;

	const handleFatigueClick = (index: number) => {
		if (npc.fatigue === index) {
			// user clicked the highest marked box
			npc.fatigue = 0 as Fatigue<NpcImportance>;
		} else {
			// user clicked a box other than the highest marked box
			npc.fatigue = index as Fatigue<NpcImportance>;
		}

		npc = npc;
	};

	// Importance Validation
	$: if (npc.importance) {
		const maxStats = NpcMaxStats[npc.importance];
		if (npc.fatigue > maxStats.fatigue) {
			npc.fatigue = maxStats.fatigue;
		}
		if (npc.balance > maxStats.balance) {
			npc.balance = maxStats.balance;
		}
		// clamp conditions so they never get unruly
		const absoluteMax = NpcMaxStats[NpcImportance.MAJOR].conditions;
		if (npc.conditions.length > absoluteMax) {
			npc.conditions.length = absoluteMax;
		}
		if (npc.conditions.length > maxStats.conditions) {
			for (
				let i = maxStats.conditions as number;
				i < npc.conditions.length;
				i++
			) {
				npc.conditions[i][1] = false;
			}
		}
	}

	// Conditions validation
	$: if (npc?.conditions) {
		const maxConds = NpcMaxStats[npc.importance].conditions;
		let curCondsLen = npc.conditions?.length as number;
		if (!npc.conditions) {
			npc.conditions = [] as Condition[];
			curCondsLen = 0;
		}

		if (curCondsLen < maxConds) {
			for (let i = curCondsLen; i < maxConds; i++) {
				npc.conditions.push(["", false]);
			}
		}
	}

	// Fatigue validation
	/* Commenting out because with the checkboxes it is impossible to screw it up
	$: if (npc?.fatigue != null) {
		const max = NpcMaxStats[npc.importance].fatigue;
		if (npc.fatigue > max) npc.fatigue = max;
		if (npc.fatigue < 0) npc.fatigue = 0;
	}
	*/

	// Balance validation
	$: if (npc?.balance != null) {
		const max = NpcMaxStats[npc.importance].balance;
		if (npc.balance > max) npc.balance = max;
		if (npc.balance < 0) npc.balance = 0;
	}
</script>

<div class="npc-container">
	<div class="info-block">
		<div>
			<select id="importance" bind:value={npc.importance}>
				{#each Object.values(NpcImportance) as importanceOption}
					<option value={importanceOption}>
						{importanceOption}
					</option>
				{/each}
			</select>
			&nbsp;NPC<br />
		</div>

		<input type="text" bind:value={npc.name} placeholder="Name" />

		<!--
			`aria-hidden` because this is purely a visual break.
			We don't want screenreaders seeing this.
		-->
		<hr aria-hidden="true" />

		<div>
			<label for="drive"> Drive </label>
			<input type="text" bind:value={npc.drive} placeholder="Drive" />
		</div>
	</div>

	<div class="fatigue-track">
		Fatigue
		<div class="fatigue-checkboxes">
			{#each [...Array(NpcMaxStats[npc.importance].fatigue).keys()] as index (index)}
				<div>
					<FakeCheckbox
						on:click={() => handleFatigueClick(index + 1)}
						checked={index < npc.fatigue}
					/>
				</div>
			{/each}
		</div>
	</div>

	<div class="status-block">
		<div class="condition-track">
			Conditions
			{#each npc.conditions as condition, index (condition)}
				{#if index < NpcMaxStats[npc.importance].conditions}
					<div>
						<input type="checkbox" bind:checked={condition[1]} />
						<input
							type="text"
							class="medium"
							bind:value={condition[0]}
							placeholder={`Condition ${index}`}
						/>
					</div>
				{/if}
			{/each}
		</div>

		<div class="balance-track">
			Balance
			<div>
				<input
					class="medium"
					type="text"
					bind:value={npc.principle}
					placeholder="Principle"
				/>
				<input class="small" type="number" bind:value={npc.balance} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	hr {
		align-self: center;
		border: 0;
		height: 1px;
		background: #333;
		background-image: linear-gradient(to right, #ccc, #333, #ccc);
	}

	.npc-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		max-width: 300px;

		> :not(:last-child) {
			margin-bottom: 5px;
		}

		.info-block {
			text-align: center;

			> :not(:last-child) > :not(hr) {
				margin-bottom: 2px;
			}

			> input {
				font-family: inherit;
				text-align: center;
			}
		}

		.fatigue-track {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.fatigue-checkboxes {
				display: flex;
				flex-flow: row wrap;

				> div {
					margin-left: 2px;
				}
			}
		}

		.status-block {
			display: flex;
			flex-flow: row wrap;

			> :not(:last-child) {
				margin-right: 4px;
			}

			.condition-track {
				display: flex;
				flex-flow: column wrap;
				align-items: center;
			}

			.balance-track {
				display: flex;
				flex-flow: column wrap;
				align-items: center;
			}
		}
	}
</style>
