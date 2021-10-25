<script lang="ts">
	import { ThemeWrapper } from 'svelte-themer';
	import themes from '../themes';
</script>

<ThemeWrapper mode="dark" {themes}>
	<div class="navbar" />
	<slot />
</ThemeWrapper>

<style lang="scss">
	div.navbar {
		width: 100%;
		height: 30px;
		position: sticky;
		background-color: var(--theme-colors-background-contrast);
		margin-bottom: var(--theme-space-gap);
	}
</style>
