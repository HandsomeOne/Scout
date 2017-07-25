import * as React from 'react'
import { Button, Icon } from 'antd'
import TagFilter from './TagFilter'
import OriginFilter from './OriginFilter'
import './Controls.css'

interface P {
  scouts: any[],
  selectedScouts: string[],
  selectable: boolean,
  openModal: (...args: any[]) => any,
  openMultiModal: (...args: any[]) => any,
  select: (...args: any[]) => any,
  deselect: (...args: any[]) => any,
  handleSelectChange: (...args: any[]) => any,
}

export default class Controls extends React.Component<P> {
  render() {
    return (
      <div style={{ padding: '16px 0' }}>
        {this.props.selectable ?
          <Button size="large" onClick={this.props.deselect}>
            <Icon type="close" />取消
          </Button> :
          <Button size="large" onClick={this.props.select} >
            <Icon type="select" />多选
          </Button>}
        <div
          className="multi"
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
          >
            <Icon type="edit" />编辑
          </Button>
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
        >
          <Icon type="plus" />添加
        </Button>
      </div>
    )
  }
}
