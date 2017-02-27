import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import React from 'react'
import Dashboard from './containers/Dashboard'
import Settings from './containers/Settings'
import AlertLog from './containers/AlertLog'
import Stats from './containers/Stats'
import './index.css'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
      <Route path="/alertlog" component={AlertLog} />
      <Route path="/stats/:id" component={Stats} />
    </div>
  </Router>,
  document.getElementById('root'),
)
