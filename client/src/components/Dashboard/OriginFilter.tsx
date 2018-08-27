import * as React from 'react'
import { Menu, Dropdown, Icon, Checkbox } from 'antd'
import { union, uniq } from 'lodash'

interface P {
  scouts: any[]
  selectedScouts: string[]
  handleSelectChange: (...args: any[]) => any
}

export default class OriginFilter extends React.Component<P> {
  state = {
    visible: false,
  }
  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible })
  }
  handleChange = (origin: string, checked: boolean) => {
    const ids = this.props.scouts
      .filter(scout => scout.origin === origin)
      .map(scout => scout.id)
    if (checked) {
      this.props.handleSelectChange(union(this.props.selectedScouts, ids))
    } else {
      this.props.handleSelectChange(
        this.props.selectedScouts.filter(id => !ids.includes(id)),
      )
    }
  }
  render() {
    const allOrigins = uniq(this.props.scouts.map(scout => scout.origin))
    const menu = (
      <Menu>
        {allOrigins.length ? (
          allOrigins.map(origin => {
            const scouts = this.props.scouts.filter(
              scout => scout.origin === origin,
            )
            const selectedScouts = scouts.filter(scout =>
              this.props.selectedScouts.includes(scout.id),
            )
            return (
              <Menu.Item key={origin}>
                <Checkbox
                  onChange={(e: any) => {
                    this.handleChange(origin, e.target.checked)
                  }}
                  checked={scouts.length === selectedScouts.length}
                  indeterminate={
                    !!selectedScouts.length &&
                    selectedScouts.length < scouts.length
                  }
                >
                  {origin}
                </Checkbox>
              </Menu.Item>
            )
          })
        ) : (
          <Menu.Item key="none">无</Menu.Item>
        )}
      </Menu>
    )
    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a>
          <Icon type="filter" />
          按源
        </a>
      </Dropdown>
    )
  }
}
