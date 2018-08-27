import * as React from 'react'
import { Menu, Dropdown, Icon, Checkbox } from 'antd'
import { union } from 'lodash'

interface P {
  scouts: any[]
  selectedScouts: string[]
  handleSelectChange: (...args: any[]) => any
}

export default class TagFilter extends React.Component<P> {
  state = {
    visible: false,
  }
  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible })
  }
  handleChange = (tag: string, checked: boolean) => {
    const ids = this.props.scouts
      .filter(scout => scout.tags.includes(tag))
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
    const allTags = union(this.props.scouts.map(scout => scout.tags))
    const menu = (
      <Menu>
        {allTags.length ? (
          allTags.map(tag => {
            const scouts = this.props.scouts.filter(scout =>
              scout.tags.includes(tag),
            )
            const selectedScouts = scouts.filter(scout =>
              this.props.selectedScouts.includes(scout.id),
            )
            return (
              <Menu.Item key={tag}>
                <Checkbox
                  onChange={(e: any) => {
                    this.handleChange(tag, e.target.checked)
                  }}
                  checked={scouts.length === selectedScouts.length}
                  indeterminate={
                    !!selectedScouts.length &&
                    selectedScouts.length < scouts.length
                  }
                >
                  {tag}
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
          按标签
        </a>
      </Dropdown>
    )
  }
}
