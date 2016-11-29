import React, { Component, PropTypes as T } from 'react'
import { Form, Row, Col, Input } from 'antd'
import fetch from 'isomorphic-fetch'
import { origin } from '../../config'
import $ from './style.css'
import PrefixedURL from '../MainSection/forms/custom/PrefixedURL'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    fetch(`${origin}/settings`)
    .then(res => res.json())
    .then((settings) => {
      this.setState(settings)
    })
  }
  render() {
    const { Item } = Form
    const { getFieldDecorator } = this.props.form
    const settings = this.state

    return (<Form className={$.settings}>
      <Item label="用于接收报警的 URL" >
        {getFieldDecorator('alertURL', {
          initialValue: settings.alertURL,
        })(<PrefixedURL />)}
      </Item>
    </Form>)
  }
}

Settings.propTypes = {
  form: T.shape({
    getFieldDecorator: T.func,
  }),
}

export default Form.create()(Settings)
