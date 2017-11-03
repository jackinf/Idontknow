import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import asyncRoute from "./components/asyncRoute"
import HomeRoute from "./routes/Home"
import TopicsRoute from "./routes/Topics"
import AboutRoute from "./routes/About"

const AppComponent = () => (
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
)

export default AppComponent