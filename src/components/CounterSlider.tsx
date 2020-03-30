import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

type Props = {
    onSliderChange: (value: number) => void;
};

const CounterSlider: React.FC<Props> = (props: Props) => {
    const [inputValue, setInputValue] = useState(2);
    const onChange = (value: number | undefined | [number, number]) => {
        if (typeof value === 'number') {
            setInputValue(value);
            props.onSliderChange(value);
        }
    };
    return (
        <Row className="slider-row">
            <Col span={12}>
                <Slider
                    min={1}
                    max={20}
                    onChange={onChange}
                    value={inputValue}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={1}
                    max={20}
                    style={{ marginLeft: 16 }}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

export default CounterSlider;
