import React, { Component, PropTypes as T } from 'react'
import { Input, Select } from 'antd'

export default class HTTPHeaders extends Component {
  constructor(props) {
    super(props)
    const arr = props.value.split('//')
    this.state = {
      protocol: arr[0],
      value: arr[1],
    }
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const arr = nextProps.value.split('//')
    this.setState({
      protocol: arr[0],
      value: arr[1],
    })
  }
  onSelect(value) {
    this.props.onChange(`${value}//${this.state.value}`)
  }
  onChange(e) {
    this.props.onChange(`${this.state.protocol}//${e.target.value}`)
  }
  render() {
    const { Option } = Select
    const protocol = (
      <Select
        size="large"
        onChange={this.onSelect}
        style={{ width: 75 }}
        defaultValue="http:"
      >
        <Option value="http:">http://</Option>
        <Option value="https:">https://</Option>
      </Select>
    )
    return (<Input
      size="large"
      addonBefore={protocol}
      onChange={this.onChange}
      value={this.state.value}
    />)
  }
}

HTTPHeaders.propTypes = {
  value: T.string.isRequired,
  onChange: T.func.isRequired,
}
HTTPHeaders.defaultProps = {
  value: 'http://',
  onChange: e => e,
}
