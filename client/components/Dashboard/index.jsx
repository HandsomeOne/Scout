import React, { Component } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'
import Controls from './Controls'
import MultiModal from './MultiModal'
import union from '../../utils/union'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectable: false,
      isModalOpen: false,
      isMultiModalOpen: false,
      scouts: [],
      selectedScouts: [],
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.setScouts = this.setScouts.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openMultiModal = this.openMultiModal.bind(this)
    this.closeMultiModal = this.closeMultiModal.bind(this)
    this.select = this.select.bind(this)
    this.deselect = this.deselect.bind(this)
  }
  setScouts(scouts) {
    this.setState({ scouts })
  }
  handleSelectChange(selectedScouts) {
    this.setState({ selectedScouts })
  }
  openModal(activeId) {
    this.setState({
      isModalOpen: true,
      activeId,
    })
  }
  closeModal() {
    this.setState({ isModalOpen: false })
  }
  openMultiModal() {
    this.setState({ isMultiModalOpen: true })
  }
  closeMultiModal() {
    this.setState({ isMultiModalOpen: false })
  }
  select() {
    this.setState({ selectable: true })
  }
  deselect() {
    this.setState({ selectable: false })
  }
  render() {
    const { scouts } = this.state
    const allTags = union(scouts.map(scout => scout.tags))
    const allRecipients = union(scouts.map(scout => scout.recipients))
    return (
      <div>
        <Controls
          selectable={this.state.selectable}
          scouts={this.state.scouts}
          selectedScouts={this.state.selectedScouts}
          openModal={this.openModal}
          openMultiModal={this.openMultiModal}
          handleSelectChange={this.handleSelectChange}
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
          allTags={allTags}
          allRecipients={allRecipients}
          scouts={this.state.scouts}
          setScouts={this.setScouts}
          activeId={this.state.activeId}
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        />
        <MultiModal
          allTags={allTags}
          allRecipients={allRecipients}
          selectedScouts={this.state.selectedScouts}
          scouts={this.state.scouts}
          setScouts={this.setScouts}
          isOpen={this.state.isMultiModalOpen}
          closeMultiModal={this.closeMultiModal}
        />
      </div>
    )
  }
}
