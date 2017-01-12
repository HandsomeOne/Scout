import React, { Component, PropTypes as T } from 'react'
import { Input, Button, Row, Col } from 'antd'

export default class HTTPHeaders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: props.value,
    }
    this.add = this.add.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      headers: nextProps.value,
    })
  }
  update(e, i, j) {
    this.state.headers[i][j] = e.target.value
    this.props.onChange(this.state.headers)
  }
  add() {
    this.props.onChange(this.state.headers.concat([[]]))
  }
  del(i) {
    this.state.headers.splice(i, 1)
    this.props.onChange(this.state.headers)
  }
  render() {
    const { Group } = Input
    return (<Group size="large">
      {this.state.headers.map((header, i) =>
        <Row key={i} type="flex" justify="space-between" style={{ marginBottom: '8px' }}>
          <Col span={8}>
            <Input
              placeholder="键"
              value={header[0]}
              onChange={(e) => { this.update(e, i, 0) }}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="值"
              value={header[1]}
              onChange={(e) => { this.update(e, i, 1) }}
            />
          </Col>
          <Button
            type="ghost"
            icon="delete"
            onClick={() => { this.del(i) }}
          >删除</Button>
        </Row>)}
      <Button
        type="dashed"
        size="large"
        icon="plus"
        onClick={this.add}
        disabled={this.props.disabled}
        style={{ width: '100%' }}
      >添加请求头</Button>
    </Group>)
  }
}

HTTPHeaders.propTypes = {
  value: T.arrayOf(T.arrayOf(T.string)).isRequired,
  onChange: T.func.isRequired,
  disabled: T.bool,
}
HTTPHeaders.defaultProps = {
  value: [],
  onChange: e => e,
}
