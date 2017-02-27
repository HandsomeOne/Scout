import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

export default function () {
  return (
    <Layout.Header>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="dashboard">
          <NavLink to="/"><Icon type="bars" />仪表盘</NavLink>
        </Menu.Item>
        <Menu.Item key="settings">
          <NavLink to="/settings"><Icon type="setting" />设置</NavLink>
        </Menu.Item>
        <Menu.Item key="alertlog">
          <NavLink to="/alertlog"><Icon type="exception" />告警记录</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}
