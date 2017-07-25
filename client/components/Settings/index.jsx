import React, { Component, PropTypes as T } from 'react'
import { Form, Icon, Button, Switch, message } from 'antd'
import $ from './index.css'
import AlertURLDetail from './AlertURLDetail'
import PrefixedURL from '../Dashboard/forms/custom/PrefixedURL'

class Settings extends Component {
  state = {
    isAlertURLDetailVisible: false,
  }

  submit = () => {
    const data = this.props.form.getFieldsValue()
    this.props.onSubmit(data, (isSucc) => {
      if (isSucc) {
        message.success('更新成功')
      } else {
        message.success('更新失败')
      }
    })
  }
  toggleAlertURLDetail = () => {
    this.setState({
      isAlertURLDetailVisible: !this.state.isAlertURLDetailVisible,
    })
  }
  render() {
    const { Item } = Form
    const { getFieldDecorator } = this.props.form
    const { getFieldValue } = this.props.form
    const { settings } = this.props

    return (
      <div className={$.container}>
        <Form className={$.settings}>
          <Item label="用于接收告警的 URL" style={{ marginBottom: 0 }}>
            {getFieldDecorator('alertURL', {
              initialValue: settings.alertURL,
            })(<PrefixedURL />)}
          </Item>

          <p style={{ height: 32, lineHeight: '32px' }}>
            <a style={{ float: 'right' }} onClick={this.toggleAlertURLDetail}>
              <Icon type={this.state.isAlertURLDetailVisible ? 'up' : 'down'} /> 接口规格
            </a>
          </p>

          <div style={{ display: this.state.isAlertURLDetailVisible ? 'block' : 'none' }}>
            <AlertURLDetail alertURL={getFieldValue('alertURL')} />
          </div>

          <Item label="在接口恢复时通知">
            {getFieldDecorator('alertOnRecovery', {
              valuePropName: 'checked',
              initialValue: settings.alertOnRecovery,
            })(<Switch />)}
          </Item>
          <Button
            onClick={this.submit}
            size="large"
            type="primary"
          >更新</Button>
        </Form>
      </div>
    )
  }
}

Settings.propTypes = {
  form: T.shape({
    getFieldDecorator: T.func,
    getFieldsValue: T.func,
    getFieldValue: T.func,
  }),
  onSubmit: T.func,
  settings: T.object,
}

export default Form.create()(Settings)
