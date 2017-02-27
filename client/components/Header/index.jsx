import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

export default function (props) {
  return (
    <Layout.Header>
      <Menu {...props} mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
        <Menu.Item key="dashboard">
          <Link to="/"><Icon type="bars" />仪表盘</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings"><Icon type="setting" />设置</Link>
        </Menu.Item>
        <Menu.Item key="alertlog">
          <Link to="/alertlog"><Icon type="exception" />告警记录</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}
