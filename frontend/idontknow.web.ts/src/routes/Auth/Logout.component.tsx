import * as React from 'react';
import { withRouter } from 'react-router-dom';
import fakeAuth from '../../utils/fakeAuth';
import Button from 'antd/lib/button/button';

export default class LogoutComponent extends React.Component {
    render() {
        const AuthButton = withRouter(({ history }) => (
            fakeAuth.isAuthenticated ? (
                <p>
                    Welcome!
                    <Button onClick={() => { fakeAuth.signout(() => history.push('/')); }}>
                        Sign out
                    </Button>
                </p>
            ) : (
                <p>You are not logged in.</p>
            )
        ));

        return (
            <div>
                <AuthButton/>
            </div>
        );
    }
}