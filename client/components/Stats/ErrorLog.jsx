import React, { Component, PropTypes as T } from 'react'
import moment from 'moment'
import { Timeline } from 'antd'
import { origin } from '../../config'
import $ from './ErrorLog.css'
import formatTinyTime from '../../utils/formatTinyTime'

export default class ErrorLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
    }
  }
  componentDidMount() {
    const { id, since } = this.props
    fetch(`${origin}/stats/errorlog/${id}?since=${since}`)
    .then(res => res.json())
    .then((json) => {
      this.setState({
        logs: json,
      })
    })
  }
  render() {
    const { Item } = Timeline
    const { logs } = this.state

    return (
      <div className={$.errorlog}>
        <h2>错误日志</h2>
        <div className={$.timeline}>{
          logs.length ? (
            <Timeline>{
              logs.map(log => (
                <Item color="red" key={log.start}>
                  { log.num === 1 ? (
                    <p>在 {moment(log.start).format('MM/DD HH:mm')}，
                    捕获了 1 次异常。
                    异常详情为：</p>
                  ) : (
                    <p>从 {moment(log.start).format('MM/DD HH:mm')} 至 {moment(log.end).format('MM/DD HH:mm')}，
                    连续捕获了 {log.num} 次异常。
                    其中首次异常详情为：</p>
                  ) }
                  <table className={$.detail}><tbody>
                    { log.firstLog.statusCode && <tr>
                      <td>HTTP 状态码</td>
                      <td>{log.firstLog.statusCode}</td>
                    </tr> }
                    { log.firstLog.responseTime && <tr>
                      <td>响应时间</td>
                      <td>{formatTinyTime(log.firstLog.responseTime)}</td>
                    </tr> }
                    { log.firstLog.body && <tr>
                      <td>接口返回主体</td>
                      <td>{log.firstLog.body}</td>
                    </tr> }
                    <tr>
                      <td>错误类型</td>
                      <td>{log.firstLog.errName}</td>
                    </tr>
                    <tr>
                      <td>错误描述</td>
                      <td>{log.firstLog.errMessage}</td>
                    </tr>
                  </tbody></table>
                </Item>
              ))
            }</Timeline>
          ) : <p className={$.ok}>一切正常</p>
        }</div>
      </div>
    )
  }
}

ErrorLog.propTypes = {
  id: T.string,
  since: T.number,
}
