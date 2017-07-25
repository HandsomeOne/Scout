import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import * as moment from 'moment'
import { origin, colors as C } from '../../config'
import './index.css'

function renderHTTP(record: any) {
  const isOK = record.status === 'OK'
  return (
    <div>
      请求体:
      <pre>{
        JSON.stringify(record.message, null, 2)
      }</pre>
      <br />
      {isOK ? '返回体:' : '错误信息:'}
      <pre>{
        (isOK ? record.body : record.errMessage) ||
        <span className="default">[空]</span>
      }</pre>
    </div>
  )
}

class AlertLog extends React.Component {
  state = {
    loading: false,
    alertLogs: [],
  }
  pageSize = 10

  componentDidMount() {
    this.fetch()
  }

  fetch(page: number = 1) {
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

  handleChange = (pagination: PaginationProps) => {
    this.fetch(pagination.current)
  }

  render() {
    return (
      <Table
        bordered
        className="alertlog"
        columns={[
          {
            width: 100,
            title: '告警接口状态',
            dataIndex: 'status',
            render: (status, record: any) => (
              record.statusCode ?
                `${status} / ${record.statusCode}` :
                status
            ),
          },
          {
            width: 100,
            title: '时间',
            dataIndex: 'time',
            render: time => moment(time).format('MM-DD HH:mm'),
          },
          {
            title: '描述',
            dataIndex: 'message',
            render: message => (
              message.status === 'Error' ?
                <span style={{ color: C.red }}>
                  {message.errName}: {message.errMessage}
                </span> :
                <span style={{ color: C.green }}>恢复正常</span>
            ),
          },
          {
            title: '从属条目',
            dataIndex: 'message.name',
            render: (name, record: any) => (
              <Link to={`/stats/${record.scoutId}`}>{name}</Link>
            ),
          },
          {
            title: '发送至',
            dataIndex: 'message.recipients',
            render: recipients => recipients.map((recipient: string) => {
              let color = ''
              if (/^\+?\d+$/.test(recipient)) {
                color = 'orange'
              } else if (/@/.test(recipient)) {
                color = 'purple'
              }
              return <Tag key={recipient} color={color}>{recipient}</Tag>
            }),
          },
        ]}
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
