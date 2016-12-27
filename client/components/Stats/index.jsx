import React, { Component, PropTypes as T } from 'react'
import Overview from './Overview'

class Stats extends Component {
  render() {
    return (
      <div>
        <Overview id={this.props.params.id} since={1440} />
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
