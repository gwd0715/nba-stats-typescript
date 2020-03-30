import React, { useState } from 'react';
import nba from '../nba-client';
import { AutoComplete, Input } from 'antd';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import { SelectProps } from 'antd/es/select';

type Props = {
    handleSelectPlayer: (name: string) => void;
};

type TPlayer = {
    fullName: string;
    playerId: number;
};

const SearchBar: React.FC<Props> = (props: Props) => {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    const handleSearch = (name: string) => {
        setOptions(
            !name
                ? []
                : nba.searchPlayers(name).map((player: TPlayer) => ({
                      value: player.fullName,
                      label: (
                          <div key={player.fullName} className="player-option">
                              <img
                                  alt="playerPic"
                                  src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
                                  className="player-option-image"
                              />
                              <span className="player-option-label">
                                  {player.fullName}
                              </span>
                          </div>
                      )
                  }))
        );
    };

    const onSelect = (name: string) => {
        props.handleSelectPlayer(name);
    };

    return (
        <AutoComplete
            className="search-bar"
            onSelect={onSelect}
            onSearch={handleSearch}
            options={options}>
            <Input.Search placeholder="Search NBA Player" size="large" />
        </AutoComplete>
    );
};

export default SearchBar;
