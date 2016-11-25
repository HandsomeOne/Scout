import React, { Component, PropTypes as T } from 'react'
import { Modal, message } from 'antd'
import fetch from 'isomorphic-fetch'
import { fromJS } from 'immutable'
import ScoutForm from './ScoutForm'
import { SCOUT_URL } from '../../config'

class ScoutModal extends Component {
  constructor() {
    super()
    this.handleOk = this.handleOk.bind(this)
  }
  handleOk() {
    const data = this.form.getFieldsValue()
    console.log(data)
    if (this.props.scout) {
      if (fromJS(data).filter(v => v).isSubset(fromJS(this.props.scout))) {
        message.info('未改动')
        this.form.resetFields()
        this.props.actions.hideModal()
      } else {
        const _id = this.props.scout._id
        fetch(`${SCOUT_URL}/${_id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }).then(() => {
          message.success('修改成功')
          this.form.resetFields()
          this.props.actions.updateScout({ _id, data })
        })
      }
    } else {
      this.form.validateFieldsAndScroll((err) => {
        if (!err) {
          fetch(SCOUT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
          }).then(res => res.json())
            .then((json) => {
              message.success('添加成功')
              this.form.resetFields()
              this.props.actions.addScout(json)
            })
        }
      })
    }
  }

  render() {
    const scout = this.props.scout
    return (
      <Modal
        maskClosable={false}
        title={scout ? `编辑${scout.name}` : '添加监控'}
        width={720}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={() => {
          this.props.actions.hideModal()
          setTimeout(() => this.form.resetFields(), 100)
        }}
      >
        <ScoutForm
          key={this.props.scout && this.props.scout._id}
          ref={(c) => { this.form = c }}
          scout={this.props.scout}
          allTags={this.props.allTags}
          allRecipients={this.props.allRecipients}
        />
      </Modal>
    )
  }
}

ScoutModal.propTypes = {
  scout: T.shape({
    _id: T.string,
  }),
  actions: T.shape({
    hideModal: T.func,
    updateScout: T.func,
    addScout: T.func,
  }),
  visible: T.bool,
  allTags: T.arrayOf(T.string),
  allRecipients: T.arrayOf(T.string),
}

export default ScoutModal
