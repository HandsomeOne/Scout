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
              Object.assign(scout, json.find(s => s.id === scout.id)) :
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
          ref={(c) => { this.form = c }}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

MultiModal.propTypes = {
  scouts: T.arrayOf(T.shape()),
  setScouts: T.func,
  isOpen: T.bool,
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
  selectedScouts: T.arrayOf(T.string),
  closeMultiModal: T.func,
}

export default MultiModal
