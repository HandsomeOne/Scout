import React, { Component, PropTypes as T } from 'react'
import Overview from './Overview'
import Health from './Health'
import ErrorLog from './ErrorLog'
import $ from './index.css'

export default class Stats extends Component {
  render() {
    const { id, since, interval } = this.props

    return (
      <div className={$.stats}>
        <Overview id={id} since={since} common={this.props.common} />
        <Health id={id} since={since} interval={interval} health={this.props.health} />
        <ErrorLog id={id} since={since} logs={this.props.logs} />
      </div>
    )
  }
}

Stats.propTypes = {
  common: T.object,
  health: T.object,
  logs: T.arrayOf(T.shape()),
  id: T.string,
  since: T.number,
  interval: T.number,
}
