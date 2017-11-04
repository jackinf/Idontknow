import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import createReducer from './reducers';

const __DEV__ = true; // TODO: get development mode from environments

export default function configureStore(initialState = {}) {

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    if (__DEV__) {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    // ======================================================
    // Store Instantiation
    // ======================================================
    const store = createStore(
        createReducer(),
        initialState,
        compose(
            applyMiddleware(thunk)
        ));
    store.asyncReducers = {};
    return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}