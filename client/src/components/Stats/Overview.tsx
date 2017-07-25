import * as React from 'react'
import { formatTinyTime } from '../../utils'
import { origin } from '../../config'
import './Overview.css'

interface P {
  id: string,
  since: number,
}

interface S {
  name?: string
  URL?: string
  Apdex?: number
  ApdexTarget?: number
  OK?: number
  Error?: number
  Idle?: number
  meanResponseTime?: number
}

export default class Overview extends React.Component<P, S> {
  state: S = {}
  componentDidMount() {
    fetch(`${origin}/stats/${this.props.id}?since=${this.props.since}`)
      .then(res => res.json())
      .then((json) => {
        this.setState(json)
      })
  }

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
    } = this.state
    const total = OK + Error + Idle
    const health = total ? (OK + Idle) / total : 0
    return (
      <div>
        <div className="overview">
          <div>
            <h6>健康度</h6>
            {Math.round(health * 100)}%
          </div>
          <div>
            <h6>Apdex / {formatTinyTime(ApdexTarget || 0)}</h6>
            {typeof Apdex !== 'number' ? 'NaN' : Apdex.toFixed(2)}
          </div>
          <div>
            <h6>平均响应时间</h6>
            {formatTinyTime(meanResponseTime || 0)}
          </div>
          <div>
            <h6>异常数</h6>
            {Error}
          </div>
        </div>

        <div className="jumbotron">
          <h1>{name}</h1>
          <p>{URL}</p>
          <p className="summary">
            在过去的 {this.props.since / 60} 小时中，
          接口共被检测了 {total} 次，
          其中有 {Error} 次异常，
          {Idle} 次处于休眠时间。</p>
        </div>
      </div>
    )
  }
}
