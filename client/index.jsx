import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import App from './components/App'
import reducer from './reducers'

import './index.css'

const root = document.getElementById('root')
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
  ),
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root)
}

render()
if (module.hot) {
  module.hot.accept('./components/App', render)
}
