import React, { PropTypes as T } from 'react'
import { interpolateWarm } from 'd3'
import { Tooltip, Badge } from 'antd'
import moment from 'moment'
import $ from './HealthChart.css'

export default function HealthChart({ now, statuses }) {
  return (
    <div>{
      statuses.map(({ OK = 0, Error = 0, Idle = 0 }, i) => {
        const total = OK + Error + Idle
        const health = total ? (OK + Idle) / total : 0

        const time = moment(now - ((i + 0.5) * 60 * 60 * 1000))
        const tip = (
          <div>
            {time.isSame(moment(), 'day') || '昨日 '}
            {time.format('HH:mm')} 左右

            <br /><Badge status="success" />{OK}
            <br /><Badge status="error" />{Error}
            <br /><Badge status="default" />{Idle}
          </div>
        )
        return (
          <Tooltip title={tip} key={i}>
            <div className={$.bar} style={{ opacity: total ? 1 - (Idle / total) : 0 }}>
              <div>
                <div
                  style={{
                    backgroundColor: interpolateWarm(health),
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
