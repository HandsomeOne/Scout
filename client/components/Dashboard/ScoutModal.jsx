import React, { Component, PropTypes as T } from 'react'
import { Modal, message } from 'antd'
import fetch from 'isomorphic-fetch'
import ScoutForm from './ScoutForm'
import { origin } from '../../config'

function isSubsetOf(set) {
  return Object.keys(this).every(key => (
    JSON.stringify(this[key]) === JSON.stringify(set[key])
  ))
}

class ScoutModal extends Component {
  state = {
    newId: 0,
    isVisible: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isOpen !== nextProps.isOpen) {
      return true
    }
    return false
  }

  handleOk = () => {
    this.form.validateFieldsAndScroll((err) => {
      if (err) return

      const data = this.form.getFieldsValue()
      const me = this

      if (this.props.activeId) {
        if (isSubsetOf.call(data, this.props.scout)) {
          this.props.closeModal()
          message.info('未修改')
        } else {
          this.props.patchScout(this.props.activeId, data, (isSucc) => {
            if (isSucc) {
              message.success('修改成功')
              me.props.closeModal()
            }
          })
        }
      } else {
        this.props.addScout(data, (isSucc) => {
          if (isSucc) {
            me.setState({ newId: this.state.newId + 1 })
            message.success('添加成功')
            me.props.closeModal()
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
        title={this.props.activeId ? `编辑${scout.name}` : '添加监控'}
        width={720}
        visible={this.props.isOpen}
        onOk={this.handleOk}
        onCancel={this.props.closeModal}
      >
        <ScoutForm
          key={this.props.activeId || this.state.newId}
          ref={(c) => { this.form = c }}
          scout={scout}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

ScoutModal.propTypes = {
  scout: T.object,
  patchScout: T.func,
  addScout: T.func,
  activeId: T.string,
  isOpen: T.bool,
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
  closeModal: T.func,
}

export default ScoutModal
