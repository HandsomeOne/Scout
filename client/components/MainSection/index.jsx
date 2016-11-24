import React, { Component, PropTypes as T } from 'react'
import Scouts from './Scouts'
import ScoutModal from './ScoutModal'

export default class MainSection extends Component {
  render() {
    return (<div>
      <Scouts
        scouts={this.props.scouts}
        actions={this.props.actions}
      />
      <ScoutModal
        allTags={
          [...this.props.scouts.reduce((tags, scout) => {
            scout.tags.forEach((tag) => {
              tags.add(tag)
            })
            return tags
          }, new Set())]
        }
        allRecipients={
          [...this.props.scouts.reduce((recipients, scout) => {
            scout.recipients.forEach((tag) => {
              recipients.add(tag)
            })
            return recipients
          }, new Set())]
        }
        scout={this.props.activeId && this.props.scouts.find(
          scout => scout._id === this.props.activeId,
        )}
        visible={this.props.visible}
        actions={this.props.actions}
      />
    </div>)
  }
}

MainSection.propTypes = {
  visible: T.bool,
  activeId: T.string,
  scouts: T.arrayOf(T.object),
  actions: T.shape(),
}
