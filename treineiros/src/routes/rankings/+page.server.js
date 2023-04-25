import { accessPool } from '$db/db';

async function mostRecentYear() {
    const [rows, fields] = await accessPool().query(
        `SELECT year FROM competitions ORDER BY year DESC LIMIT 1;`);
    return rows[0].year;
}

async function mostMatches(competitions, periodStart, periodEnd) {
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
                WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                GROUP BY home_coach_id) AS home
            JOIN
                (SELECT m.away_coach_id,
                    COUNT(m.away_coach_id) AS away_matches 
                FROM matches AS m
                JOIN coaches AS ac
                ON m.away_coach_id = ac.coach_id
                JOIN competitions AS c
                ON m.competition_id = c.competition_id
                WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                GROUP BY away_coach_id) AS away
            ON home.home_coach_id = away.away_coach_id
            ORDER BY matches DESC
            LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd]);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const competitionDict = {
        a: 'Campeonato Brasileiro - Serie A',
        b: 'Campeonato Brasileiro - Serie B',
        c: 'Campeonato Brasileiro - Serie C',
        d: 'Campeonato Brasileiro - Serie D',
        cb: 'Copa do Brasil - Profissional',
    }
    let competitions = url.searchParams.get('competitions').split(',');
    let competitionQuery = competitions.map(x => competitionDict[x]);

    let period = url.searchParams.get('period').split(',');

    return {
        mostRecentYear: mostRecentYear(),
        mostMatches: mostMatches(competitionQuery, period[0], period[1]),
    };
};
