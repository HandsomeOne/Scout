import * as React from 'react'
import { Timeline } from 'antd'
import { formatTinyTime, calendar } from '../../utils'
import './ErrorLog.css'

interface P {
  since: number,
  logs: {
    start: number
    end: number
    num: number
    firstLog: {
      errName: string
      errMessage: string
      statusCode: number
      responseTime: number
      body: string
    }
  }[]
}

export default class ErrorLog extends React.Component<P> {
  render() {
    const { Item } = Timeline
    const { logs } = this.props

    return (
      <div className="errorlog">
        <h2>错误日志</h2>
        <div className="timeline">{
          logs.length ? (
            <Timeline>{
              logs.map(log => (
                <Item color="red" key={log.start}>
                  {log.num === 1 ? (
                    <p>在{calendar(log.start)}，
                    捕获了 1 次异常。详情为：</p>
                  ) : (
                      <p>从{calendar(log.start)}至{calendar(log.end)}，
                    连续捕获了 {log.num} 次异常。
                    其中首次异常详情为：</p>
                    )}
                  <table className="detail"><tbody>
                    <tr>
                      <td>错误类型</td>
                      <td>{log.firstLog.errName}</td>
                    </tr>
                    <tr>
                      <td>错误描述</td>
                      <td>{log.firstLog.errMessage}</td>
                    </tr>
                    {log.firstLog.statusCode && <tr>
                      <td>HTTP 状态码</td>
                      <td>{log.firstLog.statusCode}</td>
                    </tr>}
                    {log.firstLog.responseTime && <tr>
                      <td>响应时间</td>
                      <td>{formatTinyTime(log.firstLog.responseTime)}</td>
                    </tr>}
                    {log.firstLog.body && <tr>
                      <td>接口返回主体</td>
                      <td>{log.firstLog.body}</td>
                    </tr>}
                  </tbody></table>
                </Item>
              ))
            }</Timeline>
          ) : <p className="ok">一切正常</p>
        }</div>
      </div>
    )
  }
}
