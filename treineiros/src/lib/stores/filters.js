import { writable } from 'svelte/store';

export const profileHistoryGroups = writable("");

export const profileMatchFilters = writable({
    team: 'default',
    season: 'default',
    competition: 'default',
});

export const h2hMatchFilters = writable({
    season: 'default',
    competition: 'default',
});
