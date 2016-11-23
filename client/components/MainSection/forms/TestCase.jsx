import React, { Component, PropTypes as T } from 'react'
import { Form, Select, Button, Row, Col, Icon } from 'antd'
import CodeEditor from './custom/CodeEditor'
import { origin } from '../../../config'
import $ from './TestCase.css'

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
      testResult: {
        logs: [],
      },
      isConsoleVisible: false,
    }
    this.request = this.request.bind(this)
    this.test = this.test.bind(this)
    this.toggleConsole = this.toggleConsole.bind(this)
  }
  componentDidMount() {
    this.request()
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
    }).then(res => res[this.state.readType]())
      .then((body) => {
        this.setState({
          resBody: body.body,
          beautifiedBody: body.beautifiedBody,
        })
      })
  }
  test() {
    fetch(`${origin}/test`, {
      method: 'POST',
      body: JSON.stringify({
        body: this.state.resBody,
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
        <Button onClick={this.request} size="large">
          <Icon type="cloud-download-o" />请求
        </Button>
      </Row>

      <pre className={$.pre}>{this.state.beautifiedBody}</pre>

      <Item label="条件" style={{ marginBottom: 0 }}>
        {getFieldDecorator('testCase', {
          initialValue: scout.testCase,
        })(<CodeEditor />)}
        <Button onClick={this.test} size="large" className={$.run} type="primary">
          <Icon type="play-circle-o" />运行
        </Button>
      </Item>

      <p style={{ lineHeight: '32px', overflow: 'hidden' }}>
        {this.getOutput()}
        <a style={{ float: 'right' }} onClick={this.toggleConsole}>
          <Icon type={this.state.isConsoleVisible ? 'up' : 'down'} /> 控制台
        </a>
      </p>

      <ul className={$.console} style={{ display: this.state.isConsoleVisible ? 'block' : 'none' }}>
        {this.state.testResult.logs.map(log => <li><pre>{log}</pre></li>)}
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
