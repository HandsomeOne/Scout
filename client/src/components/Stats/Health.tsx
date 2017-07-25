import * as React from 'react'
import * as d3 from 'd3'

declare const require: any
const d3Tip = require('d3-tip')
import * as moment from 'moment'
import { healthToColor } from '../../utils'
import './Health.css'

interface P {
  health: any,
  since: number,
  interval: number,
}

export default class Health extends React.Component<P> {
  svg: any

  componentDidMount() {
    const { since, interval, health: json } = this.props
    const data = json.statuses.map(({ OK = 0, Errors = {}, Idle = 0 }, i: any) => {
      const errors = Object.keys(Errors)
      const totalErrors = errors.reduce((p, e) => p + Errors[e], 0)

      const total = OK + totalErrors + Idle
      const validTotal = OK + totalErrors
      const time = moment(json.now - ((i + 0.5) * interval * 60 * 1000))
      return {
        OK,
        totalErrors,
        Errors,
        Idle,
        time: moment(time),
        health: validTotal ? OK / validTotal : 0,
        idleRatio: total ? Idle / total : 1,
      }
    })

    const svg = d3.select(this.svg)
    const margin = { top: 20, right: 20, bottom: 30, left: 20 }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom
    const barWidth = width / data.length / 1.1

    const x = d3.scaleTime()
      .domain([moment(json.now), moment(json.now).subtract(since, 'minutes')])
      .range([0, width])
    const y = d3.scaleLinear().domain([0, 1]).range([0, height - barWidth])

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const tip = d3Tip()
      .attr('class', 'tip')
      .offset([-10, 0])
      .html((d: any) => `
        ${d.time.isSame(moment(), 'day') ? '' : '昨日 '}
        ${d.time.format('HH:mm')} 左右
        ${d.OK + d.totalErrors + d.Idle ?
          `${d.OK ? `<p>OK：${d.OK}</p>` : ''}
          ${Object.keys(d.Errors).map(e => `<p>${e}：${d.Errors[e]}</p>`).join('')}
          ${d.Idle ? `<p>Idle：${d.Idle}</p>` : ''}` :
          `<p class="$"default"">无数据</p>`}
        <div class="$"arrow"">
      `)

    svg.call(tip)

    g.append('g')
      .attr('class', 'axisx')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

    g.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', (d: any) => healthToColor(d.health))
      .attr('opacity', (d: any) => 1 - d.idleRatio)
      .attr('x', (d: any) => x(d.time))
      .attr('y', (d: any) => height - y(d.health) - barWidth)
      .attr('width', barWidth)
      .attr('rx', barWidth / 2)
      .attr('height', (d: any) => y(d.health) + barWidth)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }

  render() {
    return (
      <div className="health">
        <svg
          ref={(s) => { this.svg = s }}
          width="960"
          height="320"
        />
      </div>
    )
  }
}
