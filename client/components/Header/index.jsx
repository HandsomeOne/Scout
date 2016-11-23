import React from 'react'
import { Menu } from 'antd'

function Header() {
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={['scout']}
    >
      <Menu.Item key="scout">
        <a href="#/">管理监控条目</a>
      </Menu.Item>
    </Menu>
  )
}

export default Header
