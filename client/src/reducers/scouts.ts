import { LOADING_SCOUTS, RECV_SCOUTS, PATCH_SCOUTS,
  ADD_SCOUT, DELETE_SCOUT, PATCH_SCOUT, FATCH_SCOUT,
  CLEAN_CHOSEN_SCOUT, CLEAN_SELECTED_SCOUTS, SELECTED_SCOUTS } from '../actions/scouts'

const handlerScouts = (state: any = {
  loading: false,
  scouts: [],
  chosenScout: {},
  activeId: undefined,
  selectedScouts: [],
}, action: any) => {
  switch (action.type) {
    case LOADING_SCOUTS:
      return Object.assign({}, state, { loading: action.payload.loading })
    case RECV_SCOUTS:
      return Object.assign({}, state, {
        loading: false,
        scouts: action.payload.json.reverse(),
      })
    case PATCH_SCOUTS:
      return Object.assign({}, state, {
        loading: false,
        scouts: state.scouts.map((scout: any) => {
          for (const newScout of action.payload.json) {
            if (scout.id === newScout.id) {
              return newScout
            }
          }
          return scout
        }),
      })
    case CLEAN_SELECTED_SCOUTS:
      return Object.assign({}, state, {
        selectedScouts: [],
      })
    case SELECTED_SCOUTS:
      return Object.assign({}, state, {
        selectedScouts: action.payload.json,
      })

    case ADD_SCOUT:
      return Object.assign({}, state, { scouts: [
        action.payload.json,
        ...state.scouts,
      ] })
    case DELETE_SCOUT:
      return Object.assign({}, state, {
        scouts: state.scouts.filter((scout: any) => scout.id !== action.payload.id),
      })
    case PATCH_SCOUT:
      return Object.assign({}, state, {
        state: state.scouts.map((scout: any) => (
          scout.id === action.payload.id ? Object.assign(scout, action.payload.json) : scout
        )),
      })
    case FATCH_SCOUT:
      return Object.assign({}, state, {
        chosenScout: action.payload.json,
        activeId: action.payload.id,
      })
    case CLEAN_CHOSEN_SCOUT:
      return Object.assign({}, state, {
        chosenScout: {},
        activeId: undefined,
      })

    default:
      return state
  }
}

export default handlerScouts
