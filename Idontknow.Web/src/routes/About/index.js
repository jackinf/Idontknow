import Loadable from 'react-loadable'
import MyLoadingComponent from '../../components/MyLoadingComponent'

export default Loadable({
    loader: () => import('./About.component'),
    loading: MyLoadingComponent
})