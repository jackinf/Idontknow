import {applyMiddleware, compose, createStore, GenericStoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const __DEV__ = true; // TODO: get development mode from environments

export default function configureStore(initialState = {}) { // TODO: use typedef

    // ======================================================
    // Store Enhancers
    // ======================================================
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    const enhancers = [];
    if (__DEV__) {
        const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    // ======================================================
    // Store Instantiation
    // ======================================================
    const store = createStore(
        createReducer({ b: () => 2 }),
        initialState,
        compose(
            applyMiddleware(thunk),
            ...enhancers
        ));
    // store.asyncReducers = {};
    return store;
}

export function injectAsyncReducer(store: any, name: string, asyncReducer: any) { // TODO: Fix anys
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}