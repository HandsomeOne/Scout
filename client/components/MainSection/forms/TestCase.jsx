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
    }
    this.request = this.request.bind(this)
    this.test = this.test.bind(this)
  }
  componentDidMount() {
    this.request()
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
      .then((resBody) => { this.setState({ resBody }) })
  }
  test() {
    fetch(`${origin}/test`, {
      method: 'POST',
      body: JSON.stringify({
        body: this.state.resBody,
        testCase: this.props.form.getFieldValue('testCase'),
      }),
    }).then(res => res.json())
      .then((result) => { this.setState({ result }) })
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

      <pre className={$.pre}>{
        typeof this.state.body === 'string' ?
          this.state.resBody :
          JSON.stringify(this.state.resBody, true, 2)
      }</pre>

      <Item label="条件">
        {getFieldDecorator('testCase', {
          initialValue: scout.testCase,
        })(<CodeEditor />)}
      </Item>

      <Row type="flex" justify="space-between" align="top">
        <Col
          span={20}
          style={{
            lineHeight: '32px',
            color: this.state.result === 'OK' ? '#60BE29' : '#E01515',
          }}
        >
          {this.state.result}
        </Col>
        <Button onClick={this.test} size="large">
          <Icon type="play-circle-o" />运行
        </Button>
      </Row>
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
