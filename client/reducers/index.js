import { combineReducers } from 'redux'
import settings from './settings'
import stats from './stats'
import alertlog from './alertlog'
import scouts from './scouts'

const scoutApp = combineReducers({
  settings,
  stats,
  alertlog,
  scouts,
})

export default scoutApp
