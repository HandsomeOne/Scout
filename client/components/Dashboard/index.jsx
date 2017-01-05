import React, { Component } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'
import Controls from './Controls'
import union from '../../utils/union'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectable: false,
      isModalOpen: false,
      scouts: [],
    }
    this.setScouts = this.setScouts.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.select = this.select.bind(this)
    this.unselect = this.unselect.bind(this)
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
  select() {
    this.setState({ selectable: true })
  }
  unselect() {
    this.setState({ selectable: false })
  }
  render() {
    const { scouts } = this.state
    return (
      <div>
        <Controls
          selectable={this.state.selectable}
          openModal={this.openModal}
          select={this.select}
          unselect={this.unselect}
        />
        <Scouts
          selectable={this.state.selectable}
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
