import * as React from 'react'
import { Form, Icon, Button, Switch, message } from 'antd'
import { origin } from '../../config'
import './index.css'
import AlertURLDetail from './AlertURLDetail'
import PrefixedURL from '../Dashboard/forms/custom/PrefixedURL'

interface P {
  form: {
    getFieldDecorator: (...args: any[]) => any,
    getFieldsValue: (...args: any[]) => any,
    getFieldValue: (...args: any[]) => any,
  }
}

interface S {
  isAlertURLDetailVisible: boolean
  isTesting: boolean
  settings: any
}

class Settings extends React.Component<P, S> {
  state: S = {
    isAlertURLDetailVisible: false,
    isTesting: false,
    settings: {},
  }
  componentDidMount() {
    fetch(`${origin}/settings`)
    .then(res => res.json())
    .then((settings) => {
      this.setState({ settings })
    })
  }
  submit = () => {
    const data = this.props.form.getFieldsValue()
    fetch(`${origin}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(() => {
      message.success('更新成功')
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
    const { settings } = this.state
    const { getFieldValue } = this.props.form

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
          >
            更新
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Settings as any) as any
