import React, { Component, PropTypes as T } from 'react'
import { Row, Select, Button } from 'antd'
import fetch from 'isomorphic-fetch'
import { origin, colors as C } from '../../config'
import $ from './AlertURLDetail.css'

export default class AlertURLDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipients: [],
      result: {},
      isSending: false,
    }
    this.send = this.send.bind(this)
    this.update = this.update.bind(this)
  }
  getRequestOutput() {
    const result = this.state.result
    switch (result.status) {
      case 'OK':
        return (
          <span
            style={{
              color: [
                C.cyan,
                C.blue,
                C.green,
                C.yellow,
                C.red,
                C.pink,
              ][Math.floor(result.statusCode / 100)],
            }}
          >
            {result.statusCode} {result.statusText}
          </span>
        )
      case 'Error':
        return <span style={{ color: C.red }}>{result.name}: {result.message}</span>
      default:
        return ''
    }
  }
  send() {
    this.setState({ isSending: true })

    fetch(`${origin}/settings/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alertURL: this.props.alertURL,
        recipients: this.state.recipients,
      }),
    })
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isSending: false,
        result,
      })
    })
  }
  update(recipients) {
    this.setState({ recipients })
  }

  render() {
    return (
      <div className={$.alerturldetail}>
        <pre>
          POST {this.props.alertURL}<br />
          Content-Type: application/json<br /><br />
          {JSON.stringify({
            recipients: this.state.recipients,
            name: '查询当前时间',
            URL: 'https://your.server/your/api',
            status: 'Error',
            statusCode: 200,
            responseTime: 53,
            now: 1484292986935,
            errName: 'AssertionError',
            errMessage: '慢了123秒',
            body: '{now:1484292863588}',
            readType: 'json',
            testCase: 'const d = Date.now() - body.now\nassert(d < 60000, `慢了${d/1000|0}秒`)',
          }, true, 2)}
        </pre>
        <Row type="flex" justify="space-between" className={$.row}>
          <Select
            placeholder="告警接收人"
            tags
            size="large"
            notFoundContent="空"
            onChange={this.update}
            tokenSeparators={[',', ' ']}
          />
          <Button
            size="large"
            icon="rocket"
            loading={this.state.isSending}
            onClick={this.send}
          >测试</Button>
        </Row>

        <div style={{ lineHeight: '32px' }}>
          {this.getRequestOutput()}
        </div>

        <pre>{this.state.result.body}</pre>
      </div>
    )
  }
}

AlertURLDetail.propTypes = {
  alertURL: T.string,
}
