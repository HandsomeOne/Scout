import React, { Component } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'
import union from '../../utils/union'

export default class Dashboard extends Component {
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
    const { scouts } = this.state
    return (
      <div>
        <Scouts
          scouts={this.state.scouts}
          setScouts={this.setScouts}
          openModal={this.openModal}
        />
        <ScoutModal
          allTags={union(scouts.map(scout => scout.tags))}
          allRecipients={union(scouts.map(scout => scout.recipients))}
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
