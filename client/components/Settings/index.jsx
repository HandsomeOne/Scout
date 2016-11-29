import React, { Component, PropTypes as T } from 'react'
import { Form, Row, Col, Input, Button, message } from 'antd'
import fetch from 'isomorphic-fetch'
import { origin } from '../../config'
import $ from './style.css'
import PrefixedURL from '../MainSection/forms/custom/PrefixedURL'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }
  componentDidMount() {
    fetch(`${origin}/settings`)
    .then(res => res.json())
    .then((settings) => {
      this.setState(settings)
    })
  }
  submit() {
    const data = this.props.form.getFieldsValue()
    fetch(`${origin}/settings`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    .then(() => {
      message.success('更新成功')
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

      <Button
        onClick={this.submit}
        size="large"
        type="primary"
      >更新</Button>
    </Form>)
  }
}

Settings.propTypes = {
  form: T.shape({
    getFieldDecorator: T.func,
    getFieldsValue: T.func,
  }),
}

export default Form.create()(Settings)
