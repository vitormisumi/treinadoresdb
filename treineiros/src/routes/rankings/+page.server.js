import { accessPool } from '$db/db';

async function mostMatches() {
    const [rows, fields] = await accessPool().query(`
        SELECT home.coach_id, home.name, home.nickname, (number_of_home_matches + number_of_away_matches) AS number_of_matches FROM
        (SELECT c.coach_id, c.name AS name, c.nickname AS nickname, COUNT(home_coach_id) AS number_of_home_matches FROM matches AS m
        JOIN coaches AS c ON m.home_coach_id = c.coach_id
        GROUP BY c.coach_id) AS home
        JOIN
        (SELECT c.coach_id, COUNT(away_coach_id) AS number_of_away_matches FROM matches AS m
        JOIN coaches AS c ON m.away_coach_id = c.coach_id
        GROUP BY c.coach_id) AS away
        ON home.coach_id = away.coach_id
        ORDER BY number_of_matches DESC LIMIT 10;`);
    return rows;
}

async function mostGoalsScored() {
    const [rows, fields] = await accessPool().query(`
        SELECT home.coach_id, home.name, home.nickname, (home.home_score + away.away_score) AS goals_scored FROM
        (SELECT c.coach_id, c.name AS name, c.nickname AS nickname, SUM(home_score) AS home_score FROM matches AS m
        JOIN coaches AS c ON m.home_coach_id = c.coach_id
        GROUP BY c.coach_id) AS home
        JOIN
        (SELECT c.coach_id, SUM(away_score) AS away_score FROM matches AS m
        JOIN coaches AS c ON m.away_coach_id = c.coach_id
        GROUP BY c.coach_id) AS away
        ON home.coach_id = away.coach_id
        ORDER BY goals_scored DESC LIMIT 10;`);
    return rows;
}

async function mostGoalsConceded() {
    const [rows, fields] = await accessPool().query(`
        SELECT home.coach_id, home.name, home.nickname, (home.away_score + away.home_score) AS goals_conceded FROM
        (SELECT c.coach_id, c.name AS name, c.nickname AS nickname, SUM(away_score) AS away_score FROM matches AS m
        JOIN coaches AS c ON m.home_coach_id = c.coach_id
        GROUP BY c.coach_id) AS home
        JOIN
        (SELECT c.coach_id, SUM(home_score) AS home_score FROM matches AS m
        JOIN coaches AS c ON m.away_coach_id = c.coach_id
        GROUP BY c.coach_id) AS away
        ON home.coach_id = away.coach_id
        ORDER BY goals_conceded DESC LIMIT 10;`);
    return rows;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        mostMatches: mostMatches(),
        mostGoalsScored: mostGoalsScored(),
        mostGoalsConceded: mostGoalsConceded(),
    };
};