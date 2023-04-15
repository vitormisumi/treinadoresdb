import { accessPool } from '$db/db'

async function matchData(match_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT * FROM matches WHERE match_id = ?`,
        [match_id]);
    return rows[0];
}

async function competition(match_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT match_id, name FROM matches
        JOIN competitions ON matches.competition_id = competitions.competition_id
        WHERE match_id = ?;`,
        [match_id]);
    return rows[0];
}

async function teams(match_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT m.match_id, ht.name AS home_team_name, ht.state AS home_team_state, at.name AS away_team_name, at.state AS away_team_state
        FROM matches AS m
        JOIN teams AS ht ON m.home_team_id = ht.team_id
        JOIN teams AS at ON m.away_team_id = at.team_id
        WHERE match_id = ?;`,
        [match_id]);
    return rows[0];
}

async function coaches(match_id) {
    const [rows, fields] = await accessPool().query(`
        SELECT m.match_id, hc.coach_id AS home_coach_id, hc.name AS home_coach, hc.nickname AS home_coach_nickname, ac.coach_id AS away_coach_id, ac.name AS away_coach, ac.nickname AS away_coach_nickname
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