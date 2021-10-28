<script lang="ts">
	import { ThemeWrapper } from "svelte-themer";
	import themes from "../themes";
	import CharacterStoreProvider from "../stores/CharacterStoreProvider.svelte";
	import DataImportExportButtons from "../Components/DataImportExportButtons.svelte";
</script>

<ThemeWrapper mode="dark" {themes}>
	<CharacterStoreProvider>
		<div class="navbar">
			<a href="/about" class="circle-button">
				<i class="fas fa-question" />
			</a>
			<div style="display: flex; flex-flow: row nowrap;">
				<DataImportExportButtons />
			</div>
		</div>
		<slot />
	</CharacterStoreProvider>
</ThemeWrapper>

<style lang="scss">
	div.navbar {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;

		background-color: var(--theme-colors-background-contrast);
		margin-bottom: var(--theme-space-gap);
		padding: var(--theme-space-separation);
	}

	a.circle-button {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;

		color: var(--theme-colors-text);
		background-color: var(--theme-colors-background-accent);
		border-radius: 0.75rem;
		height: 1.5rem;
		width: 1.5rem;
		font-size: x-small;
	}
</style>
