import React from 'react'
import { Form, Tabs } from 'antd'
import BasicForm from './forms/BasicForm'
import AdvancedForm from './forms/AdvancedForm'
import TestCase from './forms/TestCase'

function ScoutForm(props) {
  const { TabPane } = Tabs
  let testCase
  return (<Tabs defaultActiveKey="basic" onChange={() => { testCase.reset() }}>
    <TabPane tab="基本信息" key="basic"><BasicForm {...props} /></TabPane>
    <TabPane tab="高级设置" key="advanced"><AdvancedForm {...props} /></TabPane>
    <TabPane tab="测试用例" key="testCase">
      <TestCase {...props} ref={(e) => { testCase = e }} />
    </TabPane>
  </Tabs>)
}

export default Form.create()(ScoutForm)
