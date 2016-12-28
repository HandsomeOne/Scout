import React, { Component, PropTypes as T } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import { origin } from '../../config'
import $ from './Health.css'

export default class Health extends Component {
  componentDidMount() {
    const { id, since, interval } = this.props
    fetch(`${origin}/stats/health/${id}?since=${since}&interval=${interval}`)
    .then(res => res.json())
    .then((json) => {
      const data = json.statuses.map(({ OK = 0, Error = 0, Idle = 0 }, i) => {
        const total = OK + Error + Idle
        const time = moment(json.now - ((i + 0.5) * interval * 60 * 1000))
        return {
          time: `${time.isSame(moment(), 'day') ? ' ' : '昨日 '}${time.format('HH:mm')}`,
          health: total ? (OK + Idle) / total : 0,
        }
      })

      const svg = d3.select(this.svg)
      const margin = { top: 20, right: 20, bottom: 30, left: 20 }
      const width = +svg.attr('width') - margin.left - margin.right
      const height = +svg.attr('height') - margin.top - margin.bottom

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
      const y = d3.scaleLinear().rangeRound([height, 0])

      const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

      x.domain(data.map(d => d.time))
      y.domain([0, d3.max(data, d => d.health)])

      g.append('g')
      .attr('class', $.axisx)
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

      g.selectAll(`.${$.bar}`)
      .data(data)
      .enter().append('rect')
      .attr('class', $.bar)
      .attr('fill', d => d3.interpolateWarm(d.health))
      .attr('x', d => x(d.time))
      .attr('y', d => y(d.health))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.health))
    })
  }
  render() {
    return (
      <div className={$.health}>
        <svg
          ref={(s) => { this.svg = s }}
          width="960"
          height="320"
        />
      </div>
    )
  }
}

Health.propTypes = {
  id: T.string,
  since: T.number,
  interval: T.number,
}
