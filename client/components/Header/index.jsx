import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import $ from './index.css'

export default function (props) {
  return (
    <div className={$.menu}>
      <Menu {...props} mode="horizontal" theme="dark">
        <Menu.Item key="dashboard">
          <Link to="/"><Icon type="bars" />仪表盘</Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings"><Icon type="setting" />设置</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
