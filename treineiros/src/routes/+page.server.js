import { accessPool } from '$db/db';

async function lastMatches() {
    const [rows, fields] = await accessPool().query(`
        SELECT m.match_id, m.date_time, c.name AS competition, ht.team_id AS home_team_id, ht.name AS home_team_name, at.team_id AS away_team_id, at.name AS away_team_name, m.home_score, m.away_score, hc.name AS home_coach, hc.nickname AS home_coach_nickname, ac.name AS away_coach, ac.nickname AS away_coach_nickname 
        FROM matches AS m 
        JOIN competitions AS c ON m.competition_id = c.competition_id 
        JOIN teams AS ht ON m.home_team_id = ht.team_id
        JOIN teams AS at ON m.away_team_id = at.team_id
        JOIN coaches AS hc ON m.home_coach_id = hc.coach_id
        JOIN coaches AS ac ON m.away_coach_id = ac.coach_id
        ORDER BY date_time DESC
        LIMIT 5;`);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        matches: lastMatches(),
    };
};