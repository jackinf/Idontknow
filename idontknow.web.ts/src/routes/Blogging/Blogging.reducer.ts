import {Action} from 'redux';
import {isType} from 'typescript-fsa';
import {BloggingReducerState} from "./Blogging.models";
import {asyncActions as fetchAsyncActions} from './actions/Blogging.fetch.action';
import {asyncActions as createSubmitActions} from './actions/Create/Blogging.create.submit.action';
import {asyncActions as editStartActions} from './actions/Edit/Blogging.edit.start.action';
import {asyncActions as editSubmitActions} from './actions/Edit/Blogging.edit.submit.action';
import {asyncActions as deleteSubmitActions} from './actions/Delete/Blogging.delete.submit.action';
import {
    createCancel,
    createStart,
    editCancel,
    deleteCancel,
    deleteStart,
} from "./actions";

const defaultState: BloggingReducerState = {
    data: [],
    loading: false,
    confirmLoading: false,
    pagination: { total: 0, current: 0, pageSize: 25 },
    createInProgress: false,
    editInProgress: false,
    deleteInProgress: false
};
export default (state: BloggingReducerState = defaultState, action: Action) => {

    if (isType(action, fetchAsyncActions.started)) {
        return {type: action.type, loading: action.payload.loading};
    }
    if (isType(action, fetchAsyncActions.done)) {
        return {type: action.type, loading: action.payload.params.loading, data: action.payload.result};
    }
    if (isType(action, fetchAsyncActions.failed)) {
        return {type: action.type, loading: action.payload.params.loading, error: action.payload.error};
    }

    // Create actions
    if (isType(action, createCancel)) {
        return {type: action.type, createInProgress: false}
    }
    if (isType(action, createStart)) {
        return {type: action.type, createInProgress: true}
    }
    if (isType(action, createSubmitActions.started)) {
        return {type: action.type}
    }
    if (isType(action, createSubmitActions.done)) {
        return {type: action.type, createInProgress: false}
    }
    if (isType(action, createSubmitActions.failed)) {
        return {type: action.type}
    }

    // Edit actions
    if (isType(action, editCancel)) {
        return {type: action.type, editInProgress: false}
    }
    if (isType(action, editStartActions.started)) {
        return {type: action.type}
    }
    if (isType(action, editStartActions.done)) {
        return {type: action.type, editInProgress: true, editId: action.payload.result.id}
    }
    if (isType(action, editStartActions.failed)) {
        return {type: action.type}
    }
    if (isType(action, editSubmitActions.started)) {
        return {type: action.type}
    }
    if (isType(action, editSubmitActions.done)) {
        return {type: action.type, editInProgress: false}
    }
    if (isType(action, editSubmitActions.failed)) {
        return {type: action.type}
    }

    // Delete actions
    if (isType(action, deleteCancel)) {
        return {type: action.type, deleteInProgress: false}
    }
    if (isType(action, deleteStart)) {
        return {type: action.type, deleteInProgress: true}
    }
    if (isType(action, deleteSubmitActions.started)) {
        return {type: action.type}
    }
    if (isType(action, deleteSubmitActions.done)) {
        return {type: action.type, deleteInProgress: false}
    }
    if (isType(action, deleteSubmitActions.failed)) {
        return {type: action.type}
    }

    return state;
}