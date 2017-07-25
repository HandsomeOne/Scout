import React, { Component, PropTypes as T } from 'react'
import formatTinyTime from '../../utils/formatTinyTime'
import $ from './Overview.css'

export default class Overview extends Component {
  render() {
    const {
      name,
      URL,
      Apdex,
      ApdexTarget,
      OK = 0,
      Error = 0,
      Idle = 0,
      meanResponseTime,
    } = this.props.common
    const total = OK + Error + Idle
    const health = total ? (OK + Idle) / total : 0
    return (
      <div>
        <div className={$.overview}>
          <div>
            <h6>健康度</h6>
            {Math.round(health * 100)}%
          </div>
          <div>
            <h6>Apdex / {formatTinyTime(ApdexTarget)}</h6>
            {typeof Apdex !== 'number' ? 'NaN' : Apdex.toFixed(2)}
          </div>
          <div>
            <h6>平均响应时间</h6>
            {formatTinyTime(meanResponseTime)}
          </div>
          <div>
            <h6>异常数</h6>
            {Error}
          </div>
        </div>

        <div className={$.jumbotron}>
          <h1>{name}</h1>
          <p>{URL}</p>
          <p className={$.summary}>
          在过去的 {this.props.since / 60} 小时中，
          接口共被检测了 {total} 次，
          其中有 {Error} 次异常，
          {Idle} 次处于休眠时间。</p>
        </div>
      </div>
    )
  }
}

Overview.propTypes = {
  common: T.object,
  since: T.number,
}
