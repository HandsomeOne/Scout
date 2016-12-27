import React, { PropTypes as T } from 'react'
import formatTinyTime from '../../utils/formatTinyTime'
import $ from './Overview.css'

export default function Overview(props) {
  return (
    <div className={$.overview}>
      <div />
      <div>
        <h6>健康度</h6>
        {Math.round(props.health * 100)}%
      </div>
      <div>
        <h6>Apdex</h6>
        {props.Apdex}
        <small>~{formatTinyTime(props.ApdexTarget)}</small>
      </div>
      <div>
        <h6>平均响应时间</h6>
        {formatTinyTime(props.meanResponseTime)}
      </div>
      <div>
        <h6>错误数</h6>
        {props.Error}
      </div>
      <div />
    </div>
  )
}

Overview.propTypes = {
  health: T.number,
  Apdex: T.string,
  ApdexTarget: T.number,
  meanResponseTime: T.number,
  Error: T.number,
}
