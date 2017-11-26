import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Layout, Menu, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import createStore from './config/store';
import {
    HomeRoute,
    LoginRoute,
    LogoutComponent,
    BloggingRoute,
    CounterRoute,
    DemoFormRoute,
    DemoTableRoute,
    DemoPrivatePageRoute,
} from "./routes";
import asyncComponent from './components/asyncComponent';
import PrivateRoute from "./components/PrivateRoute.component";

// import { sessionService } from 'redux-react-session';

const { Header, Footer, Content } = Layout;

let createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(window['__INITIAL_STATE__']);
// sessionService.initSessionService(store);

class AppComponent extends React.Component {
    render() {
        return (
            <LocaleProvider locale={enUS}>
                <Provider store={store}>
                    <Router>

                        <Layout className="layout">
                            <Header>
                                <div className="logo" />
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    style={{ lineHeight: '64px' }}
                                >
                                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/blogging">Blogging</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/counter">Counter</Link></Menu.Item>
                                    <Menu.Item key="4"><Link to="/demo-form">Demo Form</Link></Menu.Item>
                                    <Menu.Item key="5"><Link to="/demo-table">Demo Table</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/login">Login</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/protected">Protected</Link></Menu.Item>
                                    <Menu.Item disabled={true} style={{"float": "right"}}>
                                        <LogoutComponent />
                                    </Menu.Item>
                                </Menu>
                            </Header>
                            <br/>
                            <Content style={{ padding: '0 50px' }}>
                                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                    <Route exact={true} path="/" component={HomeRoute}/>
                                    <Route path="/blogging" component={asyncComponent(() =>  BloggingRoute(store))}/>
                                    <Route path="/counter" component={asyncComponent(() =>  CounterRoute(store))}/>
                                    <Route path="/demo-form" component={asyncComponent(() =>  DemoFormRoute(store))}/>
                                    <Route path="/demo-table" component={asyncComponent(() =>  DemoTableRoute(store))}/>
                                    <Route path="/login" component={LoginRoute}/>
                                    <PrivateRoute path="/protected" component={DemoPrivatePageRoute}/>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Ant Design ©2016 Created by Ant UED
                            </Footer>
                        </Layout>

                    </Router>
                </Provider>

            </LocaleProvider>
        );
    }
}

export default AppComponent;