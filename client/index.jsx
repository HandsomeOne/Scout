import { Router, Route, hashHistory } from 'react-router'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './containers/App'
import Settings from './containers/Settings'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/settings" component={Settings} />
  </Router>,
  document.getElementById('root'),
)
