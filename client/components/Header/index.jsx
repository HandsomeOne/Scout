import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router'

export default function (props) {
  return (
    <Menu
      {...props}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="scout">
        <Link to="/">管理监控条目</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">设置</Link>
      </Menu.Item>
    </Menu>
  )
}
