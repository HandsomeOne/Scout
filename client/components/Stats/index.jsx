import React, { Component, PropTypes as T } from 'react'
import { origin } from '../../config'
import Overview from './Overview'

class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    fetch(`${origin}/stats/${this.props.params.id}?since=1440`)
    .then(res => res.json())
    .then((json) => {
      this.setState(json)
    })
  }
  render() {
    const {
      Apdex,
      ApdexTarget,
      OK,
      Error,
      Idle,
      meanResponseTime,
    } = this.state
    const total = OK + Error + Idle
    return (
      <div>
        <Overview
          health={total ? (OK + Idle) / total : 0}
          Apdex={typeof Apdex !== 'number' ? 'NaN' : Apdex.toFixed(2)}
          ApdexTarget={ApdexTarget}
          meanResponseTime={meanResponseTime}
          Error={Error}
        />
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
