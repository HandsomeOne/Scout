import React, { Component, PropTypes as T } from 'react'
import { Button, Icon } from 'antd'
import TagFilter from './TagFilter'
import OriginFilter from './OriginFilter'
import $ from './Controls.css'

export default class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }
  render() {
    return (
      <div style={{ padding: '16px 0' }}>
        { this.props.selectable ?
          <Button
            size="large"
            onClick={this.props.deselect}
          ><Icon type="close" />取消</Button> :
          <Button
            size="large"
            onClick={this.props.select}
          ><Icon type="select" />多选</Button> }
        <div
          className={$.multi}
          style={{ display: this.props.selectable ? 'inline-block' : 'none' }}
        >
          <Button
            size="large"
            type="primary"
            disabled={!this.props.selectedScouts.length}
            onClick={
              this.props.selectedScouts.length > 1 ?
              this.props.openMultiModal :
              () => { this.props.openModal(this.props.selectedScouts[0]) }
            }
          ><Icon type="edit" />编辑</Button>
          <TagFilter
            scouts={this.props.scouts}
            selectedScouts={this.props.selectedScouts}
            handleSelectChange={this.props.handleSelectChange}
          />
          <OriginFilter
            scouts={this.props.scouts.map(scout => ({
              id: scout.id,
              origin: new URL(scout.URL).origin,
            }))}
            selectedScouts={this.props.selectedScouts}
            handleSelectChange={this.props.handleSelectChange}
          />
          <span>已选择 {this.props.selectedScouts.length} 项</span>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => { this.props.openModal() }}
          style={{ float: 'right' }}
        ><Icon type="plus" />添加</Button>
      </div>
    )
  }
}

Controls.propTypes = {
  scouts: T.arrayOf(T.shape()),
  selectedScouts: T.arrayOf(T.string),
  selectable: T.bool,
  openModal: T.func,
  openMultiModal: T.func,
  select: T.func,
  deselect: T.func,
  handleSelectChange: T.func,
}
