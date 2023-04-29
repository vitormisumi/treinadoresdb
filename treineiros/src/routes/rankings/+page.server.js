import { accessPool } from '$db/db';

async function mostRecentYear() {
    const [rows, fields] = await accessPool().query(
        `SELECT year FROM competitions ORDER BY year DESC LIMIT 1;`);
    return rows[0].year;
}

async function mostMatches(competitions, periodStart, periodEnd) {
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            (home.home_matches + away.away_matches) AS value 
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
            ORDER BY value DESC
            LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd]);
    return rows;
}

async function mostGoalsScored(value, competitions, periodStart, periodEnd, minMatches) {
    if (value === 'total') {
        const [rows, fields] = await accessPool().query(`
            SELECT home.home_coach_id AS id, 
                home.name, 
                home.nickname, 
                (home.home_goals + away.away_goals) AS value
                FROM (SELECT COUNT(m.match_id) AS matches, 
                        m.home_coach_id, 
                        hc.name,
                        hc.nickname,
                        SUM(m.home_score) AS home_goals 
                    FROM matches AS m
                    JOIN coaches AS hc
                    ON m.home_coach_id = hc.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
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
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY away_coach_id) AS away
                ON home.home_coach_id = away.away_coach_id
                WHERE home.matches + away.matches >= ?
                ORDER BY value DESC
                LIMIT 10;`,
        [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
        return rows;
    }
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.home_goals + away.away_goals) / (home.matches + away.matches), 2) AS value
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
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
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
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= ?
        ORDER BY value DESC
        LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
    return rows;

}

async function mostGoalsConceded(value, competitions, periodStart, periodEnd, minMatches) {
    if (value === 'total') {
        const [rows, fields] = await accessPool().query(`
            SELECT home.home_coach_id AS id, 
                home.name, 
                home.nickname, 
                (home.away_goals + away.home_goals) AS value
                FROM (SELECT COUNT(m.match_id) AS matches, 
                        m.home_coach_id, 
                        hc.name,
                        hc.nickname,
                        SUM(m.away_score) AS away_goals 
                    FROM matches AS m
                    JOIN coaches AS hc
                    ON m.home_coach_id = hc.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
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
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY away_coach_id) AS away
                ON home.home_coach_id = away.away_coach_id
                WHERE home.matches + away.matches >= ?
                ORDER BY value
                LIMIT 10;`,
        [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
        return rows;
    }
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.away_goals + away.home_goals) / (home.matches + away.matches), 2) AS value
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
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
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
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= ?
        ORDER BY value
        LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
    return rows;
}

async function bestPointPercentage(competitions, periodStart, periodEnd, minMatches) {
    const [rows, fields] = await accessPool().query(`
    SELECT home.coach_id AS id, 
    home.name, 
    home.nickname, 
    ROUND((home.points + away.points) / ((home.matches + away.matches) * 3) * 100, 1) AS value
    FROM
    (SELECT hc.coach_id, 
        hc.name, 
        hc.nickname, 
        SUM(CASE WHEN m.home_score > m.away_score THEN 3
            WHEN m.home_score = m.away_score THEN 1
                            ELSE 0 END) AS points,
                            COUNT(m.match_id) AS matches
                            FROM matches AS m
            JOIN coaches AS hc
            ON m.home_coach_id = hc.coach_id
            JOIN competitions AS c
            USING (competition_id)
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY coach_id) AS home
        JOIN
        (SELECT ac.coach_id, 
                    ac.name, 
                    ac.nickname,
                    SUM(CASE WHEN m.home_score < m.away_score THEN 3
                            WHEN m.home_score = m.away_score THEN 1
                            ELSE 0 END) AS points,
                            COUNT(m.match_id) AS matches
            FROM matches AS m
            JOIN coaches AS ac
            ON m.away_coach_id = ac.coach_id
            JOIN competitions AS c
            USING (competition_id)
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY coach_id) AS away
            ON home.coach_id = away.coach_id
            WHERE home.matches + away.matches >= ?
            ORDER BY value DESC
            LIMIT 10;`,
            [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
            return rows;
}

async function mostYellowCards(value, competitions, periodStart, periodEnd, minMatches) {
    if (value === 'total') {
        const [rows, fields] = await accessPool().query(`
            SELECT home.home_coach_id AS id, 
                home.name, 
                home.nickname, 
                (home.yellow_cards + away.yellow_cards) AS value
                FROM (SELECT COUNT(m.match_id) AS matches, 
                        m.home_coach_id, 
                        hc.name,
                        hc.nickname,
                        SUM(m.home_yellow_cards) AS yellow_cards 
                    FROM matches AS m
                    JOIN coaches AS hc
                    ON m.home_coach_id = hc.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY home_coach_id) AS home
                JOIN
                    (SELECT COUNT(m.match_id) AS matches, 
                        m.away_coach_id,
                        SUM(m.away_yellow_cards) AS yellow_cards 
                    FROM matches AS m
                    JOIN coaches AS ac
                    ON m.away_coach_id = ac.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY away_coach_id) AS away
                ON home.home_coach_id = away.away_coach_id
                WHERE home.matches + away.matches >= ?
                ORDER BY value
                LIMIT 10;`,
        [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
        return rows;
    }
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.yellow_cards + away.yellow_cards) / (home.matches + away.matches), 2) AS value
        FROM 
            (SELECT COUNT(m.match_id) AS matches, 
                m.home_coach_id, 
                hc.name,
                hc.nickname,
                SUM(m.home_yellow_cards) AS yellow_cards 
            FROM matches AS m
            JOIN coaches AS hc
            ON m.home_coach_id = hc.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY home_coach_id) AS home
        JOIN
            (SELECT COUNT(m.match_id) AS matches, 
                m.away_coach_id,
                SUM(m.away_yellow_cards) AS yellow_cards 
            FROM matches AS m
            JOIN coaches AS ac
            ON m.away_coach_id = ac.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= ?
        ORDER BY value
        LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
    return rows;
}

async function mostRedCards(value, competitions, periodStart, periodEnd, minMatches) {
    if (value === 'total') {
        const [rows, fields] = await accessPool().query(`
            SELECT home.home_coach_id AS id, 
                home.name, 
                home.nickname, 
                (home.red_cards + away.red_cards) AS value
                FROM (SELECT COUNT(m.match_id) AS matches, 
                        m.home_coach_id, 
                        hc.name,
                        hc.nickname,
                        SUM(m.home_red_cards) AS red_cards 
                    FROM matches AS m
                    JOIN coaches AS hc
                    ON m.home_coach_id = hc.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY home_coach_id) AS home
                JOIN
                    (SELECT COUNT(m.match_id) AS matches, 
                        m.away_coach_id,
                        SUM(m.away_red_cards) AS red_cards 
                    FROM matches AS m
                    JOIN coaches AS ac
                    ON m.away_coach_id = ac.coach_id
                    JOIN competitions AS c
                    ON m.competition_id = c.competition_id
                    WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
                    GROUP BY away_coach_id) AS away
                ON home.home_coach_id = away.away_coach_id
                WHERE home.matches + away.matches >= ?
                ORDER BY value
                LIMIT 10;`,
        [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
        return rows;
    }
    const [rows, fields] = await accessPool().query(`
        SELECT home.home_coach_id AS id, 
            home.name, 
            home.nickname, 
            ROUND((home.red_cards + away.red_cards) / (home.matches + away.matches), 2) AS value
        FROM 
            (SELECT COUNT(m.match_id) AS matches, 
                m.home_coach_id, 
                hc.name,
                hc.nickname,
                SUM(m.home_red_cards) AS red_cards 
            FROM matches AS m
            JOIN coaches AS hc
            ON m.home_coach_id = hc.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY home_coach_id) AS home
        JOIN
            (SELECT COUNT(m.match_id) AS matches, 
                m.away_coach_id,
                SUM(m.away_red_cards) AS red_cards 
            FROM matches AS m
            JOIN coaches AS ac
            ON m.away_coach_id = ac.coach_id
            JOIN competitions AS c
            ON m.competition_id = c.competition_id
            WHERE c.name IN (?) AND c.year BETWEEN ? AND ?
            GROUP BY away_coach_id) AS away
        ON home.home_coach_id = away.away_coach_id
        WHERE home.matches + away.matches >= ?
        ORDER BY value
        LIMIT 10;`,
    [competitions, periodStart, periodEnd, competitions, periodStart, periodEnd, minMatches]);
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

    let minMatches = url.searchParams.get('minmatches').split(',');

    let value = url.searchParams.get('value');

    return {
        mostRecentYear: mostRecentYear(),
        mostMatches: mostMatches(competitionQuery, period[0], period[1]),
        mostGoalsScored: mostGoalsScored(value, competitionQuery, period[0], period[1], minMatches),
        mostGoalsConceded: mostGoalsConceded(value, competitionQuery, period[0], period[1], minMatches),
        mostYellowCards: mostYellowCards(value, competitionQuery, period[0], period[1], minMatches),
        mostRedCards: mostRedCards(value, competitionQuery, period[0], period[1], minMatches),
        bestPointPercentage: bestPointPercentage(competitionQuery, period[0], period[1], minMatches),
    };
};
