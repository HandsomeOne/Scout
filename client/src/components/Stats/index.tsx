import * as React from 'react'
import Overview from './Overview'
import Health from './Health'
import ErrorLog from './ErrorLog'
import './index.css'

interface P {
  match: {
    params: {
      id: string
    }
  }
}

class Stats extends React.Component<P> {
  state = {
    since: 1440,
    interval: 30,
  }
  render() {
    const { id } = this.props.match.params
    return (
      <div className="stats">
        <Overview id={id} since={this.state.since} />
        <Health id={id} since={this.state.since} interval={this.state.interval} />
        <ErrorLog id={id} since={this.state.since} />
      </div>
    )
  }
}

export default Stats
