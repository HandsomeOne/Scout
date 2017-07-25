import React, { Component, PropTypes as T } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'
import Controls from './Controls'
import MultiModal from './MultiModal'
import union from '../../utils/union'

export default class Dashboard extends Component {
  state = {
    selectable: false,
    isModalOpen: false,
    isMultiModalOpen: false,
  }
  handleSelectChange = (selectedScouts) => {
    this.props.selectScouts(selectedScouts)
  }
  openModal = (id) => {
    const me = this
    if (id !== undefined) {
      this.props.fetchScout(id, (isSucc) => {
        if (isSucc) {
          me.setState({ isModalOpen: true })
        }
      })
    } else {
      me.setState({ isModalOpen: true })
    }
  }
  closeModal = () => {
    this.props.cleanChosenScout()
    this.setState({ isModalOpen: false })
  }
  openMultiModal = () => {
    this.setState({ isMultiModalOpen: true })
  }
  closeMultiModal = () => {
    this.props.cleanSelectedScouts()
    this.setState({ isMultiModalOpen: false })
  }
  select = () => {
    this.setState({ selectable: true })
  }
  deselect = () => {
    this.setState({ selectable: false })
  }
  render() {
    const { scouts } = this.props
    const allTags = union(scouts.map(scout => scout.tags))
    const allRecipients = union(scouts.map(scout => scout.recipients))
    return (
      <div>
        <Controls
          selectable={this.state.selectable}
          scouts={scouts}
          selectedScouts={this.props.selectedScouts}
          openModal={this.openModal}
          openMultiModal={this.openMultiModal}
          handleSelectChange={this.handleSelectChange}
          select={this.select}
          deselect={this.deselect}
        />
        <Scouts
          selectable={this.state.selectable}
          selectedScouts={this.props.selectedScouts}
          scouts={scouts}
          handleSelectChange={this.handleSelectChange}
          fetchScouts={this.props.fetchScouts}
          deleteScout={this.props.deleteScout}
          loading={this.props.loading}
          openModal={this.openModal}
        />
        <ScoutModal
          allTags={allTags}
          allRecipients={allRecipients}
          scout={this.props.scout}
          fetchScout={this.props.fetchScout}
          patchScout={this.props.patchScout}
          addScout={this.props.addScout}
          activeId={this.props.activeId}
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        />
        <MultiModal
          allTags={allTags}
          allRecipients={allRecipients}
          selectedScouts={this.props.selectedScouts}
          patchScouts={this.props.patchScouts}
          setScouts={this.setScouts}
          isOpen={this.state.isMultiModalOpen}
          closeMultiModal={this.closeMultiModal}
        />
      </div>
    )
  }
}

Dashboard.propTypes = {
  scouts: T.arrayOf(T.shape()),
  scout: T.object,
  selectedScouts: T.arrayOf(T.shape()),
  activeId: T.string,
  fetchScouts: T.func,
  patchScouts: T.func,
  cleanSelectedScouts: T.func,
  selectScouts: T.func,
  addScout: T.func,
  deleteScout: T.func,
  patchScout: T.func,
  fetchScout: T.func,
  cleanChosenScout: T.func,
  loading: T.bool,
}
