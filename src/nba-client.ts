import nba from 'nba';

const SERVER_URL = 'https://34.67.117.84';

export interface IPlayerInfo {
    teamAbbreviation?: string;
    teamCity?: string;
    teamName?: string;
    playerName: string;
    height?: number;
    weight?: number;
    playerId?: number;
    pts?: number;
    reb?: number;
    ast?: number;
    pie?: number;
}

type TPlayerID = {
    PlayerID: number;
};

export default {
    ...nba,
    stats: {
        ...nba.stats,
        playerInfo: async ({ PlayerID }: TPlayerID) => {
            const res = await fetch(`${SERVER_URL}/players/${PlayerID}`);
            return res.json();
        },
        shots: async ({ PlayerID }: TPlayerID) => {
            const res = await fetch(`${SERVER_URL}/players/${PlayerID}/shots`);
            return res.json();
        }
    }
};
