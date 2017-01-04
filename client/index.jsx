import { Router, Route, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'
import React from 'react'
import Dashboard from './containers/Dashboard'
import Settings from './containers/Settings'
import Stats from './containers/Stats'
import './index.css'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Dashboard} />
    <Route path="/settings" component={Settings} />
    <Route path="/stats/:id" component={Stats} />
  </Router>,
  document.getElementById('root'),
)
