import * as React from 'react';
import { Button } from 'antd';

interface CounterProps {
    value: string;
    onIncrement: any;
    onDecrement: any;
}

class Counter extends React.Component<CounterProps> {
    render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                Clicked: {value} times
                {' '}
                <Button type="primary" onClick={onIncrement}>+</Button>
                {' '}
                <Button type="primary" onClick={onDecrement}>-</Button>
                {' '}
            </p>
        );
    }
}

export default Counter;