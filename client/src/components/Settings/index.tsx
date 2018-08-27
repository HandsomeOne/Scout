import * as React from 'react'
import { Form, Icon, Button, Switch, message } from 'antd'
import './index.css'
import AlertURLDetail from './AlertURLDetail'
import PrefixedURL from '../Dashboard/forms/custom/PrefixedURL'

interface P {
  form: {
    getFieldDecorator: (...args: any[]) => any
    getFieldsValue: (...args: any[]) => any
    getFieldValue: (...args: any[]) => any
  }
  onSubmit: (...args: any[]) => any
  settings: any
}

interface S {
  isAlertURLDetailVisible: boolean
}

class Settings extends React.Component<P, S> {
  state: S = {
    isAlertURLDetailVisible: false,
  }

  submit = () => {
    const data = this.props.form.getFieldsValue()
    this.props.onSubmit(data, (isSucc: any) => {
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
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { settings } = this.props

    return (
      <div className="container">
        <Form className="settings">
          <Item label="用于接收告警的 URL" style={{ marginBottom: 0 }}>
            {getFieldDecorator('alertURL', {
              initialValue: settings.alertURL,
            })(<PrefixedURL />)}
          </Item>

          <p style={{ height: 32, lineHeight: '32px' }}>
            <a style={{ float: 'right' }} onClick={this.toggleAlertURLDetail}>
              <Icon type={this.state.isAlertURLDetailVisible ? 'up' : 'down'} />{' '}
              接口规格
            </a>
          </p>

          <div
            style={{
              display: this.state.isAlertURLDetailVisible ? 'block' : 'none',
            }}
          >
            <AlertURLDetail alertURL={getFieldValue('alertURL')} />
          </div>

          <Item label="在接口恢复时通知">
            {getFieldDecorator('alertOnRecovery', {
              valuePropName: 'checked',
              initialValue: settings.alertOnRecovery,
            })(<Switch />)}
          </Item>
          <Button onClick={this.submit} size="large" type="primary">
            更新
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Settings as any) as any
