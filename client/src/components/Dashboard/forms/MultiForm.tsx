import * as React from 'react'
import { Form, InputNumber, Row, Col, Slider, Select } from 'antd'
import HTTPHeaders from './custom/HTTPHeaders'
import WorkTime from './custom/WorkTime'
import { formatTinyTime } from '../../../utils'

interface P {
  form: any,
  allTags: string[],
  allRecipients: string[],
}

function MultiForm(props: P) {
  const { form } = props
  const { getFieldDecorator, getFieldValue } = form
  const fields = getFieldValue('fields') || []

  const { Item } = Form
  const { Option } = Select
  return (
    <Form>
      <Item label="需要修改的字段">
        {getFieldDecorator('fields', {
          initialValue: [],
        })(<Select mode="tags" tokenSeparators={[',', ' ']}>
          <Option key="tags">标签</Option>
          <Option key="recipients">告警接收人</Option>
          <Option key="interval">检测时间间隔/min</Option>
          <Option key="tolerance">异常容忍次数</Option>
          <Option key="ApdexTarget">Apdex 目标响应时间</Option>
          <Option key="headers">请求头</Option>
          <Option key="workTime">活跃时间段</Option>
        </Select>)}
      </Item>

      <Row gutter={16}>
        <Col span={8}>
          <Item label="标签">
            {getFieldDecorator('tags', {
              initialValue: [],
            })(<Select
              mode="tags"
              disabled={!fields.includes('tags')}
              tokenSeparators={[',', ' ']}
            >
              {props.allTags.map(tag => <Option key={tag}>{tag}</Option>)}
            </Select>)}
          </Item>
        </Col>

        <Col span={16}>
          <Item label="告警接收人" >
            {getFieldDecorator('recipients', {
              initialValue: [],
            })(<Select
              mode="tags"
              disabled={!fields.includes('recipients')}
              tokenSeparators={[',', ' ']}
            >
              {props.allRecipients.map(recipient => <Option key={recipient}>{recipient}</Option>)}
            </Select>)}
          </Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Item label="检测时间间隔/min" >
            {getFieldDecorator('interval', {
              initialValue: 5,
            })(<InputNumber min={1} max={30} disabled={!fields.includes('interval')} />)}
          </Item>
        </Col>

        <Col span={6}>
          <Item label="异常容忍次数" >
            {getFieldDecorator('tolerance', {
              initialValue: 0,
            })(<InputNumber min={0} max={10} disabled={!fields.includes('tolerance')} />)}
          </Item>
        </Col>

        <Col span={12}>
          <Item label="Apdex 目标响应时间">
            {getFieldDecorator('ApdexTarget', {
              initialValue: 500,
            })(<Slider
              min={100}
              max={2000}
              step={100}
              tipFormatter={formatTinyTime}
              disabled={!fields.includes('ApdexTarget')}
            />)}
          </Item>
        </Col>
      </Row>

      <Item label="请求头">
        {getFieldDecorator('headers', {
          initialValue: [],
          rules: [{
            message: '请求头不应该含有空项',
            validator: (rules: any, value: any, callback: any) => {
              if (value && value.some((header: any) => !(
                header[0] && header[0].trim() && header[1] && header[1].trim()
              ))) {
                callback(new Error())
              } else {
                callback()
              }
            },
          }],
        })(<HTTPHeaders disabled={!fields.includes('headers')} />)}
      </Item>

      <Item label="活跃时间段" extra="若不指定时间段，默认为 7×24">
        {getFieldDecorator('workTime', {
          initialValue: [],
          rules: [{
            message: '活跃时间段不应该含有空项',
            validator: (rules: any, value: any, callback: any) => {
              if (value && value.some((header: any) => !(
                header[0] && header[0].length && header[1] && header[1].length
              ))) {
                callback(new Error())
              } else {
                callback()
              }
            },
          }],
        })(<WorkTime disabled={!fields.includes('workTime')} />)}
      </Item>
    </Form>
  )
}

export default Form.create()(MultiForm as any) as any
