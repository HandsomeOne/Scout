import React, { PropTypes as T } from 'react'
import { interpolateWarm } from 'd3'
import { Tooltip } from 'antd'
import $ from './HealthChart.css'

function getColor(x) {
  return interpolateWarm(x)
}

export default function HealthChart({ now, statuses }) {
  return (
    <div>{
      statuses.map(({ OK = 0, Error = 0, Idle = 0 }, i) => {
        const total = OK + Error + Idle
        const health = total ? (OK + Idle) / total : 0

        const time = new Date(now - ((i + 0.5) * 60 * 60 * 1000))
        const tip = (
          <div>
            {time.getDate() === new Date().getDate() || '昨日 '}
            {time.getHours()}:{time.getMinutes()} 左右
            <br />OK: {OK}
            <br />Error: {Error}
            <br />Idle: {Idle}
          </div>
        )
        return (
          <Tooltip title={tip} key={i}>
            <div className={$.bar} style={{ opacity: total ? 1 - (Idle / total) : 0 }}>
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

HealthChart.propTypes = {
  now: T.number,
  statuses: T.arrayOf(T.shape({
    OK: T.number,
    Error: T.number,
    Idle: T.number,
  })),
}
