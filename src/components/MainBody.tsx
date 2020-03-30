import React, { useState, useEffect } from 'react';
import nba, { IPlayerInfo } from '../nba-client';
import DataViewContainer from './DataViewContainer';
import Profile from './Profile';
import SearchBar from './SearchBar';

const MainBody: React.FC = () => {
    //set playerInfo state hooks
    const [playerInfo, setPlayerInfo] = useState<IPlayerInfo>({
        playerName: 'Stephen Curry',
        playerId: 201939,
        teamAbbreviation: 'GSW'
    });

    useEffect(() => {
        const fetchData = () => {
            nba.stats
                .playerInfo({
                    PlayerID: nba.findPlayer(playerInfo.playerName).playerId
                })
                .then((info: any) => {
                    const newPlayerInfo: IPlayerInfo = Object.assign(
                        info.commonPlayerInfo[0],
                        info.playerHeadlineStats[0]
                    );
                    setPlayerInfo(newPlayerInfo);
                })
                .catch((err: any) => console.log(err));
        };
        fetchData();
    }, [playerInfo.playerName]);

    const handleSelectPlayer = (name: string) => {
        setPlayerInfo({ ...playerInfo, playerName: name });
    };

    return (
        <div className="main">
            <SearchBar handleSelectPlayer={handleSelectPlayer} />
            <div className="player">
                <Profile playerInfo={playerInfo} />
                <DataViewContainer playerId={playerInfo.playerId!} />
            </div>
        </div>
    );
};

export default MainBody;
