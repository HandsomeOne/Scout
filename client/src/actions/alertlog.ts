import { origin } from '../config'

export const RECV_ALERTLOGS = 'RECV_ALERTLOGS'
export const LOADING_ALERTLOGS = 'LOADING_ALERTLOGS'

export const loadAlertLogs = () => (dispatch: any) => (dispatch({
  type: LOADING_ALERTLOGS,
  payload: {
    loading: true,
  },
}))

export const fetchAlertLogs = (page: any, pageSize: any) => (dispatch: any) =>
  fetch(`${origin}/alertlogs?page=${page}&pageSize=${pageSize}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      dispatch({
        type: RECV_ALERTLOGS,
        payload: {
          json,
        },
      })
      return true
    })
    .catch((err) => {
      return false
    })
