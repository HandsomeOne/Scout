import React, { PropTypes as T } from 'react'
import { Form, InputNumber, Row, Col, Slider, Select } from 'antd'
import HTTPHeaders from './forms/custom/HTTPHeaders'
import WorkTime from './forms/custom/WorkTime'
import formatTinyTime from '../../utils/formatTinyTime'

function MultiForm(props) {
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
        })(<Select tags notFoundContent="空">
          <Option key="tags">标签</Option>
          <Option key="recipients">报警接收人</Option>
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
            })(<Select tags notFoundContent="空" disabled={!fields.includes('tags')}>
              {props.allTags.map(tag => <Option key={tag}>{tag}</Option>)}
            </Select>)}
          </Item>
        </Col>

        <Col span={16}>
          <Item label="报警接收人" >
            {getFieldDecorator('recipients', {
              initialValue: [],
            })(<Select tags notFoundContent="空" disabled={!fields.includes('recipients')}>
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
            })(<Slider min={100} max={2000} step={100} tipFormatter={formatTinyTime} disabled={!fields.includes('ApdexTarget')} />)}
          </Item>
        </Col>
      </Row>

      <Item label="请求头">
        {getFieldDecorator('headers', {
          initialValue: [],
        })(<HTTPHeaders disabled={!fields.includes('headers')} />)}
      </Item>

      <Item label="活跃时间段" extra="若不指定时间段，默认为 7×24">
        {getFieldDecorator('workTime', {
          initialValue: [],
        })(<WorkTime disabled={!fields.includes('workTime')} />)}
      </Item>
    </Form>
  )
}

MultiForm.propTypes = {
  form: T.shape(),
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
}

export default Form.create()(MultiForm)
