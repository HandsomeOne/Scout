import React, { Component, PropTypes as T } from 'react'
import { Menu, Dropdown, Icon, Checkbox } from 'antd'

export default class OriginFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }
  handleVisibleChange(visible) {
    this.setState({ visible })
  }
  render() {
    const menu = (
      <Menu>{
        this.props.allOrigins.length ?
        this.props.allOrigins.map(origin => (
          <Menu.Item key={origin}>
            <Checkbox>{origin}</Checkbox>
          </Menu.Item>
        )) :
        <Menu.Item key="none">无</Menu.Item>
      }</Menu>
    )
    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      ><a><Icon type="filter" />按源</a></Dropdown>
    )
  }
}

OriginFilter.propTypes = {
  allOrigins: T.arrayOf(T.string),
}
