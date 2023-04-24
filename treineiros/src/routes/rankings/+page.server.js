import { accessPool } from '$db/db';

async function mostMatches() {
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS coach_id, 
            home.name AS coach_name, 
            home.nickname AS coach_nickname, 
            (home.home_matches + away.away_matches) AS matches 
            FROM (SELECT m.home_coach_id, 
                    hc.name,
                    hc.nickname,
                    COUNT(m.home_coach_id) AS home_matches 
                FROM matches AS m
                JOIN coaches AS hc
                ON m.home_coach_id = hc.coach_id
                JOIN competitions AS c
                ON m.competition_id = c.competition_id
                WHERE c.name IN (?)
                GROUP BY home_coach_id) AS home
            JOIN
                (SELECT m.away_coach_id,
                    COUNT(m.away_coach_id) AS away_matches 
                FROM matches AS m
                JOIN coaches AS ac
                ON m.away_coach_id = ac.coach_id
                JOIN competitions AS c
                ON m.competition_id = c.competition_id
                WHERE c.name IN (?)
                GROUP BY away_coach_id) AS away
            ON home.home_coach_id = away.away_coach_id
            ORDER BY matches DESC
            LIMIT 10;`,
    ['Campeonato Brasileiro - Serie A', 'Campeonato Brasileiro - Serie A']);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        mostMatches: mostMatches(),
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData)
    }
}