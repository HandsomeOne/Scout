import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import rootReducer from './reducers'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
