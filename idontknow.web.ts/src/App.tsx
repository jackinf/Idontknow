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
import { Layout, Menu, Breadcrumb } from 'antd';
import createStore from './config/store';
import HomeRoute from './routes/Home';
// import TopicsRoute from './routes/Topics'
// import AboutRoute from './routes/About'
import CounterRoute from './routes/Counter';
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
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                                {/*<Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>*/}
                                {/*<Menu.Item key="3"><Link to="/topics">Topics</Link></Menu.Item>*/}
                                <Menu.Item key="2"><Link to="/counter">Counter</Link></Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }} >
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                <Route exact={true} path="/" component={HomeRoute}/>
                                {/*<Route path="/topics" component={TopicsRoute}/>*/}
                                {/*<Route path="/about" component={AboutRoute}/>*/}
                                <Route path="/counter" component={ asyncComponent(() =>  CounterRoute(store)) }/>
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