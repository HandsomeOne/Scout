import ReactDOM from 'react-dom'
import React from 'react'

import App from './components/App'
import './index.css'

const root = document.getElementById('root')
const render = () => { ReactDOM.render(<App />, root) }

render()
if (module.hot) {
  module.hot.accept('./components/App', render)
}
