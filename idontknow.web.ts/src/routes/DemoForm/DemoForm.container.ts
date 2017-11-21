import {connect} from 'react-redux';
import DemoFormComponent from './DemoForm.component';

const mapDispatchToProps = {
    onIncrement: () => (dispatch: any) => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => (dispatch: any) => dispatch({ type: 'DECREMENT' }),
};

const mapStateToProps = (state: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DemoFormComponent)
