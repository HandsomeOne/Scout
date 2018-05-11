import * as React from 'react'
import { Input, Button, Row, Col } from 'antd'

interface P {
  value?: string[][]
  onChange?: (...args: any[]) => any
  disabled?: boolean
}

export default class HTTPHeaders extends React.Component<P> {
  static defaultProps = {
    value: [],
    onChange: (e: any) => e,
  }

  state = {
    headers: this.props.value || [],
  }

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      headers: nextProps.value,
    })
  }
  update(e: any, i: number, j: number) {
    this.state.headers[i][j] = e.target.value
    this.props.onChange!(this.state.headers)
  }
  add = () => {
    this.props.onChange!(this.state.headers.concat([[]]))
  }
  del(i: number) {
    this.state.headers.splice(i, 1)
    this.props.onChange!(this.state.headers)
  }

  render() {
    const { Group } = Input
    return (
      <Group size="large">
        {this.state.headers.map((header, i) => (
          <Row
            type="flex"
            justify="space-between"
            style={{ marginBottom: '8px' }}
            key={i}
          >
            <Col span={8}>
              <Input
                placeholder="键"
                value={header[0]}
                onChange={e => {
                  this.update(e, i, 0)
                }}
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="值"
                value={header[1]}
                onChange={e => {
                  this.update(e, i, 1)
                }}
              />
            </Col>
            <Button
              type="ghost"
              icon="delete"
              onClick={() => {
                this.del(i)
              }}
            >
              删除
            </Button>
          </Row>
        ))}
        <Button
          type="dashed"
          size="large"
          icon="plus"
          onClick={this.add}
          disabled={this.props.disabled}
          style={{ width: '100%' }}
        >
          添加请求头
        </Button>
      </Group>
    )
  }
}
