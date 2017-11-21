import * as React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Button} from "antd";
// import {initialize} from "redux-form";

interface SimpleDemoFormProps {
    foo: string;
    test: string;
}

const SimpleDemoFormName: string = 'simpleDemoForm';
class SimpleDemoForm extends React.Component<InjectedFormProps<SimpleDemoFormProps>> {
    resetForm = () => {
        this.props.initialize({test: "test123"});
        // initialize(SimpleDemoFormName, {test: "test123"}); // this is alternative way
    };

    render() {
        const {} = this.props;

        return (
            <div>
                Simple demo form

                <Button onClick={this.resetForm}>
                    Reset form
                </Button>

                <Field
                    name='foo'
                    component='input'
                    placeholder='Foo bar'
                />
                <Field
                    name='test'
                    component='input'
                    placeholder='Foo bar'
                />

            </div>
        )
    }
}

export default reduxForm({form: SimpleDemoFormName })(SimpleDemoForm);