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
      selectedScouts: [],
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.setScouts = this.setScouts.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.select = this.select.bind(this)
    this.deselect = this.deselect.bind(this)
  }
  handleSelectChange(selectedScouts) {
    this.setState({ selectedScouts })
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
  deselect() {
    this.setState({ selectable: false })
  }
  render() {
    const { scouts } = this.state
    return (
      <div>
        <Controls
          selectable={this.state.selectable}
          scouts={this.state.scouts}
          selectedScouts={this.state.selectedScouts}
          openModal={this.openModal}
          select={this.select}
          deselect={this.deselect}
        />
        <Scouts
          selectable={this.state.selectable}
          selectedScouts={this.state.selectedScouts}
          scouts={this.state.scouts}
          handleSelectChange={this.handleSelectChange}
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
