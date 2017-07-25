import * as React from 'react'
import Overview from './Overview'
import Health from './Health'
import ErrorLog from './ErrorLog'
import './index.css'

interface P {
  common: any
  health: any
  logs: any[]
  id: string,
  since: number,
  interval: number,
}

class Stats extends React.Component<P> {
  render() {
    const { since, interval } = this.props

    return (
      <div className="stats">
        <Overview since={since} common={this.props.common} />
        <Health since={since} interval={interval} health={this.props.health} />
        <ErrorLog since={since} logs={this.props.logs} />
      </div>
    )
  }
}

export default Stats
