import { LOADING_ALERTLOGS, RECV_ALERTLOGS } from '../actions/alertlog'

const handlerAlertLogs = (
  state = {
    loading: false,
    alertLogs: [],
  },
  action: any,
) => {
  switch (action.type) {
    case LOADING_ALERTLOGS:
      return Object.assign({}, state, { loading: action.payload.loading })
    case RECV_ALERTLOGS:
      return Object.assign({}, state, {
        loading: false,
        alertLogs: action.payload.json,
      })
    default:
      return state
  }
}

export default handlerAlertLogs
