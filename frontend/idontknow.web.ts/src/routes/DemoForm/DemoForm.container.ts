import { connect } from 'react-redux';
import DemoFormComponent, { SimpleDemoDispatchProps, SimpleDemoStateProps } from './DemoForm.component';
import submitForm from './actions/DemoForm.submit';
import { DemoFormState } from './DemoForm.reducer';
import { REDUCER_KEY__DEMO_FORM } from './index';

const mapDispatchToProps = {
    submitForm
};

const mapStateToProps = (state: any): SimpleDemoStateProps => {
    const currentState = state[REDUCER_KEY__DEMO_FORM] as DemoFormState;

    return {
        haha: currentState.haha
    };
};

export default connect<SimpleDemoStateProps, SimpleDemoDispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(DemoFormComponent);
