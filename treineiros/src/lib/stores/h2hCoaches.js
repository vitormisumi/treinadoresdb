import { writable } from 'svelte/store';

export const createSearchStore1 = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const createSearchStore2 = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: '',
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const searchHandler = (store) => {
    const searchTerm = store.search.toLowerCase() || ""
    store.filtered = store.data.filter((item) => {
        return item.searchFields.toLowerCase().includes(searchTerm)
    })
};

export const coach1 = writable(0);
export const coach2 = writable(0);