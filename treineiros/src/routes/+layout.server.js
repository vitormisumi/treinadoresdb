import { accessPool } from '$db/db';

async function getCoaches() {
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches ORDER BY nickname, name;`);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        coaches: getCoaches()
    };
};