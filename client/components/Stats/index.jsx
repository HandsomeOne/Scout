import React, { Component, PropTypes as T } from 'react'

class Stats extends Component {
  render() {
    return (<div>{this.props.params.id}</div>)
  }
}

Stats.propTypes = {
}

export default Stats
