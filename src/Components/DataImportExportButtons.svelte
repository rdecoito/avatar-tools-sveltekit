<script lang="ts">
	import type {
		NonPlayerCharacter,
		PlayerCharacter,
	} from "../types/avatar-legends";
	import { APP_STATE_VERSION } from "../constants/metadata";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const pcStore = getContext<Writable<PlayerCharacter[]>>("pcStore");
	const npcStore = getContext<Writable<NonPlayerCharacter[]>>("npcStore");

	let fileInput: HTMLInputElement;
	let downloadLink: HTMLAnchorElement;

	let fileData: FileList;
	let downloadFileName: string;

	$: if (fileData?.length) {
		let file = fileData[0];
		downloadFileName = file.name;

		file.text()
			.then((text) => {
				let parsed = JSON.parse(text);
				if (Array.isArray(parsed.pcs)) {
					$pcStore = parsed.pcs;
				}
				if (Array.isArray(parsed.npcs)) {
					$npcStore = parsed.npcs;
				}
			})
			.catch((e) => {
				if (e instanceof SyntaxError) {
					// TODO: toast the user that an error occurred
					// eslint-disable-next-line no-console
					console.error(e);
				} else {
					throw e;
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
					pcs: $pcStore,
					npcs: $npcStore,
				}),
			],
			{ type: "text/plain" }
		);
		downloadLink.href = URL.createObjectURL(stateBlob);
		downloadLink.download = downloadFileName ?? "avatar-tools-data.json";
		downloadLink.click();
	};
</script>

<a
	bind:this={downloadLink}
	href="placeholder"
	download="placeholder"
	style="display: none"
>
	This download link is invisible
</a>

<input
	type="file"
	bind:this={fileInput}
	bind:files={fileData}
	style="display: none"
/>

<button style="display: block" on:click={handleImportClick}>
	<i class="fas fa-upload" />
</button>
<button style="display: block" on:click={handleSaveClick}>
	<i class="fas fa-download" />
</button>

<style lang="scss">
	button:not(:last-child) {
		margin-right: var(--theme-space-gap);
	}
</style>
