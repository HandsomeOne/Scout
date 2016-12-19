import React, { PropTypes as T } from 'react'
import { Tooltip } from 'antd'
import { colors as C } from '../../config'
import $ from './HistoryChart.css'

function getColor(x) {
  if (x < 0.6) {
    return C.red
  }
  if (x < 0.8) {
    return C.orange
  }
  if (x < 1) {
    return C.yellow
  }
  return C.green
}

export default function HistoryChart({ latest, data }) {
  return (
    <div>{
      data.map(({ OK = 0, Error = 0, Idle = 0 }, i) => {
        const total = OK + Error + Idle || Infinity
        const health = (OK + Idle) / total

        const time = new Date(latest - (i * 60 * 60 * 1000))
        const tip = (
          <div>
            {time.getDate() === new Date().getDate() || '昨日'}
            {time.getHours()}点
            <br />OK: {OK}
            <br />Error: {Error}
            <br />Idle: {Idle}
          </div>
        )
        return (
          <Tooltip placement="left" title={tip} key={i}>
            <div className={$.bar}>
              <div
                style={{
                  backgroundColor: getColor(health),
                  height: `${health * 100}%`,
                  opacity: 1 - (Idle / total),
                }}
              />
            </div>
          </Tooltip>
        )
      })
    }</div>
  )
}

HistoryChart.propTypes = {
  latest: T.number,
  data: T.arrayOf(T.shape({
    OK: T.number,
    Error: T.number,
    Idle: T.number,
  })),
}
