import React, { useState } from 'react';
import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider';
import _ from 'lodash';
import { Row, Col, Radio, Switch } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';

type Props = {
    playerId: number;
};

enum EShowType {
    HEX = 'hexbin',
    SCT = 'scatter'
}
const DataViewContainer: React.FC<Props> = (props: Props) => {
    const [minCount, setMinCount] = useState(2);
    const [toolTips, setToolTips] = useState(true);
    const [showType, setShowType] = useState(EShowType.HEX);

    const handleSliderChange = (value: number) => {
        setMinCount(value);
    };

    const handleTypeChange = (e: RadioChangeEvent) => {
        setShowType(e.target.value);
    };

    const handleTipChange = (tipState: boolean) => {
        setToolTips(tipState);
    };
    return (
        <div className="data-view">
            <ShotChart
                playerId={props.playerId}
                minCount={minCount}
                toolTips={toolTips}
                showType={showType}
            />
            <div className="filters">
                {showType === EShowType.HEX ? (
                    <CounterSlider
                        onSliderChange={_.debounce(handleSliderChange, 500)}
                    />
                ) : (
                    <div className="fill-empty-space" />
                )}
                <br />
                <Row className="slider-row">
                    <Col span={9}>
                        <Radio.Group
                            value={showType}
                            onChange={handleTypeChange}>
                            <Radio value={EShowType.HEX}>Hexbin</Radio>
                            <Radio value={EShowType.SCT}>Scatter</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Switch
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            onChange={handleTipChange}
                            defaultChecked
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DataViewContainer;
