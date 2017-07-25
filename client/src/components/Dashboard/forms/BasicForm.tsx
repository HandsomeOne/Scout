import * as React from 'react'
import { Form, Input, Select, Row, Col } from 'antd'
import PrefixedURL from './custom/PrefixedURL'

interface P {
  form: {
    getFieldDecorator: (...args: any[]) => any
    getFieldValue: (...args: any[]) => any
  }
  allTags: string[],
  allRecipients: string[],
  scout: {
    URL: string,
    name: string,
    tags: string[],
    method: string,
    recipients: string[]
    body: string
  }
}

export default function BasicForm(props: P) {
  const { scout, form } = props
  const { getFieldDecorator, getFieldValue } = form

  const { Option } = Select
  const { Item } = Form

  const hasBody = ['POST'].includes(getFieldValue('method'))
  return (
    <Form>
      <Row gutter={16}>
        <Col span={8}>
          <Item label="名称" >
            {getFieldDecorator('name', {
              initialValue: scout.name,
              rules: [{ required: true, whitespace: true }],
            })(<Input />)}
          </Item>
        </Col>

        <Col span={16}>
          <Item label="标签" >
            {getFieldDecorator('tags', {
              initialValue: scout.tags,
            })(<Select mode="tags" tokenSeparators={[',', ' ']}>
              {props.allTags.map(tag => <Option key={tag}>{tag}</Option>)}
            </Select>)}
          </Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={4}>
          <Item label="方法" >
            {getFieldDecorator('method', {
              initialValue: scout.method || 'GET',
            })(<Select>
              <Option value="GET">GET</Option>
              <Option value="HEAD">HEAD</Option>
              <Option value="POST">POST</Option>
            </Select>)}
          </Item>
        </Col>

        <Col span={20}>
          <Item label="URL" >
            {getFieldDecorator('URL', {
              initialValue: scout.URL,
              rules: [{ type: 'url' }],
            })(<PrefixedURL />)}
          </Item>
        </Col>
      </Row>

      <Item label="请求主体">
        {getFieldDecorator('body', {
          initialValue: scout.body,
        })(<Input.TextArea rows={4} disabled={!hasBody} />)}
      </Item>

      <Item label="告警接收人" >
        {getFieldDecorator('recipients', {
          initialValue: scout.recipients,
        })(<Select mode="tags" tokenSeparators={[',', ' ']}>
          {props.allRecipients.map(recipient => <Option key={recipient}>{recipient}</Option>)}
        </Select>)}
      </Item>
    </Form>
  )
}
