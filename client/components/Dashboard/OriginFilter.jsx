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
    const scoutsWithOrigin = this.props.scouts.map(scout => ({
      id: scout.id,
      origin: new URL(scout.URL).origin,
    }))
    const allOrigins = [...new Set(scoutsWithOrigin.map(scout => scout.origin))]
    const menu = (
      <Menu>{
        allOrigins.length ?
        allOrigins.map((origin) => {
          const scouts = scoutsWithOrigin.filter(
            scout => scout.origin === origin)
          const selectedScouts = scouts.filter(
            scout => this.props.selectedScouts.includes(scout.id))
          return (
            <Menu.Item key={origin}>
              <Checkbox
                checked={scouts.length === selectedScouts.length}
                indeterminate={selectedScouts.length && selectedScouts.length < scouts.length}
              >{origin}</Checkbox>
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
      ><a><Icon type="filter" />按源</a></Dropdown>
    )
  }
}

OriginFilter.propTypes = {
  scouts: T.arrayOf(T.shape()),
  selectedScouts: T.arrayOf(T.string),
}
