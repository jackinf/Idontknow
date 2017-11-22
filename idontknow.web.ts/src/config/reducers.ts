import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {sessionReducer as sessionReducer} from "redux-react-session";

export default function createReducer(asyncReducers: Reducer<any>) {
    return combineReducers({
        form: formReducer,
        sessionReducer,
        ...asyncReducers
    });
}