import * as React from 'react'
import { Tooltip, Badge } from 'antd'
import * as moment from 'moment'
import './HealthChart.css'
import { healthToColor } from '../../utils'

interface P {
  now: number
  statuses: {
    OK: number
    Errors: number
    Idle: number
  }[]
}

export default function HealthChart({ now, statuses }: P) {
  return (
    <div>
      {statuses.map(({ OK = 0, Errors = {}, Idle = 0 }, i) => {
        const errors = Object.keys(Errors)
        const totalErrors = errors.reduce((p, e) => p + Errors[e], 0)

        const total = OK + totalErrors + Idle
        const validTotal = OK + totalErrors
        const health = validTotal ? OK / validTotal : 0

        const time = moment(now - (i + 0.5) * 60 * 60 * 1000)
        const tip = (
          <div>
            {time.isSame(moment(), 'day') || '昨日 '}
            {time.format('HH:mm')} 左右
            {total ? (
              [
                !!OK && (
                  <p key="OK">
                    <Badge status="success" />
                    OK：
                    {OK}
                  </p>
                ),
                !!totalErrors &&
                  errors.map(e => (
                    <p key={e}>
                      <Badge status="error" />
                      {e}：{Errors[e]}
                    </p>
                  )),
                !!Idle && (
                  <p key="Idle">
                    <Badge status="default" />
                    Idle：
                    {Idle}
                  </p>
                ),
              ]
            ) : (
              <p className="default">无数据</p>
            )}
          </div>
        )
        return (
          <Tooltip title={tip} key={i}>
            <div
              className="chartbar"
              style={{ opacity: total ? 1 - Idle / total : 0 }}
            >
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
      })}
    </div>
  )
}
