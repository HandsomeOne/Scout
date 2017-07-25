import * as React from 'react'
import { Modal, message } from 'antd'
import MultiForm from './forms/MultiForm'
import { origin } from '../../config'

interface P {
  scouts: any[],
  setScouts: (...args: any[]) => any,
  isOpen: boolean,
  allTags: string[],
  allRecipients: string[],
  selectedScouts: string[],
  closeMultiModal: (...args: any[]) => any,
}

class MultiModal extends React.Component<P> {
  form: any

  handleOk = () => {
    this.form.validateFieldsAndScroll((err?: Error) => {
      if (err) return

      const data = this.form.getFieldsValue()
      const patch = data.fields.reduce((c: any, p: any) => (
        Object.assign(c, { [p]: data[p] })
      ), {})

      if (data.fields.length) {
        fetch(`${origin}/scouts`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ids: this.props.selectedScouts,
            patch,
          }),
        })
        .then(res => res.json())
        .then((json) => {
          this.props.setScouts(
            this.props.scouts.map(scout => (
              this.props.selectedScouts.includes(scout.id) ?
              Object.assign(scout, json.find((s: any) => s.id === scout.id)) :
              scout
            )))
          this.props.closeMultiModal()
          message.success('修改成功')
        })
      } else {
        this.props.closeMultiModal()
        message.info('未修改')
      }
    })
  }

  render() {
    return (
      <Modal
        maskClosable={false}
        title={`批量编辑 ${this.props.selectedScouts.length} 个项目`}
        width={720}
        visible={this.props.isOpen}
        onOk={this.handleOk}
        onCancel={this.props.closeMultiModal}
      >
        <MultiForm
          key={this.props.selectedScouts.join(',')}
          ref={(c: any) => { this.form = c }}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

export default MultiModal
