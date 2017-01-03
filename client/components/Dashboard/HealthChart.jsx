import React, { PropTypes as T } from 'react'
import { Tooltip, Badge } from 'antd'
import moment from 'moment'
import $ from './HealthChart.css'
import healthToColor from '../../utils/healthToColor'

export default function HealthChart({ now, statuses }) {
  return (
    <div>{
      statuses.map(({ OK = 0, Errors = {}, Idle = 0 }, i) => {
        const errors = Object.keys(Errors)
        const totalErrors = errors.reduce((p, e) => p + Errors[e], 0)

        const total = OK + totalErrors + Idle
        const health = total ? (OK + Idle) / total : 0

        const time = moment(now - ((i + 0.5) * 60 * 60 * 1000))
        const tip = (
          <div>
            {time.isSame(moment(), 'day') || '昨日 '}
            {time.format('HH:mm')} 左右

            <br /><Badge status="success" />OK：{OK}
            {
              totalErrors ?
              errors.map(e => (
                <span key={e}><br /><Badge status="error" />{e}：{Errors[e]}</span>
              )) :
              <span><br /><Badge status="error" />Error：0</span>
            }
            <br /><Badge status="default" />Idle：{Idle}
          </div>
        )
        return (
          <Tooltip title={tip} key={i}>
            <div className={$.bar} style={{ opacity: total ? 1 - (Idle / total) : 0 }}>
              <div>
                <div
                  style={{
                    backgroundColor: healthToColor(health),
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
