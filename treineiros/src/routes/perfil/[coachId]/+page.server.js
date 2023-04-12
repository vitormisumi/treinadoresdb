import { createPool } from 'mysql2';
// import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } from '$env/static/private';

const pool = createPool({
    host: "containers-us-west-35.railway.app",
    port: "6058",
    user: "root",
    password: "wx8vG4YqewXLCoxFTLZ5",
    database: "railway",
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100, 
    idleTimeout: 60000,
    queueLimit: 0
});
const promisePool = pool.promise();

async function getCoach(coach_id) {
    const [rows, fields] = await promisePool.query("SELECT * FROM coaches WHERE coach_id = ?", [coach_id]);
    return rows[0];
}

async function lastClub(coach_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT date_time, name, state FROM matches
        JOIN teams ON matches.home_team_id = teams.team_id
        WHERE home_coach_id = ? ORDER BY date_time DESC LIMIT 1;`,
        [coach_id]);
    const [rows2, fields2] = await promisePool.query(`
        SELECT date_time, name, state FROM matches
        JOIN teams ON matches.away_team_id = teams.team_id
        WHERE away_coach_id = ? ORDER BY date_time DESC LIMIT 1;`,
        [coach_id]);
    if (rows[0].date_time > rows2[0].date_time) {
        return rows[0].name + '/' + rows[0].state;
    } 
    return rows2[0].name + '/' + rows[0].state;
}

async function numberOfClubs(coach_id) {
    const [rows, fields] = await promisePool.query(`SELECT DISTINCT(name), state FROM matches 
        JOIN teams ON matches.home_team_id = teams.team_id
        WHERE home_coach_id = ?
        UNION
        SELECT DISTINCT(name), state FROM matches
        JOIN teams ON matches.away_team_id = teams.team_id
        WHERE away_coach_id = ?;`,
        [coach_id, coach_id]);
    return rows.length;
}

async function numberOfMatches(coach_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT COUNT(*) FROM matches 
        WHERE home_coach_id = ? OR away_coach_id = ?;`, [coach_id, coach_id]);
    return Object.values(rows[0]);
}

async function mostMatches(coach_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT a.team_id, COUNT(a.team_id) AS count, name, state
        FROM (SELECT match_id, team_id FROM matches 
        JOIN teams ON matches.home_team_id = teams.team_id 
        WHERE home_coach_id = ?
        UNION 
        SELECT match_id, team_id FROM matches 
        JOIN teams ON matches.away_team_id = teams.team_id 
        WHERE away_coach_id = ?) AS a
        JOIN teams ON a.team_id = teams.team_id GROUP BY a.team_id ORDER BY count DESC LIMIT 1;`,
        [coach_id, coach_id]);
    return rows[0];
}

async function percentage(coach_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT t.points / max.maxpoints FROM (
        SELECT SUM(points) AS points FROM (
        SELECT COUNT(*) * 3 AS points FROM matches WHERE home_coach_id = ? AND home_score > away_score
        UNION
        SELECT COUNT(*) * 3 AS points FROM matches WHERE away_coach_id = ? AND away_score > home_score
        UNION
        SELECT COUNT(*) AS points FROM matches WHERE home_coach_id = ? AND home_score = away_score
        UNION
        SELECT COUNT(*) AS points FROM matches WHERE away_coach_id = ? AND home_score = away_score) AS total) AS t JOIN (
        SELECT COUNT(*) * 3 AS maxpoints FROM matches WHERE home_coach_id = ? OR away_coach_id = ?) AS max;`,
        [coach_id, coach_id, coach_id, coach_id, coach_id, coach_id]);
    return Math.round(Number(Object.values(rows[0]) * 100));
}

async function matches(coach_id) {
    const [rows, fields] = await promisePool.query(`
        SELECT date_time, stadium, c.name AS competition, ht.name AS home_team, ht.state AS home_team_state, home_score, away_score, at.name AS away_team, at.state AS away_team_state,
        CASE WHEN home_coach_id = ? THEN 'Mandante'
        ELSE 'Visitante'
        END AS coach
        FROM matches AS m
        JOIN competitions AS c ON m.competition_id = c.competition_id
        JOIN teams AS ht ON m.home_team_id = ht.team_id
        JOIN teams AS at ON m.away_team_id = at.team_id
        WHERE home_coach_id = ? OR away_coach_id = ? ORDER BY date_time DESC LIMIT 10;`,
        [coach_id, coach_id, coach_id]);
    console.log(rows);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        coach: getCoach(params.coachId),
        lastClub: lastClub(params.coachId),
        numberOfClubs: numberOfClubs(params.coachId),
        numberOfMatches: numberOfMatches(params.coachId),
        mostMatches: mostMatches(params.coachId),
        percentage: percentage(params.coachId),
        matches: matches(params.coachId)
    };
};