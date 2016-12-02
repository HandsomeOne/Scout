import React, { Component, PropTypes as T } from 'react'
import { Table, Button, Icon, Popconfirm, Tag, message } from 'antd'
import fetch from 'isomorphic-fetch'
import $ from './style.css'
import { origin, colors as C } from '../../config'

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
      setTimeout(get, 60000)
    }
    get()
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
        title: '　',
        dataIndex: 'status',
        width: 50,
        render: status => ({
          OK: <Icon
            type="check"
            style={{ color: C.green }}
          />,
          Error: <Icon
            type="exclamation"
            style={{ color: C.yellow }}
          />,
          Idle: <Icon
            type="pause"
            style={{ color: C.grey }}
          />,
        }[status || 'Idle']),
        className: $.icon,
      },
      {
        title: '名称',
        dataIndex: 'name',
        render: (name, record) =>
          <p>
            <b>{name}</b><br />
            <span style={{ color: C.grey }}>{record.URL}</span>
          </p>,
      },
      {
        title: 'Apdex',
        dataIndex: 'Apdex',
        className: $.Apdex,
        render: (Apdex) => {
          if (!Apdex) {
            return <span style={{ color: C.grey }}>0.000</span>
          }
          if (Apdex >= 0.8) {
            return <span style={{ color: C.green }}>{Apdex.toFixed(3)}</span>
          }
          if (Apdex >= 0.6) {
            return <span style={{ color: C.yellow }}>{Apdex.toFixed(3)}</span>
          }
          return <span style={{ color: C.orange }}>{Apdex.toFixed(3)}</span>
        },
      },
      {
        title: '标签',
        width: 150,
        dataIndex: 'tags',
        render: tags =>
          tags.map(tag => <Tag key={tag}>{tag}</Tag>),
      },
      {
        dataIndex: 'edit',
        width: 50,
        fixed: 'right',
        className: $.icon,
        render: (text, record) =>
          <a onClick={() => this.props.openModal(record.id)}>
            <Icon type="edit" />
          </a>,
      },
      {
        dataIndex: 'delete',
        width: 50,
        fixed: 'right',
        className: $.icon,
        render: (text, record) =>
          <Popconfirm
            title="确定删除？"
            placement="topRight"
            onConfirm={() => this.delScout(record.id)}
          >
            <a><Icon type="delete" style={{ color: C.red }} /></a>
          </Popconfirm>,
      },
    ]
    return (<Table
      className={$.scout}
      columns={columns}
      footer={() => <div style={{ textAlign: 'right' }}>
        <Button type="primary" size="large" onClick={() => { this.props.openModal() }}>
          <Icon type="plus" />添加
        </Button>
      </div>}
      rowKey="id"
      dataSource={this.props.scouts}
      loading={this.state.loading}
    />)
  }
}

Scouts.propTypes = {
  scouts: T.arrayOf(T.shape({
    id: T.string,
  })),
  setScouts: T.func,
  openModal: T.func,
}

