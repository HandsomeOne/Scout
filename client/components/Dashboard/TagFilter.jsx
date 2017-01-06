import React, { Component, PropTypes as T } from 'react'
import { Menu, Dropdown, Icon, Checkbox } from 'antd'
import union from '../../utils/union'

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
    const allTags = union(this.props.scouts.map(scout => scout.tags))
    const menu = (
      <Menu>{
        allTags.length ?
        allTags.map((tag) => {
          const scouts = this.props.scouts.filter(
            scout => scout.tags.includes(tag))
          const selectedScouts = scouts.filter(
            scout => this.props.selectedScouts.includes(scout.id))
          return (
            <Menu.Item key={tag}>
              <Checkbox
                checked={scouts.length === selectedScouts.length}
                indeterminate={selectedScouts.length && selectedScouts.length < scouts.length}
              >{tag}</Checkbox>
            </Menu.Item>
          )
        }) :
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
  scouts: T.arrayOf(T.shape()),
  selectedScouts: T.arrayOf(T.string),
}
