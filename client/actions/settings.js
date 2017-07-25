import fetch from 'isomorphic-fetch'
import { origin } from '../config'

export const RECV_SETTINGS = 'RECEIVE_SETTINGS'

export const fetchSettings = () => dispatch =>
  fetch(`${origin}/settings`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      dispatch({
        type: RECV_SETTINGS,
        payload: {
          settings: json,
        },
      })
      return true
    })
    .catch((err) => {
      console.error(err)
      return false
    })

export const patchSettings = data => dispatch =>
  fetch(`${origin}/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      dispatch(fetchSettings())
      return true
    })
    .catch((err) => {
      console.error(err)
      return false
    })
