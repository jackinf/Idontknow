import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import HomeRoute from './routes/Home'
import TopicsRoute from './routes/Topics'
import AboutRoute from './routes/About'
import createStore from './config/store'

let createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(window.__INITIAL_STATE__);

const AppComponent = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/async">Async</Link></li>
        </ul>
        <hr/>
        <Route exact path="/" component={HomeRoute}/>
        <Route path="/topics" component={TopicsRoute}/>
        <Route path="/about" component={AboutRoute}/>
      </div>
    </Router>
  </Provider>
);

export default AppComponent