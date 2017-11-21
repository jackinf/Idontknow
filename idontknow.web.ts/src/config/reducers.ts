import {combineReducers, Reducer} from 'redux';
import {reducer as formReducer} from "redux-form";

export default function createReducer(asyncReducers: Reducer<any>) {
    return combineReducers({
        form: formReducer,
        ...asyncReducers
    });
}