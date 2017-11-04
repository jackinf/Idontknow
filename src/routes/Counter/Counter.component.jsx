import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class Counter extends Component {
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

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
};

export default Counter