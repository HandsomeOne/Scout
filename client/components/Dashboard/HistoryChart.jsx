import React, { PropTypes as T } from 'react'
import { interpolateWarm } from 'd3'
import { Tooltip } from 'antd'
import $ from './HistoryChart.css'

function getColor(x) {
  return interpolateWarm(x)
}

export default function HistoryChart({ latest, data }) {
  return (
    <div>{
      data.map(({ OK = 0, Error = 0, Idle = 0 }, i) => {
        const paddedIdle = (OK + Error + Idle === 0) ? 1 : Idle
        const total = OK + Error + paddedIdle
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
          <Tooltip title={tip} key={i}>
            <div className={$.bar} style={{ opacity: 1 - (paddedIdle / total) }}>
              <div>
                <div
                  style={{
                    backgroundColor: getColor(health),
                    height: `${health * 100}%`,
                  }}
                />
              </div>
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
