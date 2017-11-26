import { connect } from 'react-redux';
import Component from './Blogging.create.component';
import { BloggingReducerState } from '../../Blogging.models';

const mapDispatchToProps = {};
const mapStateToProps = (state: {[reducerKey: string]: BloggingReducerState}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);