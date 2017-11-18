import {injectAsyncReducer} from '../../config/store';
import CounterReducer from './Blog.reducer';

export default (store: any): any => import('./Blog.container').then((component) => {
    injectAsyncReducer(store, 'counter', CounterReducer);
    return component;
});