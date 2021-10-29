<script lang="ts">
	import { ThemeWrapper } from "svelte-themer";
	import themes from "../themes";
	import CharacterStoreProvider from "../stores/CharacterStoreProvider.svelte";
	import DataImportExportButtons from "../Components/DataImportExportButtons.svelte";
</script>

<ThemeWrapper mode="dark" {themes}>
	<CharacterStoreProvider>
		<div class="navbar">
			<a href="/about" class="circle-icon button">
				<i class="fas fa-question" />
			</a>
			<a href="/" class="rounded button">
				<img src="/favicon-32x32.png" alt="Check Your Balance" />
				&nbsp;Check Your Balance
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

	a.rounded {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;

		border-radius: 0.75rem;
		padding: 0.25rem 1rem;
	}

	a:link,
	a:visited,
	a:hover,
	a:active {
		text-decoration: none;
	}

	a.circle-icon {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;

		border-radius: 0.75rem;
		height: 1.5rem;
		width: 1.5rem;
		font-size: x-small;
	}

	a.button {
		color: var(--theme-colors-text);
		background-color: var(--theme-colors-background-accent);
	}

	img {
		width: 1rem;
		height: 1rem;
	}
</style>
