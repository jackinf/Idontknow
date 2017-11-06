import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    return combineReducers({
        a: () => 1, // at least one reducer must exist
        ...asyncReducers
    });
}