import React, { Component, PropTypes as T } from 'react'
import { Table, Icon, Popconfirm, Tag, message } from 'antd'
import { Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import { origin, colors as C } from '../../config'
import HealthChart from './HealthChart'
import formatTinyTime from '../../utils/formatTinyTime'
import healthToColor from '../../utils/healthToColor'
import $ from './Scouts.css'

export default class Scouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    const get = () => {
      this.setState({ loading: true })
      fetch(`${origin}/scouts`)
      .then(res => res.json())
      .then((scouts) => {
        this.props.setScouts(scouts.reverse())
        this.setState({ loading: false })
      })
      this.timeout = setTimeout(get, 60000)
    }
    get()
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  delScout(id) {
    fetch(`${origin}/scout/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      message.success('删除成功')
      this.props.setScouts(this.props.scouts.filter(scout => scout.id !== id))
    })
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        className: this.props.selectable ? '' : $.summary,
        render: (name, record) => (
          <div>
            <div className={$.firstline}>
              <Link to={`/stats/${record.id}`} className={$.name}>{name}</Link>
              {record.tags.map(tag => (
                <Tag key={tag} style={{ color: '#999' }}>{tag}</Tag>
              ))}
            </div>
            <div
              className={$.longtext}
              style={{ color: '#999', maxWidth: 400 }}
            >{record.URL}</div>
          </div>
        ),
      },
      {
        title: '　',
        dataIndex: 'status',
        width: 50,
        render: status => ({
          OK: <Icon
            type="check"
            style={{ color: C.green }}
          />,
          Error: <Icon
            type="exception"
            style={{ color: C.orange }}
          />,
          Idle: <Icon
            type="pause"
            style={{ color: '#999' }}
          />,
        }[status || 'Idle']),
        className: $.icon,
      },
      {
        title: '过去 24 小时的健康度',
        dataIndex: 'statuses',
        width: 300,
        render: (statuses, record) => (
          <HealthChart now={record.now} statuses={statuses} />
        ),
      },
      {
        title: 'Apdex',
        dataIndex: 'Apdex',
        className: $.Apdex,
        render: (Apdex, record) => (
          <div>
            { typeof Apdex !== 'number' ?
              <span style={{ color: '#999' }}>NaN</span> :
              <span style={{ color: healthToColor(Apdex) }}>{Apdex.toFixed(2)}</span> }
            <div className={$.ApdexTarget}>~{formatTinyTime(record.ApdexTarget)}</div>
          </div>
        ),
      },
      {
        dataIndex: 'edit',
        width: 50,
        fixed: 'right',
        className: $.icon,
        render: (text, record) => (
          <a onClick={() => this.props.openModal(record.id)}>
            <Icon type="edit" />
          </a>
        ),
      },
      {
        dataIndex: 'delete',
        width: 50,
        fixed: 'right',
        className: $.icon,
        render: (text, record) => (
          <Popconfirm
            title="确定删除？"
            placement="topRight"
            onConfirm={() => this.delScout(record.id)}
          >
            <a><Icon type="delete" style={{ color: C.red }} /></a>
          </Popconfirm>
        ),
      },
    ]
    return (<Table
      className={$.scout}
      columns={columns}
      rowKey="id"
      dataSource={this.props.scouts}
      loading={this.state.loading}
      rowSelection={this.props.selectable ? {
        type: 'checkbox',
        selectedRowKeys: this.props.selectedScouts,
        onChange: this.props.handleSelectChange,
      } : null}
    />)
  }
}

Scouts.propTypes = {
  scouts: T.arrayOf(T.shape({
    id: T.string,
  })),
  selectedScouts: T.arrayOf(T.string),
  handleSelectChange: T.func,
  setScouts: T.func,
  openModal: T.func,
  selectable: T.bool,
}
