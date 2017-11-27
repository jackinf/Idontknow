import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './Login.component.scss';
import fakeAuth from '../../helpers/authUtils';
import { Redirect } from 'react-router';

interface NormalLoginFormProps {}
interface RoutingData { // TODO: use correct routing type which has all the html routing info
    location: any;
}

class LoginComponent extends React.Component<RoutingData & NormalLoginFormProps & FormComponentProps> {
    state = {
        redirectToReferrer: false
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                fakeAuth.authenticate(() => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <Row gutter={16}>
                <Col className="gutter-row" lg={{span: 6, push: 6}} md={12} sm={18} xs={24}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Form.create<NormalLoginFormProps>()(LoginComponent);