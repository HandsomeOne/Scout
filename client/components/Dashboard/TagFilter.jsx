import React, { Component, PropTypes as T } from 'react'
import { Menu, Dropdown, Icon, Checkbox } from 'antd'

export default class TagFilter extends Component {
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
        this.props.allTags.length ?
        this.props.allTags.map(tag => (
          <Menu.Item key={tag}>
            <Checkbox>{tag}</Checkbox>
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
      ><a><Icon type="filter" />按标签</a></Dropdown>
    )
  }
}

TagFilter.propTypes = {
  allTags: T.arrayOf(T.string),
}
