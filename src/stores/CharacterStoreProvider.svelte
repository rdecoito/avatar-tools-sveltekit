<script lang="ts">
	import type {
		PlayerCharacter,
		NonPlayerCharacter,
	} from '../types/avatar-legends';
	import { isStorageAvailable } from '../utilities/data';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	const PCS_LOCAL_KEY = 'pcStore';
	const NPCS_LOCAL_KEY = 'npcStore';

	let localStorage: Storage;
	let initPcStore: Array<PlayerCharacter>;
	let initNpcStore: Array<NonPlayerCharacter>;
	let subscribeToStorage = true;

	// Sometimes localStorage is disabled or unavailable, per MDN docs
	// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
	if (isStorageAvailable('localStorage')) {
		localStorage = window.localStorage;
		let pcs = localStorage.getItem(PCS_LOCAL_KEY);
		try {
			pcs = JSON.parse(pcs);
			if (Array.isArray(pcs)) {
				// TODO: validate pcs array
				initPcStore = pcs ?? [];
			} else {
				throw new SyntaxError(
					'Stored data was in the incorrect format'
				);
			}
		} catch (e) {
			if (e instanceof SyntaxError) {
				initPcStore = [];
			} else {
				throw e;
			}
		}

		let npcs = localStorage.getItem(NPCS_LOCAL_KEY);
		try {
			npcs = JSON.parse(npcs);
			if (Array.isArray(npcs)) {
				// TODO: validate npcs array
				initNpcStore = npcs ?? [];
			} else {
				throw new SyntaxError(
					'Stored data was in the incorrect format'
				);
			}
		} catch (e) {
			if (e instanceof SyntaxError) {
				initNpcStore = [];
			} else {
				throw e;
			}
		}
	} else {
		// TODO: toast the user that local storage is unavailable
		initPcStore = [];
		initNpcStore = [];
		subscribeToStorage = false;
	}

	const pcStore = writable<PlayerCharacter[]>(initPcStore);
	const npcStore = writable<NonPlayerCharacter[]>(initNpcStore);

	if (subscribeToStorage) {
		pcStore.subscribe((pcs) => {
			localStorage?.setItem(PCS_LOCAL_KEY, JSON.stringify(pcs));
		});
		npcStore.subscribe((npcs) => {
			localStorage?.setItem(NPCS_LOCAL_KEY, JSON.stringify(npcs));
		});
	}

	setContext('pcStore', pcStore);
	setContext('npcStore', npcStore);
</script>

<slot />
