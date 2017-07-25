import * as React from 'react'
import { Form, InputNumber, Row, Col, Slider } from 'antd'
import HTTPHeaders from './custom/HTTPHeaders'
import WorkTime from './custom/WorkTime'
import { formatTinyTime } from '../../../utils'

interface P {
  form: {
    getFieldDecorator: (...args: any[]) => any
  }
  scout: {
    interval: number
    tolerance: number
    ApdexTarget: number
    headers: string[][]
    workTime: number[][][]
  }
}

export default function AdvancedForm(props: P) {
  const { scout, form } = props
  const { getFieldDecorator } = form

  const { Item } = Form
  return (
    <Form>
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
          <Item label="Apdex 目标响应时间" wrapperCol={{ span: 24 }}>
            {getFieldDecorator('ApdexTarget', {
              initialValue: scout.ApdexTarget || 500,
            })(<Slider min={100} max={2000} step={100} tipFormatter={formatTinyTime} />)}
          </Item>
        </Col>
      </Row>

      <Item label="请求头">
        {getFieldDecorator('headers', {
          initialValue: scout.headers,
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
        })(<HTTPHeaders />)}
      </Item>

      <Item label="活跃时间段" extra="若不指定时间段，默认为 7×24">
        {getFieldDecorator('workTime', {
          initialValue: scout.workTime,
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
        })(<WorkTime />)}
      </Item>
    </Form>
  )
}
