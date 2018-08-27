import * as React from 'react'
import { Modal, message } from 'antd'
import ScoutForm from './ScoutForm'

function isSubsetOf(this: any, set: any) {
  return Object.keys(this).every(
    key => JSON.stringify(this[key]) === JSON.stringify(set[key]),
  )
}

interface P {
  scout: any
  patchScout: (...args: any[]) => any
  addScout: (...args: any[]) => any
  activeId?: string
  isOpen: boolean
  allTags: string[]
  allRecipients: string[]
  closeModal: (...args: any[]) => any
}

class ScoutModal extends React.Component<P> {
  form: any
  state = {
    newId: 0,
    isVisible: false,
  }

  shouldComponentUpdate(nextProps: P) {
    return this.props.isOpen !== nextProps.isOpen
  }

  handleOk = () => {
    this.form.validateFieldsAndScroll((err?: Error) => {
      if (err) return

      const data = this.form.getFieldsValue()
      if (this.props.activeId) {
        if (isSubsetOf.call(data, this.props.scout)) {
          this.props.closeModal()
          message.info('未修改')
        } else {
          this.props.patchScout(this.props.activeId, data, (isSucc: any) => {
            if (isSucc) {
              message.success('修改成功')
              this.props.closeModal()
            }
          })
        }
      } else {
        this.props.addScout(data, (isSucc: any) => {
          if (isSucc) {
            this.setState({ newId: this.state.newId + 1 })
            message.success('添加成功')
            this.props.closeModal()
          }
        })
      }
    })
  }

  render() {
    const { scout } = this.props

    return (
      <Modal
        maskClosable={false}
        title={this.props.activeId ? `编辑${(scout as any).name}` : '添加监控'}
        width={720}
        visible={this.props.isOpen}
        onOk={this.handleOk}
        onCancel={this.props.closeModal}
      >
        <ScoutForm
          key={this.props.activeId || this.state.newId}
          ref={(c: any) => {
            this.form = c
          }}
          scout={scout}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

export default ScoutModal
