import { createPool } from 'mysql2';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } from '$env/static/private';

const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100, 
    idleTimeout: 60000,
    queueLimit: 0
});
const promisePool = pool.promise();

async function matchData(match_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT * FROM matches WHERE match_id = ?`,
        [match_id]);
    return rows[0];
}

async function competition(match_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT match_id, name FROM matches
        JOIN competitions ON matches.competition_id = competitions.competition_id
        WHERE match_id = ?;`,
        [match_id]);
    return rows[0];
}

async function teams(match_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT m.match_id, ht.name AS home_team_name, ht.state AS home_team_state, at.name AS away_team_name, at.state AS away_team_state
        FROM matches AS m
        JOIN teams AS ht ON m.home_team_id = ht.team_id
        JOIN teams AS at ON m.away_team_id = at.team_id
        WHERE match_id = ?;`,
        [match_id]);
    return rows[0];
}

async function coaches(match_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT m.match_id, hc.name AS home_coach, hc.nickname AS home_coach_nickname, ac.name AS away_coach, ac.nickname AS away_coach_nickname
        FROM matches AS m
        JOIN coaches AS hc ON m.home_coach_id = hc.coach_id
        JOIN coaches AS ac ON m.away_coach_id = ac.coach_id
        WHERE match_id = ?;`,
        [match_id]);
    return rows[0];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        matchData: matchData(params.matchId),
        competition: competition(params.matchId),
        teams: teams(params.matchId),
        coaches: coaches(params.matchId)
    };
};