import React, { Component } from 'react'
import { Table } from 'antd'
import fetch from 'isomorphic-fetch'
import { origin } from '../../config'

class AlertLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alertLogs: [],
    }
  }
  componentDidMount() {
    fetch(`${origin}/alertlogs`)
    .then(res => res.json())
    .then((alertLogs) => {
      this.setState({ alertLogs })
    })
  }

  render() {
    const columns = [
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: '告警接口返回主体',
        dataIndex: 'body',
      },
    ]
    return (
      <Table
        columns={columns}
        dataSource={this.state.alertLogs}
        rowKey="_id"
        loading={this.state.loading}
      />
    )
  }
}

export default AlertLog
