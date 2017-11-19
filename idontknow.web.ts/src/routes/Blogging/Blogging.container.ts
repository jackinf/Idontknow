import {connect} from 'react-redux';
import Component from './Blogging.component';
import {REDUCER_KEY__BLOGGING} from './index';
import {BloggingReducerState} from './Blogging.models';

const mapDispatchToProps = {

};

const mapStateToProps = (state: {[reducerKey: string]: BloggingReducerState}) => {
    const currentReducer: BloggingReducerState = state[REDUCER_KEY__BLOGGING];
    return {
        dataSource: currentReducer.dataSource,
        count: currentReducer.count
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);