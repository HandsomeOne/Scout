import { handleActions } from 'redux-actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { fromJS } from 'immutable'

const initialState = fromJS({
  visible: false,
  scouts: [],
})

const scoutReducers = handleActions({
  'hide modal': function hideModal(state) {
    return state
      .set('visible', false)
  },
  'get scout': function getScout(state, action) {
    return state
      .set('scouts', fromJS(action.payload).sortBy(scout => scout._id).reverse())
  },
  'del scout': function delScout(state, action) {
    return state
      .set('scouts', state.get('scouts')
        .filter(scout => scout.get('_id') !== action.payload),
      )
  },
  'will add scout': function willAddScout(state) {
    return state
      .set('visible', true)
      .set('activeId', undefined)
  },
  'add scout': function addScout(state, action) {
    return state
      .set('visible', false)
      .update('scouts', scouts => scouts.unshift(
        fromJS(action.payload),
      ))
  },
  'will update scout': function willUpdateScout(state, action) {
    return state
      .set('visible', true)
      .set('activeId', action.payload)
  },
  'update scout': function updateScout(state, action) {
    const index = state.get('scouts').findIndex(
      scout => scout.get('_id') === action.payload._id,
    )
    return state
      .set('visible', false)
      .mergeIn(['scouts', index], action.payload.data)
  },
}, initialState)

export default combineReducers({
  routing,
  scout: scoutReducers,
})
