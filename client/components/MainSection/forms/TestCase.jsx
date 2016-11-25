import React, { Component, PropTypes as T } from 'react'
import { Form, Select, Button, Row, Col, Icon, Tooltip } from 'antd'
import { ansi_to_html as __toHtml } from 'ansi_up'
import CodeEditor from './custom/CodeEditor'
import { origin } from '../../../config'
import $ from './TestCase.css'

function toHtml(s) {
  return __toHtml(
    s.replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;'),
  )
}

export default class TestCase extends Component {
  constructor(props) {
    super(props)
    const { getFieldValue } = props.form
    this.state = {
      method: getFieldValue('method'),
      URL: getFieldValue('URL'),
      body: getFieldValue('body'),
      headers: getFieldValue('headers'),
      readType: props.scout.readType || 'text',
      requestResult: {},
      testResult: {
        logs: [],
      },
      isConsoleVisible: false,
    }
    this.request = this.request.bind(this)
    this.test = this.test.bind(this)
    this.toggleConsole = this.toggleConsole.bind(this)
  }
  getOutput() {
    const result = this.state.testResult
    switch (result.status) {
      case 'OK':
        return <span style={{ color: '#60BE29' }}>OK</span>
      case 'Error':
        return <span style={{ color: '#E01515' }}>{result.name}: {result.message}</span>
      default:
        return ''
    }
  }
  resetRequest() {
    const { getFieldValue } = this.props.form
    this.setState({
      method: getFieldValue('method'),
      URL: getFieldValue('URL'),
      body: getFieldValue('body'),
      headers: getFieldValue('headers'),
    })
  }
  request() {
    fetch(`${origin}/request`, {
      method: 'POST',
      body: JSON.stringify({
        method: this.state.method,
        URL: this.state.URL,
        body: this.state.body,
        headers: this.state.headers,
        readType: this.state.readType,
      }),
    }).then(res => res.json())
      .then((requestResult) => { this.setState({ requestResult }) })
  }
  test() {
    fetch(`${origin}/test`, {
      method: 'POST',
      body: JSON.stringify({
        body: this.state.requestResult.body,
        testCase: this.props.form.getFieldValue('testCase'),
      }),
    }).then(res => res.json())
      .then((testResult) => { this.setState({ testResult }) })
  }
  toggleConsole() {
    this.setState({
      isConsoleVisible: !this.state.isConsoleVisible,
    })
  }
  render() {
    const { scout = Object.create(null), form } = this.props
    const { getFieldDecorator } = form

    const { Item } = Form
    const { Option } = Select
    return (<Form>
      <Row type="flex" justify="space-between" align="top">
        <Col span={16} style={{ lineHeight: '32px' }}>
          <b>{this.state.method}</b> {this.state.URL}
        </Col>
        <Col span={4}>
          <Item>
            {getFieldDecorator('readType', {
              initialValue: scout.readType || 'text',
            })(<Select onChange={(readType) => { this.setState({ readType }) }}>
              <Option value="text">text</Option>
              <Option value="json">json</Option>
            </Select>)}
          </Item>
        </Col>
        <Button
          size="large"
          icon="cloud-download-o"
          onClick={this.request}
          disabled={!this.state.URL}
        >请求</Button>
      </Row>

      <pre className={$.pre} dangerouslySetInnerHTML={{ __html: toHtml(this.state.requestResult.beautifiedBody || '') }} />

      <Item label="条件" style={{ marginBottom: 0 }}>
        {getFieldDecorator('testCase', {
          initialValue: scout.testCase,
        })(<CodeEditor />)}
        <Tooltip title={'body' in this.state.requestResult || '请至少执行一次请求'}>
          <Button
            type="primary"
            size="large"
            icon="play-circle-o"
            className={$.run}
            onClick={this.test}
            disabled={!('body' in this.state.requestResult)}
          >运行</Button>
        </Tooltip>
      </Item>

      <p style={{ lineHeight: '32px', overflow: 'hidden' }}>
        {this.getOutput()}
        <a style={{ float: 'right' }} onClick={this.toggleConsole}>
          <Icon type={this.state.isConsoleVisible ? 'up' : 'down'} /> 控制台日志
        </a>
      </p>

      <ul className={$.console} style={{ display: this.state.isConsoleVisible ? 'block' : 'none' }}>
        {this.state.testResult.logs.map((log, i) => (
          <li key={i}>
            <pre dangerouslySetInnerHTML={{ __html: toHtml(log || '') }} />
          </li>
        ))}
      </ul>
    </Form>)
  }
}

TestCase.propTypes = {
  form: T.shape({
    getFieldDecorator: T.func,
    getFieldValue: T.func,
  }),
  scout: T.shape({
    readType: T.string,
    testCase: T.string,
  }).isRequired,
}
TestCase.defaultProps = {
  scout: {},
}
