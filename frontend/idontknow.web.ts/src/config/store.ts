import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const __DEV__ = true; // TODO: get development mode from environments
const asyncReducers: any = { b: () => 2 };

export default function configureStore(initialState: any = {}) { // TODO: use typedef

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
    return createStore(
        createReducer(asyncReducers),
        initialState,
        compose(
            applyMiddleware(thunk),
            ...enhancers
        ));
}

export function injectAsyncReducer(store: any, name: string, asyncReducer: any) { // TODO: Fix anys
    asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
}