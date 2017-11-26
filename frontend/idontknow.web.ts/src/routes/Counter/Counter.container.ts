import { connect } from 'react-redux';
import CounterComponent from './Counter.component';

const mapDispatchToProps = {
    onIncrement: () => (dispatch: any) => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => (dispatch: any) => dispatch({ type: 'DECREMENT' }),
};

const mapStateToProps = (state: any) => ({
    value: state.counter
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent)
