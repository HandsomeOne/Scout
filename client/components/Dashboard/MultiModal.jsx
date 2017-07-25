import React, { Component, PropTypes as T } from 'react'
import { Modal, message } from 'antd'
import fetch from 'isomorphic-fetch'
import MultiForm from './forms/MultiForm'
import { origin } from '../../config'

class MultiModal extends Component {
  handleOk = () => {
    this.form.validateFieldsAndScroll((err) => {
      if (err) return

      const data = this.form.getFieldsValue()
      const patch = data.fields.reduce((c, p) => (
        Object.assign(c, { [p]: data[p] })
      ), Object.create(null))

      if (data.fields.length) {
        this.props.patchScouts(this.props.selectedScouts, patch, (isSucc) => {
          if (isSucc) {
            this.props.closeMultiModal()
            message.success('修改成功')
          }
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
          ref={(c) => { this.form = c }}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

MultiModal.propTypes = {
  patchScouts: T.func,
  isOpen: T.bool,
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
  selectedScouts: T.arrayOf(T.string),
  closeMultiModal: T.func,
}

export default MultiModal
