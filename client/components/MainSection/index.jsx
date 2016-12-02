import React, { Component } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'

export default class MainSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      scouts: [],
    }
    this.setScouts = this.setScouts.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  setScouts(scouts) {
    this.setState({ scouts })
  }
  openModal(activeId) {
    this.setState({
      isModalOpen: true,
      activeId,
    })
  }
  closeModal() {
    this.setState({
      isModalOpen: false,
    })
  }
  render() {
    return (
      <div>
        <Scouts
          scouts={this.state.scouts}
          setScouts={this.setScouts}
          openModal={this.openModal}
        />
        <ScoutModal
          allTags={
            [...this.state.scouts.reduce((tags, scout) => {
              scout.tags.forEach((tag) => {
                tags.add(tag)
              })
              return tags
            }, new Set())]
          }
          allRecipients={
            [...this.state.scouts.reduce((recipients, scout) => {
              scout.recipients.forEach((tag) => {
                recipients.add(tag)
              })
              return recipients
            }, new Set())]
          }
          scouts={this.state.scouts}
          setScouts={this.setScouts}
          activeId={this.state.activeId}
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}
