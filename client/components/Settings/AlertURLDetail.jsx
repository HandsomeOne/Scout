import React, { Component, PropTypes as T } from 'react'
import { Row, Select, Button } from 'antd'
import fetch from 'isomorphic-fetch'
import { origin, colors as C } from '../../config'
import $ from './index.css'

export default class Settings extends Component {
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
                C.grey,
                C.blue,
                C.green,
                C.yellow,
                C.red,
                C.magenta,
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
        <p>
          POST {this.props.alertURL}<br />
          {JSON.stringify({
            recipients: this.state.recipients,
            name: '测试接口',
            errName: 'Error',
            errMessage: '这是一条测试错误信息',
            detail: '',
          })}
        </p>
        <Row type="flex" justify="space-between" className={$.row}>
          <Select
            placeholder="报警接收人"
            tags
            size="large"
            notFoundContent="空"
            onChange={this.update}
          />
          <Button
            size="large"
            icon="rocket"
            loading={this.state.isSending}
            onClick={this.send}
            disabled={!this.state.recipients.length}
          >发送</Button>
        </Row>

        <div style={{ lineHeight: '32px' }}>
          {this.getRequestOutput()}
        </div>

        <div className={$.body}>{this.state.result.body}</div>
      </div>
    )
  }
}

Settings.propTypes = {
  alertURL: T.string,
}
