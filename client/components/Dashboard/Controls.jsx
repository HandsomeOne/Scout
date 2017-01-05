import React, { PropTypes as T } from 'react'
import { Button, Icon } from 'antd'
import $ from './Controls.css'

export default function Controls(props) {
  return (
    <div style={{ padding: '16px 0' }}>
      <Button
        size="large"
        onClick={props.select}
      ><Icon type="select" />多选</Button>
      <div
        className={$.multi}
        style={{ display: props.selectable ? 'inline-block' : 'none' }}
      >
        <Button
          size="large"
          onClick={props.unselect}
        ><Icon type="close" />取消</Button>
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
  selectable: T.bool,
  openModal: T.func,
  select: T.func,
  unselect: T.func,
}
