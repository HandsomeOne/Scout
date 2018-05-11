import * as React from 'react'
import { Row, Col } from 'antd'
import { range } from 'lodash'
import './WorkTimeChart.css'

const weekdays = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]

interface P {
  workTime: number[][][]
}

export default class WorkTimeChart extends React.Component<P> {
  static defaultProps = {
    workTime: [],
  }

  getRanges() {
    function toPercent(hour: number, minute: number) {
      return (hour + minute / 60) * (100 / 24)
    }
    function compare(a: number[], b: number[]) {
      for (let i = 0; i < 3; i += 1) {
        if (a[i] !== b[i]) {
          return Math.sign(a[i] - b[i])
        }
      }
      return 0
    }

    const ranges: {
      left: string
      width: string
    }[][] = weekdays.map(() => [])

    if (this.props.workTime.length === 0) {
      ranges.forEach(r => {
        r.push({
          left: '0',
          width: '100%',
        })
      })
      return ranges
    }

    this.props.workTime.forEach(arr => {
      const [start, end] = arr
      if (start && end) {
        const left = toPercent(start[1], start[2])
        if (compare(start, end) <= 0) {
          if (start[0] === end[0]) {
            ranges[start[0]].push({
              left: `${left}%`,
              width: `${toPercent(end[1], end[2]) - left}%`,
            })
          } else {
            ranges[start[0]].push({
              left: `${left}%`,
              width: `${100 - left}%`,
            })
            for (let i = start[0] + 1; i < end[0]; i += 1) {
              ranges[i].push({
                left: '0',
                width: '100%',
              })
            }
            ranges[end[0]].push({
              left: '0',
              width: `${toPercent(end[1], end[2])}%`,
            })
          }
        } else {
          for (let i = 0; i < end[0]; i += 1) {
            ranges[i].push({
              left: '0',
              width: '100%',
            })
          }
          ranges[end[0]].push({
            left: '0',
            width: `${toPercent(end[1], end[2])}%`,
          })
          ranges[start[0]].push({
            left: `${left}%`,
            width: `${100 - left}%`,
          })
          for (let i = start[0] + 1; i < 7; i += 1) {
            ranges[i].push({
              left: '0',
              width: '100%',
            })
          }
        }
      }
    })
    return ranges
  }
  render() {
    const ranges = this.getRanges()
    return (
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={22} style={{ position: 'relative' }}>
          {weekdays.map((_, i) => (
            <div key={i} style={{ padding: '8px 0' }}>
              <div className="day">
                <div className="middle">
                  {ranges[i].map((style, j) => (
                    <div key={j} style={style} className="range" />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="lines">{weekdays.map((_, i) => <div key={i} />)}</div>
        </Col>
        <Col span={2} style={{ lineHeight: '26px' }}>
          {weekdays.map((v, i) => <div key={i}>{v}</div>)}
        </Col>
        <Col span={22} className="time">
          {range(7).map((_, i) => (
            <div key={i}>
              {i * 4 < 10 && '0'}
              {i * 4}:00
            </div>
          ))}
        </Col>
      </Row>
    )
  }
}
