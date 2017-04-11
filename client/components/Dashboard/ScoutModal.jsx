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
    scout: {},
    isVisible: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      if (nextProps.activeId) {
        fetch(`${origin}/scout/${nextProps.activeId}`)
        .then(res => res.json())
        .then((scout) => {
          this.setState({
            scout,
            isVisible: true,
          })
        })
      } else {
        this.setState({
          scout: {},
          isVisible: true,
        })
      }
    }
    if (!nextProps.isOpen && this.props.isOpen) {
      this.setState({ isVisible: false })
    }
  }
  handleOk = () => {
    this.form.validateFieldsAndScroll((err) => {
      if (err) return

      const data = this.form.getFieldsValue()
      if (this.props.activeId) {
        if (isSubsetOf.call(data, this.state.scout)) {
          this.props.closeModal()
          message.info('未修改')
        } else {
          fetch(`${origin}/scout/${this.props.activeId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then((json) => {
            this.props.setScouts(
              this.props.scouts.map(scout => (
                scout.id === this.props.activeId ? Object.assign(scout, json) : scout
              )),
            )
            this.props.closeModal()
            message.success('修改成功')
          })
        }
      } else {
        fetch(`${origin}/scout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then((json) => {
          this.props.setScouts([json].concat(this.props.scouts))
          this.setState({ newId: this.state.newId + 1 })
          this.props.closeModal()
          message.success('添加成功')
        })
      }
    })
  }

  render() {
    const { scout } = this.state
    return (
      <Modal
        maskClosable={false}
        title={this.props.activeId ? `编辑${scout.name}` : '添加监控'}
        width={720}
        visible={this.state.isVisible}
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
  scouts: T.arrayOf(T.shape()),
  setScouts: T.func,
  activeId: T.string,
  isOpen: T.bool,
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
  closeModal: T.func,
}

export default ScoutModal
