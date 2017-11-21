import * as React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Button} from "antd";

export interface SimpleDemoStateProps {
    haha: string;
}
export interface SimpleDemoDispatchProps {
    submitForm: Function;
}

export interface FormProps {
    foo: string;
    bar: string;
}

export const SimpleDemoFormName: string = 'simpleDemoForm';
class SimpleDemoForm extends React.Component<SimpleDemoStateProps & SimpleDemoDispatchProps & InjectedFormProps<FormProps>> {
    resetForm = () => {
        this.props.initialize({foo: "test123"});
        // initialize(SimpleDemoFormName, {foo: "test123"}); // this is alternative way
    };

    submitForm = () => {
        this.props.submitForm();
    };

    render() {
        const {haha} = this.props;

        return (
            <div>
                <h2>{haha}</h2>
                Simple demo form

                <Button onClick={this.resetForm}>
                    Reset form
                </Button>

                <Button onClick={this.submitForm}>
                    Submit form
                </Button>

                <Field
                    name='foo'
                    component='input'
                    placeholder='Foo bar'
                />
                <Field
                    name='bar'
                    component='input'
                    placeholder='Foo bar'
                />

            </div>
        );
    }
}


export default reduxForm({form: SimpleDemoFormName })(SimpleDemoForm);