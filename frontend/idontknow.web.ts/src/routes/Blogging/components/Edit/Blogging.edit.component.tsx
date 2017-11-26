import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export interface FormProps {
    rating: number;
    url: string;
}

export const blogEditComponentFormName = "blogEditComponentFormName";
class BlogCreateComponent extends React.Component<InjectedFormProps<FormProps>> {
    render() {
        return (
            <div>
                <Field name='rating' component='input' placeholder='Rating' />
                <Field name='url' component='input' placeholder='Url' />
            </div>
        )
    }
}

export default reduxForm({form: blogEditComponentFormName })(BlogCreateComponent);
