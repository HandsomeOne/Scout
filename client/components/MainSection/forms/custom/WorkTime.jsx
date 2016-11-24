import React, { Component, PropTypes as T } from 'react'
import { Cascader, Button, Icon, Row, Col } from 'antd'
import WorkTimeChart from './WorkTimeChart'

const minutes = new Array(60).fill().map((_, i) => ({
  value: i,
  label: `${i < 10 ? '0' : ''}${i}分`,
}))
const time = new Array(24).fill().map((_, i) => ({
  value: i,
  label: `${i < 10 ? '0' : ''}${i}时`,
  children: minutes,
}))
const options = [
  { value: 0, label: '星期天', children: time },
  { value: 1, label: '星期一', children: time },
  { value: 2, label: '星期二', children: time },
  { value: 3, label: '星期三', children: time },
  { value: 4, label: '星期四', children: time },
  { value: 5, label: '星期五', children: time },
  { value: 6, label: '星期六', children: time },
]

const displayRenderFactory = (descriptor, label) => {
  if (label && label.length) {
    const [week, hour, minute] = label
    return `${descriptor}${week}的${hour}${minute}`
  }
  return ''
}
const displayRenderFrom = displayRenderFactory.bind(null, '从')
const displayRenderTo = displayRenderFactory.bind(null, '至')

export default class WorkTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workTime: props.value,
    }
    this.add = this.add.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      workTime: nextProps.value,
    })
  }
  update(value, i, j) {
    this.state.workTime[i][j] = value
    this.props.onChange(this.state.workTime)
  }
  add() {
    this.props.onChange(this.state.workTime.concat([[]]))
  }
  del(i) {
    this.state.workTime.splice(i, 1)
    this.props.onChange(this.state.workTime)
  }
  render() {
    const CascaderProps = {
      size: 'large',
      allowClear: false,
      expandTrigger: 'hover',
      options,
    }
    return (<div>
      <WorkTimeChart workTime={this.state.workTime} />
      {this.state.workTime.map((range, i) =>
        <Row key={i} type="flex" justify="space-between" style={{ marginBottom: '8px' }}>
          <Col span={10}>
            <Cascader
              {...CascaderProps}
              placeholder="从"
              displayRender={displayRenderFrom}
              onChange={(value) => { this.update(value, i, 0) }}
            />
          </Col>
          <Col span={10}>
            <Cascader
              {...CascaderProps}
              placeholder="至"
              displayRender={displayRenderTo}
              onChange={(value) => { this.update(value, i, 1) }}
            />
          </Col>
          <Button type="ghost" onClick={() => { this.del(i) }}>
            <Icon type="delete" />删除
          </Button>
        </Row>)}
      <Button type="dashed" size="large" onClick={this.add} style={{ width: '100%' }}>
        <Icon type="plus" />添加时间段
      </Button>
    </div>)
  }
}

WorkTime.propTypes = {
  value: T.arrayOf(T.arrayOf(T.arrayOf(T.number))).isRequired,
  onChange: T.func.isRequired,
}
WorkTime.defaultProps = {
  value: [],
  onChange: e => e,
}
