import Loadable from 'react-loadable'
import MyLoadingComponent from '../../components/MyLoadingComponent'
import {injectAsyncReducer} from '../../config/store';
import CounterReducer from './Counter.reducer'

const test = (store) => Loadable({
    loader: () => import('./Counter.container').then((component) => {
        injectAsyncReducer(store, 'counter', CounterReducer);
        return component;
    }),
    loading: MyLoadingComponent
});

export default test