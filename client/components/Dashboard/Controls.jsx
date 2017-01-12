import React, { PropTypes as T } from 'react'
import { Button, Icon } from 'antd'
import TagFilter from './TagFilter'
import OriginFilter from './OriginFilter'
import $ from './Controls.css'

export default function Controls(props) {
  return (
    <div style={{ padding: '16px 0' }}>
      { props.selectable ?
        <Button
          size="large"
          onClick={props.deselect}
        ><Icon type="close" />取消</Button> :
        <Button
          size="large"
          onClick={props.select}
        ><Icon type="select" />多选</Button> }
      <div
        className={$.multi}
        style={{ display: props.selectable ? 'inline-block' : 'none' }}
      >
        <TagFilter
          scouts={props.scouts}
          selectedScouts={props.selectedScouts}
          handleSelectChange={props.handleSelectChange}
        />
        <OriginFilter
          scouts={props.scouts.map(scout => ({
            id: scout.id,
            origin: new URL(scout.URL).origin,
          }))}
          selectedScouts={props.selectedScouts}
          handleSelectChange={props.handleSelectChange}
        />
        <span>已选择 {props.selectedScouts.length} 项</span>
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => { props.openModal() }}
        style={{ float: 'right' }}
      ><Icon type="plus" />添加</Button>
    </div>
  )
}

Controls.propTypes = {
  scouts: T.arrayOf(T.shape()),
  selectedScouts: T.arrayOf(T.string),
  selectable: T.bool,
  openModal: T.func,
  select: T.func,
  deselect: T.func,
  handleSelectChange: T.func,
}
