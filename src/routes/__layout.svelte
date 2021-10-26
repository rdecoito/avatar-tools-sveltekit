<script lang="ts">
	import { ThemeWrapper } from "svelte-themer";
	import themes from "../themes";
	import CharacterStoreProvider from "../stores/CharacterStoreProvider.svelte";
	import DataImportExportButtons from "../Components/DataImportExportButtons.svelte";
</script>

<ThemeWrapper mode="dark" {themes}>
	<CharacterStoreProvider>
		<div class="navbar">
			<DataImportExportButtons />
		</div>
		<slot />
	</CharacterStoreProvider>
</ThemeWrapper>

<style lang="scss">
	div.navbar {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;

		background-color: var(--theme-colors-background-contrast);
		margin-bottom: var(--theme-space-gap);
		padding: var(--theme-space-separation);
	}
</style>
