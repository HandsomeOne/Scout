import React, { Component, PropTypes as T } from 'react'
import Overview from './Overview'
import Health from './Health'
import ErrorLog from './ErrorLog'
import $ from './index.css'

class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      since: 1440,
      interval: 30,
    }
  }
  render() {
    const { id } = this.props.match.params
    return (
      <div className={$.stats}>
        <Overview id={id} since={this.state.since} />
        <Health id={id} since={this.state.since} interval={this.state.interval} />
        <ErrorLog id={id} since={this.state.since} />
      </div>
    )
  }
}

Stats.propTypes = {
  match: T.shape({
    params: T.shape({
      id: T.string,
    }),
  }),
}

export default Stats
