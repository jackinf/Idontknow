import React from "react";
import {Route} from "react-router";
import {
    Redirect
} from "react-router-dom";
import fakeAuth from "../utils/fakeAuth";
// import {sessionService} from "redux-react-session";


const PrivateRoute = ({ component: TheComponent, ...rest }: any) => { // TODO: fix any
    return (
        <Route {...rest} render={props => (
            fakeAuth.isAuthenticated ? (
                <TheComponent {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    );
};

export default PrivateRoute;