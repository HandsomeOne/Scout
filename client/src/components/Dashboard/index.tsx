import * as React from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'
import Controls from './Controls'
import MultiModal from './MultiModal'
import { union } from 'lodash'

interface P {
  scouts: any[]
  scout: any
  selectedScouts: string[]
  activeId: string
  fetchScouts: (...args: any[]) => any
  patchScouts: (...args: any[]) => any
  cleanSelectedScouts: (...args: any[]) => any
  selectScouts: (...args: any[]) => any
  addScout: (...args: any[]) => any
  deleteScout: (...args: any[]) => any
  patchScout: (...args: any[]) => any
  fetchScout: (...args: any[]) => any
  cleanChosenScout: (...args: any[]) => any
  loading: boolean
}

interface S {
  selectable: boolean
  isModalOpen: boolean
  isMultiModalOpen: boolean
  activeId?: string
}

export default class Dashboard extends React.Component<P, S> {
  state: S = {
    selectable: false,
    isModalOpen: false,
    isMultiModalOpen: false,
  }

  handleSelectChange = (selectedScouts: any) => {
    this.props.selectScouts(selectedScouts)
  }

  openModal = (id?: string) => {
    if (id !== undefined) {
      this.props.fetchScout(id, (isSucc: any) => {
        if (isSucc) {
          this.setState({ isModalOpen: true })
        }
      })
    } else {
      this.setState({ isModalOpen: true })
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
    const allTags = union<string>(...scouts.map(scout => scout.tags))
    const allRecipients = union<string>(
      ...scouts.map(scout => scout.recipients),
    )

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
          isOpen={this.state.isMultiModalOpen}
          closeMultiModal={this.closeMultiModal}
        />
      </div>
    )
  }
}
