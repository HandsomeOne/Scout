import { RECV_STATS, RECV_STATS_HEALTH, RECV_STATS_ERRORLOG } from '../actions/stats'

const handleStats = (state = {
  common: {},
  health: {},
  logs: [],
}, action) => {
  switch (action.type) {
    case RECV_STATS:
      return Object.assign({}, state, { common: action.payload.json })
    case RECV_STATS_HEALTH:
      return Object.assign({}, state, { health: action.payload.json })
    case RECV_STATS_ERRORLOG:
      return Object.assign({}, state, { logs: action.payload.json })
    default:
      return state
  }
}


export default handleStats
