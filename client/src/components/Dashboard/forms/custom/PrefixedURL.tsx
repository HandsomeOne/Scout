import * as React from 'react'
import { Input, Select } from 'antd'

const protocols = ['http:', 'https:']
function parse(value: string) {
  let protocol = 'http:'
  let url = value.trim()
  let mayFind = true

  function find(_protocol: string) {
    if (url.indexOf(`${_protocol}//`) === 0) {
      protocol = _protocol
      url = url.slice(_protocol.length + 2)
      mayFind = true
    }
  }
  while (mayFind) {
    mayFind = false
    protocols.forEach(find)
  }
  return { protocol, url }
}

function stringify({ protocol, url }: { protocol: string, url: string }) {
  const parsed = parse(`${protocol}//${url}`)
  return `${parsed.protocol}//${parsed.url}`
}

interface P {
  value?: string,
  onChange?: (...args: any[]) => any,
  disabled?: boolean,
}

export default class PrefixedURL extends React.Component<P> {
  static defaultProps = {
    value: '',
    onChange: (e: any) => e,
  }
  state = parse(this.props.value!)

  componentWillReceiveProps(nextProps: P) {
    this.setState(parse(nextProps.value!))
  }
  onSelect = (value: string) => {
    this.state.protocol = value
    this.props.onChange!(stringify(this.state))
  }
  onChange = (e: any) => {
    this.state.url = e.target.value
    this.props.onChange!(stringify(this.state))
  }
  render() {
    const { Option } = Select
    const protocol = (
      <Select
        size="large"
        onChange={this.onSelect}
        value={this.state.protocol}
        style={{ width: 75 }}
      >
        <Option value="http:">http://</Option>
        <Option value="https:">https://</Option>
      </Select>
    )
    return (
      <Input
        size="large"
        style={{ width: '100%' }}
        addonBefore={protocol}
        disabled={this.props.disabled}
        onChange={this.onChange}
        value={this.state.url}
      />
    )
  }
}
