import { RECV_SETTINGS } from '../actions/settings'

const handleSettings = (state = {
  settings: {},
}, action: any) => {
  switch (action.type) {
    case RECV_SETTINGS:
      return Object.assign({}, state, { settings: action.payload.settings })
    default:
      return state
  }
}

export default handleSettings
