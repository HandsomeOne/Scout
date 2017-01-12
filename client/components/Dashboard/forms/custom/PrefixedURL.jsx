import React, { Component, PropTypes as T } from 'react'
import { Input, Select } from 'antd'

const protocols = ['http:', 'https:']
function parse(value) {
  let protocol = 'http:'
  let url = value.trim()
  let mayFind = true

  function find(_protocol) {
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
function stringify({ protocol, url }) {
  const parsed = parse(`${protocol}//${url}`)
  return `${parsed.protocol}//${parsed.url}`
}

export default class PrefixedURL extends Component {
  constructor(props) {
    super(props)
    this.state = parse(props.value)
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState(parse(nextProps.value))
  }
  onSelect(value) {
    this.state.protocol = value
    this.props.onChange(stringify(this.state))
  }
  onChange(e) {
    this.state.url = e.target.value
    this.props.onChange(stringify(this.state))
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
    return (<Input
      size="large"
      addonBefore={protocol}
      disabled={this.props.disabled}
      onChange={this.onChange}
      value={this.state.url}
    />)
  }
}

PrefixedURL.propTypes = {
  value: T.string.isRequired,
  onChange: T.func.isRequired,
  disabled: T.bool,
}
PrefixedURL.defaultProps = {
  value: '',
  onChange: e => e,
}
