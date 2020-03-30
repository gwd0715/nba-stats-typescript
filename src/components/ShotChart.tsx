import React, { useEffect } from 'react';
import nba from '../nba-client';
import * as d3 from 'd3';
import { court, shots } from 'd3-shotchart';
import { hexbin } from 'd3-hexbin';

type Props = {
    playerId: number;
    minCount: number;
    toolTips: boolean;
    showType: string;
};

window.d3_hexbin = { hexbin: hexbin };

const ShotChart: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        const fetchShots = async () => {
            try {
                const { shot_Chart_Detail } = await nba.stats.shots({
                    PlayerID: props.playerId
                });
                if (shot_Chart_Detail) {
                    const final_shots = shot_Chart_Detail.map((shot: any) => ({
                        x: (shot.locX + 250) / 10,
                        y: (shot.locY + 50) / 10,
                        action_type: shot.actionType,
                        shot_distance: shot.shotDistance,
                        shot_made_flag: shot.shotMadeFlag
                    }));
                    const courtSelection = d3.select('#shot-chart');
                    courtSelection.html('');
                    const chart_court = court().width(500);
                    const chart_shots = shots()
                        .shotRenderThreshold(props.minCount)
                        .displayToolTips(props.toolTips)
                        .displayType(props.showType);
                    courtSelection.call(chart_court);
                    courtSelection.datum(final_shots).call(chart_shots);
                } else {
                    console.log('Invalid value');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchShots();
    }, [props.playerId, props.minCount, props.toolTips, props.showType]);
    return <div id="shot-chart"></div>;
};

export default ShotChart;
