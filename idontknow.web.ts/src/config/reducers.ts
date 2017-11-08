import { combineReducers } from 'redux';

export default function createReducer(asyncReducers: any) { // TODO: fix any
    return combineReducers({
        ...asyncReducers
    });
}