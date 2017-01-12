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
    this.handleChange = this.handleChange.bind(this)
  }
  handleVisibleChange(visible) {
    this.setState({ visible })
  }
  handleChange(tag, checked) {
    const ids = this.props.scouts
                .filter(scout => scout.tags.includes(tag))
                .map(scout => scout.id)
    if (checked) {
      this.props.handleSelectChange([...new Set(this.props.selectedScouts.concat(ids))])
    } else {
      this.props.handleSelectChange(this.props.selectedScouts.filter(id => !ids.includes(id)))
    }
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
                onChange={(e) => {
                  this.handleChange(tag, e.target.checked)
                }}
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
  handleSelectChange: T.func,
}
