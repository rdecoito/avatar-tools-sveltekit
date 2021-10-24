<script lang="ts">
	import type { PlayerCharacter, NonPlayerCharacter } from '../globals';
	import NpcManager from '../Components/NpcManager.svelte';
	import PcManager from '../Components/PcManager.svelte';
	import { APP_STATE_VERSION } from '../costants';

	let pcs: Array<PlayerCharacter> = [];
	let npcs: Array<NonPlayerCharacter> = [];
	let downloadFileName: string;

	let fileInput: HTMLInputElement;
	let downloadLink: HTMLAnchorElement;

	let fileData: FileList;

	$: if (fileData?.length) {
		let file = fileData[0];
		downloadFileName = file.name;
		file
			.text()
			.then((text) => {
				let parsed = JSON.parse(text);
				if (Array.isArray(parsed.pcs)) {
					pcs = parsed.pcs;
				}
				if (Array.isArray(parsed.npcs)) {
					npcs = parsed.npcs;
				}
			})
			.catch((e) => {
				if (e instanceof SyntaxError) {
				}
			})
			.finally(() => {
				fileData = null;
			});
	}

	const handleImportClick = () => {
		if (fileInput) fileInput.click();
	};

	const handleSaveClick = async () => {
		if (!downloadLink) return;
		const stateBlob = new Blob(
			[
				JSON.stringify({
					version: APP_STATE_VERSION,
					pcs,
					npcs
				})
			],
			{ type: 'text/plain ' }
		);
		downloadLink.href = URL.createObjectURL(stateBlob);
		downloadLink.download = downloadFileName ?? 'avatar-tools-data.json';
		downloadLink.click();
	};
</script>

<input type="file" bind:this={fileInput} bind:files={fileData} style="display: none;" />
<button on:click={handleImportClick}>Import Data</button>

<a bind:this={downloadLink} href="placeholder" download="placeholder" style="display: none;"
	>This download link is invisible</a
>
<button on:click={handleSaveClick}>Save Data</button>
<hr />

<div class="top">
	<div>
		<PcManager {pcs} row={true} />
	</div>
	<div>
		<NpcManager {npcs} row={true} />
	</div>
</div>

<style lang="scss">
	div.top {
		display: flex;
		flex-flow: row wrap;

		width: 100%;
		background-color: #333;

		:not(:last-child) {
			margin-right: 10px;
		}

		> div {
			display: flex;
			flex-flow: row wrap;

			width: 48%;
			max-width: 48%;
			overflow: hidden;
			padding: 5px;
		}
	}
</style>
