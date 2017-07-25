import fetch from 'isomorphic-fetch'
import { origin } from '../config'

export const RECV_STATS = 'FETCH_STATS'
export const RECV_STATS_HEALTH = 'FETCH_STATS_HEALTH'
export const RECV_STATS_ERRORLOG = 'FETCH_STATS_ERRORLOG'

export const fetchStats = (id, since) => dispatch =>
  fetch(`${origin}/stats/${id}?since=${since}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      dispatch({
        type: RECV_STATS,
        payload: {
          json,
        },
      })
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })

export const fetchStatsHealth = (id, since, interval) => dispatch =>
  fetch(`${origin}/stats/health/${id}?since=${since}&interval=${interval}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      dispatch({
        type: RECV_STATS_HEALTH,
        payload: {
          json,
        },
      })
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })

export const fetchStatsErrorlog = (id, since) => dispatch =>
  fetch(`${origin}/stats/errorlog/${id}?since=${since}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((json) => {
      dispatch({
        type: RECV_STATS_ERRORLOG,
        payload: {
          json,
        },
      })
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
