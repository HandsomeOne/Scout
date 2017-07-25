import * as React from 'react'
import { Form, Select, Button, Row, Col, Icon, Tooltip } from 'antd'

declare const require: any
const AU = require('ansi_up')
const au = new AU.default()
import * as classnames from 'classnames'
import CodeEditor from './custom/CodeEditor'
import { origin, colors as C } from '../../../config'
import './TestCase.css'

function toHtml(s: string = '') {
  return au.ansi_to_html(
    s.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;'),
  )
}

interface P {
  form: {
    getFieldDecorator: (...args: any[]) => any,
    getFieldValue: (...args: any[]) => any,
  }
  scout: {
    readType: string,
    testCase: string,
  }
}

interface S {
  method: string
  URL: string
  body: string
  headers: string[][]
  ApdexTarget: number
  readType: string
  isRequesting: boolean
  requestResult?: {
    status: string
    statusCode: number
    statusText: string
    body: string
    responseTime: number
    beautifiedBody: string
    name: string
    message: string
  }
  requestTime: number
  isTesting: boolean
  testResult: {
    status?: string
    name?: string
    message?: string
    logs: string[]
  }
  testTime: number
  isConsoleVisible: boolean
}

export default class TestCase extends React.Component<P, S> {
  static defaultProps = {
    scout: {},
  }

  constructor(props: P) {
    super(props)
    const { getFieldValue } = props.form
    this.state = {
      method: getFieldValue('method'),
      URL: getFieldValue('URL'),
      body: getFieldValue('body'),
      headers: getFieldValue('headers'),
      ApdexTarget: getFieldValue('ApdexTarget'),
      readType: props.scout.readType || 'text',
      isRequesting: false,
      isTesting: false,
      requestTime: 0,
      testResult: {
        logs: [],
      },
      testTime: 0,
      isConsoleVisible: false,
      requestResult: {}
    } as any
  }
  componentDidMount() {
    if (this.state.URL) {
      this.request()
    }
  }
  getRequestOutput() {
    if (!this.state.requestResult) return null

    const result = this.state.requestResult
    let output
    if (result.status === 'OK') {
      output = [
        (
          <Tooltip key="statusCode" title={<code>statusCode</code>}>
            <span
              style={{
                float: 'left',
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
          </Tooltip>
        ),
        (
          <Tooltip key="responseTime" title={<code>responseTime</code>}>
            <span
              style={{
                float: 'right',
                color: (() => {
                  const ratio = result.responseTime / (this.state.ApdexTarget || 500)
                  if (ratio <= 1) {
                    return C.green
                  }
                  if (ratio <= 4) {
                    return C.yellow
                  }
                  return C.orange
                })(),
              }}
            >
              {result.responseTime}ms
            </span>
          </Tooltip>
        ),
      ]
    } else if (result.status === 'Error') {
      output = <span style={{ color: C.red }}>{result.name}: {result.message}</span>
    }
    return (
      <div
        style={{ height: 32 }}
        key={this.state.requestTime}
        className={classnames('fadein', 'line')}
      >
        {output}
      </div>
    )
  }
  getTestOutput() {
    const result = this.state.testResult
    switch (result.status) {
      case 'OK':
        return <span style={{ color: C.green }}>测试通过</span>
      case 'Error':
        return <span style={{ color: C.red }}>{result.name}: {result.message}</span>
      default:
        return ''
    }
  }
  renewRequest() {
    const { getFieldValue } = this.props.form
    this.setState({
      method: getFieldValue('method'),
      URL: getFieldValue('URL'),
      body: getFieldValue('body'),
      headers: getFieldValue('headers'),
      ApdexTarget: getFieldValue('ApdexTarget'),
    })
  }
  request = () => {
    this.setState({ isRequesting: true })
    fetch(`${origin}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: this.state.method,
        URL: this.state.URL,
        body: this.state.body,
        headers: this.state.headers,
        readType: this.state.readType,
      }),
    })
      .then(res => res.json())
      .then((requestResult) => {
        this.setState({
          isRequesting: false,
          requestTime: Date.now(),
          requestResult,
        })
      })
  }

  test = () => {
    const requestResult = this.state.requestResult!
    this.setState({ isTesting: true })
    fetch(`${origin}/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        statusCode: requestResult.statusCode,
        responseTime: requestResult.responseTime,
        body: requestResult.body,
        testCase: this.props.form.getFieldValue('testCase'),
      }),
    })
      .then(res => res.json())
      .then((testResult) => {
        this.setState({
          isTesting: false,
          testTime: Date.now(),
          testResult,
          isConsoleVisible: testResult.logs.length,
        })
      })
  }
  toggleConsole = () => {
    this.setState({
      isConsoleVisible: !this.state.isConsoleVisible,
    })
  }
  render() {
    const { scout, form } = this.props
    const { getFieldDecorator } = form

    const { Item } = Form
    const { Option } = Select

    const requestButton = (
      <Button
        size="large"
        icon="cloud-download-o"
        loading={this.state.isRequesting}
        onClick={this.request}
        disabled={!this.state.URL}
      >
        请求
      </Button>
    )
    const runButton = (
      <Button
        type="primary"
        size="large"
        icon="play-circle-o"
        loading={this.state.isTesting}
        className="run"
        onClick={this.test}
        disabled={this.state.requestResult && !('body' in this.state.requestResult)}
      >
        运行
      </Button>
    )

    const { requestResult } = this.state

    return (
      <Form>
        <Row type="flex" justify="space-between" align="top">
          <Col span={16} className="line">
            <b>{this.state.method}</b> {this.state.URL}
          </Col>
          <Col span={4}>
            <Item style={{ marginBottom: 0 }}>
              {getFieldDecorator('readType', {
                initialValue: scout.readType || 'text',
              })(<Select onChange={(readType: string) => { this.setState({ readType }) }}>
                <Option value="text">text</Option>
                <Option value="json">json</Option>
              </Select>)}
            </Item>
          </Col>
          {this.state.URL ? requestButton : <Tooltip title="请填写 URL">{requestButton}</Tooltip>}
        </Row>

        {this.getRequestOutput()}

        <Tooltip title={<code>body</code>}>
          <pre className="pre" dangerouslySetInnerHTML={{ __html: toHtml(requestResult!.beautifiedBody) }} />
        </Tooltip>

        <Item label="条件" style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
          {getFieldDecorator('testCase', {
            initialValue: scout.testCase,
          })(<CodeEditor />)}
          {requestResult!.status === 'OK' ? runButton : <Tooltip title="请执行一次成功的请求">{runButton}</Tooltip>}
        </Item>

        <div className="flexline">
          <span key={this.state.testTime} className={classnames('fadein', 'line')}>
            {this.getTestOutput()}
          </span>
          <a onClick={this.toggleConsole}>
            <Icon type={this.state.isConsoleVisible ? 'up' : 'down'} /> 控制台日志
          </a>
        </div>

        <ul className="console" style={{ display: this.state.isConsoleVisible ? 'block' : 'none' }}>
          {this.state.testResult.logs.map(log => (
            <li>
              <pre dangerouslySetInnerHTML={{ __html: toHtml(log) }} />
            </li>
          ))}
        </ul>
      </Form>
    )
  }
}
