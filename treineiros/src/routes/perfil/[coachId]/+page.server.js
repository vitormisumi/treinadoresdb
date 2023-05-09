import { accessPool } from '$db/db'

async function getCoaches() {
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches ORDER BY nickname, name;`);
    return rows;
};

async function getCoach(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM coaches WHERE coach_id = ?`,
        [coach_id]);
    return rows[0];
}

async function lastClub(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT date_time, name, state FROM matches
        JOIN teams ON matches.home_team_id = teams.team_id
        WHERE home_coach_id = ? ORDER BY date_time DESC LIMIT 1;`,
        [coach_id]);
    const [rows2, fields2] = await accessPool().query(`
        SELECT date_time, name, state FROM matches
        JOIN teams ON matches.away_team_id = teams.team_id
        WHERE away_coach_id = ? ORDER BY date_time DESC LIMIT 1;`,
        [coach_id]);
        if (rows.length === 0) {
            return rows2[0].name + '/' + rows2[0].state;
        } else if (rows2.length === 0) {
            return rows[0].name + '/' + rows[0].state;
        } else if (rows2[0].date_time > rows[0].date_time) {
            return rows2[0].name + '/' + rows2[0].state;
        } else {
            return rows[0].name + '/' + rows[0].state;
        }
    }
    
async function lastMatch(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT date_time FROM matches
        WHERE home_coach_id = ? OR away_coach_id = ?
        ORDER BY date_time DESC LIMIT 1;`,
        [coach_id, coach_id]);
    return rows[0].date_time;
}

async function numberOfClubs(coach_id) {
    const [rows, fields] = await accessPool().query(`SELECT DISTINCT(name), state FROM matches 
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
    const [rows, fields] = await accessPool().query(`
        SELECT COUNT(*) FROM matches 
        WHERE home_coach_id = ? OR away_coach_id = ?;`, [coach_id, coach_id]);
    return Object.values(rows[0]);
}

async function mostMatches(coach_id) {
    const [rows, fields] = await accessPool().query(`
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

async function pointPercentage(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT ROUND((SUM(CASE WHEN home_coach_id = ? AND home_score > away_score THEN 3
                        WHEN away_coach_id = ? AND home_score < away_score THEN 3
                        WHEN home_score = away_score AND (home_coach_id = ? OR away_coach_id = ?) THEN 1
                        ELSE 0 END)) /
               (SUM(CASE WHEN home_coach_id = ? OR away_coach_id = ? THEN 1
                        ELSE 0 END) * 3) * 100, 1) AS point_percentage 
        FROM matches;`,
        [coach_id, coach_id, coach_id, coach_id, coach_id, coach_id]);
    return rows[0].point_percentage;
}

async function goalsScoredAvg(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT ROUND(SUM(goals) / SUM(matches), 2) AS goal_average FROM (
        SELECT SUM(home_score) AS goals, COUNT(*) AS matches FROM matches WHERE home_coach_id = ?
        UNION
        SELECT SUM(away_score) AS goals, COUNT(*) AS matches FROM matches WHERE away_coach_id = ?) AS m;`,
        [coach_id, coach_id]);
    return rows[0].goal_average;
}

async function goalsConcededAvg(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT ROUND(SUM(goals) / SUM(matches), 2) AS goal_average FROM (
        SELECT SUM(away_score) AS goals, COUNT(*) AS matches FROM matches WHERE home_coach_id = ?
        UNION
        SELECT SUM(home_score) AS goals, COUNT(*) AS matches FROM matches WHERE away_coach_id = ?) AS m;`,
        [coach_id, coach_id]);
    return rows[0].goal_average;
}

async function matches(coach_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT m.match_id, m.date_time, m.stadium, c.name AS competition, ht.name AS home_team, ht.state AS home_team_state, home_score, away_score, at.name AS away_team, at.state AS away_team_state,
        CASE WHEN home_coach_id = ? THEN 'Mandante'
        ELSE 'Visitante'
        END AS coach
        FROM matches AS m
        JOIN competitions AS c ON m.competition_id = c.competition_id
        JOIN teams AS ht ON m.home_team_id = ht.team_id
        JOIN teams AS at ON m.away_team_id = at.team_id
        WHERE home_coach_id = ? OR away_coach_id = ? ORDER BY date_time DESC;`,
        [coach_id, coach_id, coach_id]);
    return rows;
}

async function history(coach_id, groups) {
    const [rows, fields] = await accessPool().query(`
        SELECT ??,
            COUNT(*) AS matches, 
            SUM(wins) AS wins,
            SUM(draws) AS draws,
            SUM(losses) AS losses,
            SUM(goals_scored) AS goals_scored,
            SUM(goals_conceded) AS goals_conceded,
            SUM(yellow_cards) AS yellow_cards,
            SUM(red_cards) AS red_cards,
            (SUM(points) / (COUNT(*) * 3)) * 100 AS average
        FROM
            (SELECT c.name AS competition, 
                c.year AS year,
                IF(home_coach_id = ?, CONCAT(ht.name, '/', ht.state), CONCAT(at.name, '/', at.state)) AS team,
                IF(home_coach_id = ? AND m.home_score > m.away_score OR away_coach_id = ? AND m.home_score < m.away_score, 1, 0) AS wins,
                IF(m.home_score = m.away_score, 1, 0) AS draws,
                IF(home_coach_id = ? AND m.home_score < m.away_score OR away_coach_id = ? AND m.home_score > m.away_score, 1, 0) AS losses,
                IF(home_coach_id = ?, m.home_score, m.away_score) AS goals_scored,
                IF(home_coach_id = ?, m.away_score, m.home_score) AS goals_conceded,
                IF(home_coach_id = ?, m.home_yellow_cards, m.away_yellow_cards) AS yellow_cards,
                IF(home_coach_id = ?, m.home_red_cards, m.away_red_cards) AS red_cards,
                (CASE 
                    WHEN home_coach_id = ? AND m.home_score > m.away_score OR away_coach_id = ? AND m.home_score < m.away_score THEN 3
                    WHEN m.home_score = m.away_score THEN 1
                    ELSE 0
                    END) AS points
            FROM matches AS m
            JOIN teams AS ht ON m.home_team_id = ht.team_id
            JOIN teams AS at ON m.away_team_id = at.team_id
            JOIN competitions AS c ON m.competition_id = c.competition_id
            WHERE home_coach_id = ? OR away_coach_id = ?) AS coach
        GROUP BY ??
        ORDER BY coach.year DESC;`,
        [groups, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, groups]);
    return rows;
}

async function totalHistory(coach_id) {
    const [rows, fields] = await accessPool().query(
        `SELECT 
            COUNT(*) AS matches, 
            SUM(wins) AS wins,
            SUM(draws) AS draws,
            SUM(losses) AS losses,
            SUM(goals_scored) AS goals_scored,
            SUM(goals_conceded) AS goals_conceded,
            SUM(yellow_cards) AS yellow_cards,
            SUM(red_cards) AS red_cards,
            (SUM(points) / (COUNT(*) * 3)) * 100 AS average
        FROM
            (SELECT c.name AS competition, 
                c.year AS year,
                IF(home_coach_id = ?, CONCAT(ht.name, '/', ht.state), CONCAT(at.name, '/', at.state)) AS team,
                IF(home_coach_id = ? AND m.home_score > m.away_score OR away_coach_id = ? AND m.home_score < m.away_score, 1, 0) AS wins,
                IF(m.home_score = m.away_score, 1, 0) AS draws,
                IF(home_coach_id = ? AND m.home_score < m.away_score OR away_coach_id = ? AND m.home_score > m.away_score, 1, 0) AS losses,
                IF(home_coach_id = ?, m.home_score, m.away_score) AS goals_scored,
                IF(home_coach_id = ?, m.away_score, m.home_score) AS goals_conceded,
                IF(home_coach_id = ?, m.home_yellow_cards, m.away_yellow_cards) AS yellow_cards,
                IF(home_coach_id = ?, m.home_red_cards, m.away_red_cards) AS red_cards,
                (CASE 
                    WHEN home_coach_id = ? AND m.home_score > m.away_score OR away_coach_id = ? AND m.home_score < m.away_score THEN 3
                    WHEN m.home_score = m.away_score THEN 1
                    ELSE 0
                    END) AS points
            FROM matches AS m
            JOIN teams AS ht ON m.home_team_id = ht.team_id
            JOIN teams AS at ON m.away_team_id = at.team_id
            JOIN competitions AS c ON m.competition_id = c.competition_id
            WHERE home_coach_id = ? OR away_coach_id = ?) AS coach;`,
        [coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id, coach_id]);
    return rows[0];
}

async function goalsScoredDistribution() {
    const [rows, fields] = await accessPool().query(
        `SELECT FLOOR(goals.goals_scored_average/0.1)*0.1 AS bins, COUNT(*) AS count
    FROM (
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.home_goals + away.away_goals) / (home.matches + away.matches), 2) AS goals_scored_average
        FROM 
            (SELECT COUNT(m.match_id) AS matches, 
                m.home_coach_id, 
                hc.name,
                hc.nickname,
                SUM(m.home_score) AS home_goals 
            FROM matches AS m
            JOIN coaches AS hc
            ON m.home_coach_id = hc.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            GROUP BY home_coach_id) AS home
        JOIN
            (SELECT COUNT(m.match_id) AS matches, 
                m.away_coach_id,
                SUM(m.away_score) AS away_goals 
            FROM matches AS m
            JOIN coaches AS ac
            ON m.away_coach_id = ac.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= 50) AS goals
    GROUP BY 1 
    ORDER BY 1;
    `);
    return rows;
}

async function goalsConcededDistribution() {
    const [rows, fields] = await accessPool().query(
        `SELECT FLOOR(goals.goals_conceded_average/0.1)*0.1 AS bins, COUNT(*) AS count
    FROM (
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.away_goals + away.home_goals) / (home.matches + away.matches), 2) AS goals_conceded_average
        FROM 
            (SELECT COUNT(m.match_id) AS matches, 
                m.home_coach_id, 
                hc.name,
                hc.nickname,
                SUM(m.away_score) AS away_goals 
            FROM matches AS m
            JOIN coaches AS hc
            ON m.home_coach_id = hc.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            GROUP BY home_coach_id) AS home
        JOIN
            (SELECT COUNT(m.match_id) AS matches, 
                m.away_coach_id,
                SUM(m.home_score) AS home_goals 
            FROM matches AS m
            JOIN coaches AS ac
            ON m.away_coach_id = ac.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= 50) AS goals
    GROUP BY 1 
    ORDER BY 1;
    `);
    return rows;
}

export async function load({ params, url }) {
    let groupsParams = url.searchParams.get('groups');
    let groups;
    if (groupsParams === null || groupsParams === '') {
        groups = ['coach.year']
    } else {
        groups = groupsParams.split(',');
        groups.splice(0, 0, 'coach.year');
    }

    return {
        coach: getCoach(params.coachId),
        coaches: getCoaches(),
        lastClub: lastClub(params.coachId),
        lastMatch: lastMatch(params.coachId),
        numberOfClubs: numberOfClubs(params.coachId),
        numberOfMatches: numberOfMatches(params.coachId),
        mostMatches: mostMatches(params.coachId),
        pointPercentage: pointPercentage(params.coachId),
        goalsScoredAvg: goalsScoredAvg(params.coachId),
        goalsConcededAvg: goalsConcededAvg(params.coachId),
        matches: matches(params.coachId),
        history: history(params.coachId, groups),
        totalHistory: totalHistory(params.coachId),
        goalsScoredDistribution: goalsScoredDistribution(),
        goalsConcededDistribution: goalsConcededDistribution(),
    };
};
