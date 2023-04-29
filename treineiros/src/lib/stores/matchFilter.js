import { writable } from 'svelte/store';

export const filter = writable({
    team: 'default',
    season: 'default',
    competition: 'default',
});
