import { accessPool } from '$db/db';

const emptyCoachInfo = {
    coach_id: "",
    name: "",
    nickname: "",
    date_of_birth: "",
    country_of_birth: "",
    date_of_birth: "",
    matches: "",
    last_match_date: "",
    last_team_name: "",
    last_team_state: "",
    teams: "",
    most_matches: "",
    most_matches_team: "",
    most_matches_team_state: "",
    point_percentage: "",
    goals_scored_average: "",
    goals_conceded_average: ""
};
        
const emptyH2hInfo = {
    coach1_wins: "",
    ties: "",
    coach2_wins: "",
    coach1_goals: "",
    coach2_goals: "",
    coach1_yellow_cards: "",
    coach2_yellow_cards: "",
    coach1_red_cards: "",
    coach2_red_cards: "",
};

async function getCoaches() {
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches ORDER BY nickname, name;`);
    return rows;
};

async function coachInfo(coach_id) {
    if (coach_id === null) {
        return emptyCoachInfo;
    };
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches WHERE coach_id = ?;`,
        [coach_id]); 
    if (rows.length === 0) {
        return emptyCoachInfo;
    };
    const [rows1, fields1] = await accessPool().query(`
        SELECT COUNT(*) AS matches 
        FROM matches 
        WHERE home_coach_id = ? OR away_coach_id = ?;`,
        [coach_id, coach_id]);
    const [rows2, fields2] = await accessPool().query(`
        SELECT date_time AS last_match_date, 
            name AS last_team_name, 
            state AS last_team_state
        FROM matches
        JOIN teams ON matches.home_team_id = teams.team_id
        WHERE home_coach_id = ?
        UNION
        SELECT date_time, 
            name, 
            state 
        FROM matches
        JOIN teams ON matches.AWAY_team_id = teams.team_id
        WHERE AWAY_coach_id = ?
        ORDER BY last_match_date DESC
        LIMIT 1;`,
        [coach_id, coach_id]);
    const [rows3, fields3] = await accessPool().query(`
        SELECT COUNT(*) AS teams 
        FROM
            (SELECT DISTINCT(name), 
                state 
            FROM matches 
            JOIN teams ON matches.home_team_id = teams.team_id
            WHERE home_coach_id = ?
            UNION
            SELECT DISTINCT(name), 
                state 
            FROM matches
            JOIN teams ON matches.away_team_id = teams.team_id
            WHERE away_coach_id = ?) AS teams;`,
        [coach_id, coach_id]);
    const [rows4, fields4] = await accessPool().query(`
        SELECT COUNT(*) AS matches 
        FROM matches 
        WHERE home_coach_id = ? OR away_coach_id = ?;`, [coach_id, coach_id]);
    const [rows5, fields5] = await accessPool().query(`
        SELECT COUNT(a.team_id) AS most_matches, name AS most_matches_team, state AS most_matches_team_state
        FROM (SELECT match_id, team_id FROM matches 
        JOIN teams ON matches.home_team_id = teams.team_id 
        WHERE home_coach_id = ?
        UNION 
        SELECT match_id, team_id FROM matches 
        JOIN teams ON matches.away_team_id = teams.team_id 
        WHERE away_coach_id = ?) AS a
        JOIN teams ON a.team_id = teams.team_id GROUP BY a.team_id ORDER BY most_matches DESC LIMIT 1;`,
        [coach_id, coach_id]);
    const [rows6, fields6] = await accessPool().query(`
        SELECT ROUND((SUM(CASE WHEN home_coach_id = ? AND home_score > away_score THEN 3
                        WHEN away_coach_id = ? AND home_score < away_score THEN 3
                        WHEN home_score = away_score AND (home_coach_id = ? OR away_coach_id = ?) THEN 1
                        ELSE 0 END)) /
               (SUM(CASE WHEN home_coach_id = ? OR away_coach_id = ? THEN 1
                        ELSE 0 END) * 3) * 100, 1) AS point_percentage 
        FROM matches;`,
        [coach_id, coach_id, coach_id, coach_id, coach_id, coach_id]);
    const [rows7, fields7] = await accessPool().query(`
        SELECT ROUND(SUM(goals) / SUM(matches), 2) AS goals_scored_average FROM (
        SELECT SUM(home_score) AS goals, COUNT(*) AS matches FROM matches WHERE home_coach_id = ?
        UNION
        SELECT SUM(away_score) AS goals, COUNT(*) AS matches FROM matches WHERE away_coach_id = ?) AS m;`,
        [coach_id, coach_id]);
    const [rows8, fields8] = await accessPool().query(`
        SELECT ROUND(SUM(goals) / SUM(matches), 2) AS goals_conceded_average FROM (
        SELECT SUM(away_score) AS goals, COUNT(*) AS matches FROM matches WHERE home_coach_id = ?
        UNION
        SELECT SUM(home_score) AS goals, COUNT(*) AS matches FROM matches WHERE away_coach_id = ?) AS m;`,
        [coach_id, coach_id]);
    const finalRows = Object.assign(rows[0], rows1[0], rows2[0], rows3[0], rows[4], rows5[0], rows6[0], rows7[0], rows8[0]);
    return finalRows;
}

async function h2h(coach_id1, coach_id2) {
    if (coach_id1 === null || coach_id2 === null) {
        return emptyH2hInfo;
    }
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches WHERE coach_id = ?;`,
        [coach_id1]);
    const [rows1, fields1] = await accessPool().query(`
        SELECT * FROM coaches WHERE coach_id = ?;`,
        [coach_id2]);
    if (rows.length === 0 || rows1.length === 0) {
        return emptyH2hInfo;
    }
    const [rows2, fields2] = await accessPool().query(`
    SELECT SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? AND home_score > away_score THEN 1
			        WHEN away_coach_id = ? AND home_coach_id = ? AND away_score > home_score THEN 1 
                    ELSE 0 END) AS coach1_wins,
           SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? AND home_score = away_score THEN 1 
                    WHEN away_coach_id = ? AND home_coach_id = ? AND home_score = away_score THEN 1
                    ELSE 0 END) AS ties,
	       SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? AND home_score > away_score THEN 1
			        WHEN away_coach_id = ? AND home_coach_id = ? AND away_score > home_score THEN 1 
                    ELSE 0 END) AS coach2_wins
    FROM matches;`,
        [coach_id1, coach_id2, coach_id1, coach_id2, coach_id1, coach_id2, coach_id1, coach_id2, coach_id2, coach_id1, coach_id2, coach_id1]);
    console.log(rows2);
    if (rows2.length === 0) {
        console.log(rows2);
        return emptyH2hInfo;
    }
    const [rows3, fields3] = await accessPool().query(`
    SELECT SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_score
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_score 
                    ELSE 0 END) AS coach1_goals,
           SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_score
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_score 
                    ELSE 0 END) AS coach2_goals
    FROM matches;`,
        [coach_id1, coach_id2, coach_id1, coach_id2, coach_id2, coach_id1, coach_id2, coach_id1]);
    const [rows4, fields4] = await accessPool().query(`
    SELECT SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_yellow_cards
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_yellow_cards 
                    ELSE 0 END) AS coach1_yellow_cards,
           SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_yellow_cards
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_yellow_cards 
                    ELSE 0 END) AS coach2_yellow_cards
    FROM matches;`,
        [coach_id1, coach_id2, coach_id1, coach_id2, coach_id2, coach_id1, coach_id2, coach_id1]);
    const [rows5, fields5] = await accessPool().query(`
    SELECT SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_red_cards
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_red_cards
                    ELSE 0 END) AS coach1_red_cards,
           SUM(CASE WHEN home_coach_id = ? AND away_coach_id = ? THEN home_red_cards
	                WHEN away_coach_id = ? AND home_coach_id = ? THEN away_red_cards 
                    ELSE 0 END) AS coach2_red_cards
    FROM matches;`,
        [coach_id1, coach_id2, coach_id1, coach_id2, coach_id2, coach_id1, coach_id2, coach_id1]);
    const finalRows = Object.assign(rows2[0], rows3[0], rows4[0], rows5[0]);
    console.log(finalRows);
    return finalRows;
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    let coach_id1 = url.searchParams.get('coach1');
    let coach_id2 = url.searchParams.get('coach2');
    return {
        coaches: getCoaches(),
        coachInfo1: coachInfo(coach_id1),
        coachInfo2: coachInfo(coach_id2),
        h2h: h2h(coach_id1, coach_id2),
    };
};