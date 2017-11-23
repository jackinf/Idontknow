import {connect} from 'react-redux';
import Component from './Blogging.component';
import {REDUCER_KEY__BLOGGING} from './index';
import {BloggingReducerState} from './Blogging.models';
import {
    fetchAsync,
    createCancel,
    createStart,
    createSubmit,
    editCancel,
    editStart,
    editSubmit,
    deleteCancel,
    deleteStart,
    deleteSubmit
} from './actions';

const mapDispatchToProps = {
    fetchAsync,
    createCancel,
    createStart,
    createSubmit,
    editCancel,
    editStart,
    editSubmit,
    deleteCancel,
    deleteStart,
    deleteSubmit
};

const mapStateToProps = (state: {[reducerKey: string]: BloggingReducerState}) => {
    const currentReducer: BloggingReducerState = state[REDUCER_KEY__BLOGGING];
    return {
        data: currentReducer.data,
        loading: currentReducer.loading,
        confirmLoading: currentReducer.confirmLoading,
        pagination: currentReducer.pagination,
        createInProgress: currentReducer.createInProgress,
        editInProgress: currentReducer.editInProgress,
        deleteInProgress: currentReducer.deleteInProgress
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);