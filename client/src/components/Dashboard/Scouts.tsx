import * as React from 'react'
import { Table, Icon, Popconfirm, Tag, message } from 'antd'
import { Link } from 'react-router-dom'
import { colors as C } from '../../config'
import HealthChart from './HealthChart'
import { formatTinyTime, healthToColor, randomColor, I } from '../../utils'
import './Scouts.css'

interface P {
  scouts: I.Scout[]
  loading: boolean
  selectedScouts: string[]
  deleteScout: (...args: any[]) => any
  fetchScouts: (...args: any[]) => any
  handleSelectChange: (...args: any[]) => any
  openModal: (...args: any[]) => any
  selectable: boolean
}

export default class Scouts extends React.Component<P> {
  timeout: number

  componentDidMount() {
    const get = () => {
      this.props.fetchScouts()
      this.timeout = window.setTimeout(get, 60000)
    }
    get()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  delScout(id: string) {
    this.props.deleteScout(id, (isSucc: any) => {
      if (isSucc) {
        message.success('删除成功')
      }
    })
  }
  render() {
    return (
      <Table
        className="scout"
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            className: this.props.selectable ? '' : 'summary',
            render: (name: string, record: I.Scout) => (
              <div>
                <div className="firstline">
                  <Link to={`/stats/${record.id}`} className="name">
                    {name}
                  </Link>
                  {record.tags.map(tag => (
                    <Tag key={tag} color={randomColor(tag)}>
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div
                  className="longtext"
                  style={{ color: '#999', maxWidth: 400 }}
                >
                  {record.URL}
                </div>
              </div>
            ),
          },
          {
            title: '　',
            dataIndex: 'status',
            width: 50,
            render: (status: string) =>
              ({
                OK: <Icon type="check" style={{ color: C.green }} />,
                Error: <Icon type="exception" style={{ color: C.orange }} />,
                Idle: <Icon type="pause" style={{ color: '#999' }} />,
              }[status || 'Idle']),
            className: 'icon',
          },
          {
            title: '过去 24 小时的健康度',
            dataIndex: 'statuses',
            width: 300,
            render: (statuses, record: any) => (
              <HealthChart now={record.now} statuses={statuses} />
            ),
          },
          {
            title: 'Apdex',
            dataIndex: 'Apdex',
            className: 'Apdex',
            render: (Apdex, record: I.Scout) => (
              <div>
                {typeof Apdex !== 'number' ? (
                  <span style={{ color: '#999' }}>NaN</span>
                ) : (
                  <span style={{ color: healthToColor(Apdex) }}>
                    {Apdex.toFixed(2)}
                  </span>
                )}
                <div className="ApdexTarget">
                  ~{formatTinyTime(record.ApdexTarget)}
                </div>
              </div>
            ),
          },
          {
            dataIndex: 'edit',
            width: 50,
            fixed: 'right',
            className: 'icon',
            render: (text, record: I.Scout) => (
              <a onClick={() => this.props.openModal(record.id)}>
                <Icon type="edit" />
              </a>
            ),
          },
          {
            dataIndex: 'delete',
            width: 50,
            fixed: 'right',
            className: 'icon',
            render: (text, record: I.Scout) => (
              <Popconfirm
                title="确定删除？"
                placement="topRight"
                onConfirm={() => this.delScout(record.id)}
              >
                <a>
                  <Icon type="delete" style={{ color: C.red }} />
                </a>
              </Popconfirm>
            ),
          },
        ]}
        rowKey="id"
        dataSource={this.props.scouts}
        loading={this.props.loading}
        rowSelection={
          this.props.selectable
            ? {
                type: 'checkbox',
                selectedRowKeys: this.props.selectedScouts,
                onChange: this.props.handleSelectChange,
              }
            : undefined
        }
      />
    )
  }
}
