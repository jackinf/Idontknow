import {connect} from 'react-redux';
import Component from './Blogging.component';

const mapDispatchToProps = {

};

const mapStateToProps = (state: any) => ({
    value: state['blogging']
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);