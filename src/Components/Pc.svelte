<script lang="ts">
	import type { PlayerCharacter } from "../types/avatar-legends";
	import {
		Playbook,
		Training,
		PcMaxStats,
	} from "../constants/avatar-legends";
	import FakeCheckbox from "./FakeCheckbox.svelte";

	export let pc: PlayerCharacter;

	const handleFatigueClick = (newFatigue: number) => {
		if (newFatigue === pc.fatigue) {
			pc.fatigue = 0;
		} else {
			pc.fatigue = newFatigue;
		}
	};

	const handleGrowthClick = (newGrowth: number) => {
		if (newGrowth === pc.growth) {
			pc.growth = 0;
		} else {
			pc.growth = newGrowth;
		}
	};

	$: if (
		typeof pc.stats === "object" &&
		typeof pc.growth === "number" &&
		typeof pc.balance === "number" &&
		Array.isArray(pc.conditions)
	) {
		["creativity", "focus", "harmony", "passion"].forEach((stat) => {
			if (pc.stats[stat] > PcMaxStats.stats) {
				pc.stats[stat] = PcMaxStats.stats;
			} else if (pc.stats[stat] < -PcMaxStats.stats) {
				pc.stats[stat] = -PcMaxStats.stats;
			}
		});

		if (pc.growth > PcMaxStats.growth) {
			pc.growth = PcMaxStats.growth;
		} else if (pc.growth < 0) {
			pc.growth = 0;
		}

		if (pc.balance > PcMaxStats.balance) {
			pc.balance = PcMaxStats.balance;
		} else if (pc.balance < -PcMaxStats.balance) {
			pc.balance = -PcMaxStats.balance;
		}

		if (pc.conditions.length > PcMaxStats.conditions) {
			pc.conditions.length = PcMaxStats.conditions;
		}
	}
</script>

<div class="pc-container">
	<div class="info-block">
		<select class="medium" bind:value={pc.playbook}>
			{#each Object.values(Playbook) as playbook}
				<option value={playbook}>
					{playbook}
				</option>
			{/each}
		</select>

		<input
			class="medium"
			type="text"
			bind:value={pc.name}
			placeholder="Name"
		/>

		<select class="medium" bind:value={pc.training}>
			{#each Object.values(Training) as training}
				<option value={training}>
					{training}
				</option>
			{/each}
		</select>

		<input
			class="medium"
			type="text"
			bind:value={pc.fightingStyle}
			placeholder="Fighting Style"
		/>
	</div>

	<hr aria-hidden="true" />

	<div class="stat-reference">
		<div class="left">
			<div>
				Creativity&nbsp;
				<input
					class="small"
					type="number"
					bind:value={pc.stats.creativity}
				/>
			</div>
			<div>
				Focus&nbsp;
				<input
					class="small"
					type="number"
					bind:value={pc.stats.focus}
				/>
			</div>
		</div>

		<div class="right">
			<div>
				Harmony&nbsp;
				<input
					class="small"
					type="number"
					bind:value={pc.stats.harmony}
				/>
			</div>
			<div>
				Passion&nbsp;
				<input
					class="small"
					type="number"
					bind:value={pc.stats.passion}
				/>
			</div>
		</div>
	</div>

	<div class="stat-block">
		<div class="fatigue-track">
			Fatigue
			{#each [1, 2, 3, 4, 5] as index (index)}
				<div>
					<FakeCheckbox
						on:click={() => handleFatigueClick(index)}
						checked={index <= pc.fatigue}
					/>
				</div>
			{/each}
		</div>

		<div class="stat-row">
			<div class="condition-track">
				Conditions
				{#each pc.conditions as condition, index (condition)}
					<div>
						<input type="checkbox" bind:checked={condition[1]} />
						<input
							type="text"
							class="medium"
							bind:value={condition[0]}
							placeholder={`Conditon ${index}`}
						/>
					</div>
				{/each}
			</div>

			<div class="balance-track">
				Balance
				<input
					class="medium"
					type="text"
					bind:value={pc.principles[1]}
					placeholder="Principle 1 (+)"
				/>
				<input class="small" type="number" bind:value={pc.balance} />
				<input
					class="medium"
					type="text"
					bind:value={pc.principles[0]}
					placeholder="Principle 2 (-)"
				/>
			</div>
		</div>
	</div>

	<div class="fatigue-track">
		Growth
		{#each [1, 2, 3, 4] as index (index)}
			<div>
				<FakeCheckbox
					on:click={() => handleGrowthClick(index)}
					checked={index <= pc.growth}
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	hr {
		align-self: center;
		border: 0;
		height: 1px;
		width: 80%;
		background: #333;
		background-image: linear-gradient(to right, #ccc, #333, #ccc);
	}

	.pc-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;

		max-width: 300px;

		> :not(hr):not(:last-child) {
			margin-bottom: 5px;
		}

		.info-block {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			input,
			select {
				text-align: center;
			}
		}

		.fatigue-track {
			display: flex;
			flex-flow: row nowrap;

			> div {
				margin-left: 2px;
			}
		}

		.stat-reference {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			.left {
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;

				margin-right: 2px;
			}

			.right {
				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;
			}
		}

		.stat-block {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;

			margin-top: 2px;

			.stat-row {
				display: flex;
				flex-flow: row nowrap;

				:not(:last-child) {
					margin-right: 2px;
				}

				.condition-track {
					text-align: center;
				}

				.balance-track {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
				}
			}
		}
	}
</style>
