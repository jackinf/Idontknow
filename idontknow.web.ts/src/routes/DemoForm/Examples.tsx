import * as React from 'react';
import {Component, MouseEventHandler} from 'react';
// import { Action } from 'redux';
import {
    Field, GenericField, reduxForm,
    // WrappedFieldProps,
    BaseFieldProps, FormProps, FormAction, actionTypes, reducer,
    // ConfigProps,
    InjectedFormProps
} from "redux-form";
import { input } from 'react-dom-factories';

// TODO: tests fail in TypeScript@next when strictFunctionTypes=true

interface CustomComponentProps {
    customProp: string;
    meta: { touched: boolean }
}

class CustomComponent extends Component<BaseFieldProps & CustomComponentProps> {
    render() {
        const {
            // input,
            meta : { touched },
            customProp
        } = this.props;

        return (
            <div>
                <span>{customProp}</span>
                <p>Field: {touched ? 'touched' : 'pristine'}</p>
                <input {...input} />
            </div>
        );
    }
}

class CustomField extends Component<BaseFieldProps & CustomComponentProps> {
    render() {
        const { customProp, name, meta } = this.props;
        const F = Field as new () => GenericField<CustomComponentProps>;
        return <F
            component={CustomComponent}
            customProp={customProp}
            name={name}
            meta={meta}
        />;
    }
}

export interface FormData {
    foo: string;
    custom: string;
}

// const config1: ConfigProps<FormData, {}> = {
//     form: 'myForm'
// };
// @reduxForm<FormData, {}>(config1)
class MyForm extends Component<InjectedFormProps<any, any>> {
    render() {
        return (
            <div>
                <Field
                    name='foo'
                    component='input'
                    placeholder='Foo bar'
                />
                <CustomField
                    name='custom'
                    customProp='Hello'
                    meta={{touched: false}}
                />
            </div>
        );
    }
}
export const MyFormWrapped = reduxForm({form: "myForm"})(MyForm);

const MyStatelessFunctionalComponent: React.SFC<any> = () => <div/>;

reduxForm({
    form: 'mySFCForm'
})(MyStatelessFunctionalComponent);

class MyReusableForm extends Component<InjectedFormProps<{}, {}>> {
    render() {
        return (
            <div>
                <Field
                    name='foo'
                    component='input'
                    placeholder='Foo bar'
                />
            </div>
        );
    }
}
export const MyReusableFormWrapper = reduxForm({form: "myForm"})(MyReusableForm);

reduxForm({
    form: 'forceUnregisterOnMountForm',
    forceUnregisterOnUnmount: true
});

// adapted from: http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState/


export interface DataShape {
    firstName: string;
}

// interface Props extends FormProps<DataShape, {}, {}> {}

interface TestProps {
    reset: MouseEventHandler<HTMLButtonElement>;
    submitting: boolean;
    handleSubmit: MouseEventHandler<HTMLFormElement>;
    pristine: boolean;
}
export let InitializeFromStateFormFunction = (props: FormProps & TestProps) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <div>
                    <Field name="firstName" component={input} type="text" placeholder="First Name"/>
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
            </div>
        </form>
    );
};

// // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
// const DecoratedInitializeFromStateFormFunction = reduxForm({
//     form: 'initializeFromState'  // a unique identifier for this form
// })(InitializeFromStateFormFunction);

// // You have to connect() to any reducers that you wish to connect to yourself
// const ConnectedDecoratedInitializeFromStateFormFunction = connect(
//     state => ({
//         initialValues: state.account.data // pull initial values from account reducer
//     }),
// )(DecoratedInitializeFromStateFormFunction);
//
// // React ComponentClass instead of StatelessComponent
//
// class InitializeFromStateFormClass extends React.Component<FormProps & TestProps & DispatchProp<any>> {
//     render() {
//         return InitializeFromStateFormFunction(this.props);
//     }
// }
//
// // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
// const DecoratedInitializeFromStateFormClass = reduxForm<DataShape, {}>({
//     form: 'initializeFromState'  // a unique identifier for this form
// })(InitializeFromStateFormClass);
//
// // You have to connect() to any reducers that you wish to connect to yourself
// const mapStateToProps = (state: any) => ({
//     initialValues: { firstName: state.account.data.firstName }  // pull initial values from account reducer
// } as {initialValues?: Partial<DataShape>});
// const ConnectedDecoratedInitializeFromStateFormClass = connect(mapStateToProps)(DecoratedInitializeFromStateFormClass);

reducer({}, {
    type: 'ACTION'
});

reducer.plugin({
    myform: (state: any, action: FormAction) => {
        if (action.type === actionTypes.CHANGE && action.meta.form === 'securitySettings') {
            return {
                ...state,
                values: {
                    ...state.values,
                    downloadLinkAutoPassword: true,
                },
            };
        } else {
            return state;
        }
    }
});