import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import configure from './store'
import App from './containers/App'
import Settings from './containers/Settings'

const store = configure()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/settings" component={Settings} />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
