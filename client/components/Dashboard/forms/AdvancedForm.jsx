import React, { PropTypes as T } from 'react'
import { Form, InputNumber, Row, Col, Slider } from 'antd'
import HTTPHeaders from './custom/HTTPHeaders'
import WorkTime from './custom/WorkTime'
import formatTinyTime from '../../../utils/formatTinyTime'

export default function AdvancedForm(props) {
  const { scout = Object.create(null), form } = props
  const { getFieldDecorator } = form

  const { Item } = Form
  return (<Form>
    <Row gutter={16}>
      <Col span={6}>
        <Item label="检测时间间隔/min" >
          {getFieldDecorator('interval', {
            initialValue: scout.interval || 5,
          })(<InputNumber min={1} max={30} />)}
        </Item>
      </Col>

      <Col span={6}>
        <Item label="异常容忍次数" >
          {getFieldDecorator('tolerance', {
            initialValue: scout.tolerance || 0,
          })(<InputNumber min={0} max={10} />)}
        </Item>
      </Col>

      <Col span={12}>
        <Item label="Apdex 目标响应时间">
          {getFieldDecorator('ApdexTarget', {
            initialValue: scout.ApdexTarget || 500,
          })(<Slider min={100} max={2000} step={100} tipFormatter={formatTinyTime} />)}
        </Item>
      </Col>
    </Row>

    <Item label="请求头">
      {getFieldDecorator('headers', {
        initialValue: scout.headers,
      })(<HTTPHeaders />)}
    </Item>

    <Item label="活跃时间段" extra="若不指定时间段，默认为 7×24">
      {getFieldDecorator('workTime', {
        initialValue: scout.workTime,
      })(<WorkTime />)}
    </Item>
  </Form>)
}

AdvancedForm.propTypes = {
  form: T.shape({
    getFieldDecorator: T.func,
  }),
  scout: T.shape({
    interval: T.number,
    tolerance: T.number,
    ApdexTarget: T.number,
    headers: T.arrayOf(T.arrayOf(T.string)),
    workTime: T.arrayOf(T.arrayOf(T.arrayOf(T.number))),
  }),
}
