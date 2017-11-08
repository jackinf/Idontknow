import React, { Component } from 'react'
import { Button } from 'antd'

interface CounterProps {
    value: string;
    onIncrement: any;
    onDecrement: any;
}

class Counter extends Component<CounterProps> {
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
        )
    }
}

// Counter.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncrement: PropTypes.func.isRequired,
//     onDecrement: PropTypes.func.isRequired
// };

export default Counter