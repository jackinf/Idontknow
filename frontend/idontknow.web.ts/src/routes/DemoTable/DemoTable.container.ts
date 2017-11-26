import { connect } from 'react-redux';
import Component from './DemoTable.component';
import { REDUCER_KEY__DEMO_TABLE } from './index';
import { DemoTableReducerState } from './DemoTable.models';

const mapDispatchToProps = {};

const mapStateToProps = (state: {[reducerKey: string]: DemoTableReducerState}) => {
    const currentReducer: DemoTableReducerState = state[REDUCER_KEY__DEMO_TABLE];
    return {
        count: currentReducer.count
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);