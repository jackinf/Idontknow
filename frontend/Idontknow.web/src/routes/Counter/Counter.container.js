import {connect} from 'react-redux';
import CounterComponent from './Counter.component';

const mapDispatchToProps = {
    onIncrement: () => dispatch => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch => dispatch({ type: 'DECREMENT' }),
};

const mapStateToProps = (state) => ({
    value: state['counter']
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
