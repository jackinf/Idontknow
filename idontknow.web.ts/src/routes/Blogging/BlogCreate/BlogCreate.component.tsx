import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export interface BlogCreateComponentStateProps {
    submitForm: Function
}
export interface BlogCreateComponentDispatchProps {
    submitForm: Function;
}
export interface FormProps {
    rating: number;
    url: string;
}

export const blogCreateComponentFormName = "blogCreateComponentForm";
class BlogCreateComponent extends React.Component<BlogCreateComponentStateProps & BlogCreateComponentDispatchProps & InjectedFormProps<FormProps>> {
    render() {
        return (
            <div>
                <Field name='rating' component='input' placeholder='Foo bar' />
                <Field name='url' component='input' placeholder='Foo bar' />
            </div>
        )
    }
}

export default reduxForm({form: blogCreateComponentFormName })(BlogCreateComponent);
