import React, { Component, PropTypes as T } from 'react'
import Overview from './Overview'
import Health from './Health'

class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      since: 1440,
      interval: 30,
    }
  }
  render() {
    return (
      <div>
        <Overview id={this.props.params.id} since={this.state.since} />
        <Health id={this.props.params.id} since={this.state.since} interval={this.state.interval} />
      </div>
    )
  }
}

Stats.propTypes = {
  params: T.shape({
    id: T.string,
  }),
}

export default Stats
