import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag } from 'antd'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import { origin } from '../../config'
import $ from './index.css'

function renderHTTP(record) {
  return (
    <div>
      请求体:
      <pre>{
        JSON.stringify(record.message, null, 2)
      }</pre>
      <br />
      返回体:
      <pre>{
        record.body || <span className={$.default}>[空]</span>
      }</pre>
    </div>
  )
}

class AlertLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alertLogs: [],
    }
    this.pageSize = 10
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  fetch(page = 1) {
    this.setState({ loading: true })
    fetch(`${origin}/alertlogs?page=${page}&pageSize=${this.pageSize}`)
    .then(res => res.json())
    .then((alertLogs) => {
      this.setState({
        alertLogs,
        loading: false,
      })
    })
  }

  handleChange(pagination) {
    this.fetch(pagination.current)
  }

  render() {
    const columns = [
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        render: (status, record) => `${status} / ${record.statusCode}`,
      },
      {
        width: 100,
        title: '时间',
        dataIndex: 'time',
        render: time => moment(time).format('MM-DD HH:mm'),
      },
      {
        title: '异常描述',
        dataIndex: 'message',
        render: message => `${message.errName}: ${message.errMessage}`,
      },
      {
        title: '从属条目',
        dataIndex: 'message.name',
        render: (name, record) => (
          <Link to={`/stats/${record.scoutId}`}>{name}</Link>
        ),
      },
      {
        title: '发送至',
        dataIndex: 'message.recipients',
        render: recipients => recipients.map(
          recipient => <Tag key={recipient}>{recipient}</Tag>,
        ),
      },
    ]
    return (
      <Table
        bordered
        className={$.alertlog}
        columns={columns}
        dataSource={this.state.alertLogs}
        expandedRowRender={renderHTTP}
        onChange={this.handleChange}
        rowKey="id"
        pagination={{
          total: 200,
          simple: true,
        }}
        loading={this.state.loading}
      />
    )
  }
}

export default AlertLog
