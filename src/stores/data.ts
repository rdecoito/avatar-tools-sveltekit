import type { PlayerCharacter, NonPlayerCharacter } from "../types/avatar-legends";
import { writable } from "svelte/store";

const PCS_LOCAL_KEY = 'pcStore';
const NPCS_LOCAL_KEY = 'npcStore';

let localStorage: Storage;
export const pcStore = writable<PlayerCharacter[]>([]);
export const npcStore = writable<NonPlayerCharacter[]>([]);

// Sometimes localStorage is disabled or unavailable, per MDN docs
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
if (storageAvailable('localStorage')) {
    localStorage = window.localStorage;
    const pcs = localStorage.getItem(PCS_LOCAL_KEY);
    if (Array.isArray(pcs)) { // TODO: validate pcs array
        pcStore.set(pcs);
    }

    const npcs = localStorage.getItem(NPCS_LOCAL_KEY);
    if (Array.isArray(npcs)) { // TODO: validate npcs array
        npcStore.set(npcs);
    }
} else {
    // TODO: toast the user that local storage is unavailable
}

pcStore.subscribe((pcs) => localStorage?.setItem(PCS_LOCAL_KEY, JSON.stringify(pcs)));
npcStore.subscribe((npcs) => localStorage?.setItem(NPCS_LOCAL_KEY, JSON.stringify(npcs)));

// Function obtained from MDN docs (see link above)
function storageAvailable(type: string) {
    var storage: Storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
