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
import { Layout, Menu } from 'antd';
import createStore from './config/store';
import HomeRoute from './routes/Home';
import {LoginRoute} from './routes/Auth';
import BloggingRoute from './routes/Blogging';
import CounterRoute from './routes/Counter';
import DemoFormRoute from './routes/DemoForm';
import asyncComponent from './components/asyncComponent';

const { Header, Footer, Content } = Layout;

let createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(window['__INITIAL_STATE__']);

class AppComponent extends React.Component {
    render() {
        return (
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
                                <Menu.Item key="5"><Link to="/login">Login</Link></Menu.Item>
                            </Menu>
                        </Header>
                        <br/>
                        <Content style={{ padding: '0 50px' }}>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Route exact={true} path="/" component={HomeRoute}/>
                                <Route path="/blogging" component={asyncComponent(() =>  BloggingRoute(store))}/>
                                <Route path="/counter" component={asyncComponent(() =>  CounterRoute(store))}/>
                                <Route path="/demo-form" component={asyncComponent(() =>  DemoFormRoute(store))}/>
                                <Route path="/login" component={LoginRoute}/>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>

                </Router>
            </Provider>
        );
    }
}

export default AppComponent;