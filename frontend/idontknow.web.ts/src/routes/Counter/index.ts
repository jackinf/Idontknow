// import Loadable, { Options } from 'react-loadable';
// import MyLoadingComponent from '../../components/MyLoadingComponent';
import { injectAsyncReducer } from '../../config/store';
import CounterReducer from './Counter.reducer';

export default (store: any): any => import('./Counter.container').then((component) => {
    injectAsyncReducer(store, 'counter', CounterReducer);
    return component;
});