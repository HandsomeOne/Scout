import React, { Component, PropTypes as T } from 'react'
import { Table, Button, Icon, Popconfirm, Tag, message } from 'antd'
import fetch from 'isomorphic-fetch'
import $ from './style.css'
import { origin, colors as C } from '../../config'

class Scouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    const get = () => {
      setTimeout(get, 60000)
      this.setState({ loading: true })
      fetch(`${origin}/scout`).then((res) => {
        this.setState({ loading: false })
        return res.json()
      }).then(this.props.actions.getScout)
    }
    get()
  }
  del(id) {
    fetch(`${origin}/scout/${id}`, {
      method: 'DELETE',
    }).then(() => {
      message.success('删除成功')
      this.props.actions.delScout(id)
    })
  }
  render() {
    const states = {
      OK: 0,
      ERROR: 1,
      INACTIVE: 2,
    }
    const icons = {
      [states.OK]: <Icon
        type="check"
        className={$.state}
        style={{ color: C.green }}
      />,
      [states.ERROR]: <Icon
        type="exclamation"
        className={$.state}
        style={{ color: C.yellow }}
      />,
      [states.INACTIVE]: <Icon
        type="pause"
        className={$.state}
        style={{ color: C.grey }}
      />,
    }
    const columns = [
      {
        title: '　',
        dataIndex: 'state',
        width: 50,
        render: text => icons[text || states.OK],
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
          <a onClick={() => this.props.actions.willUpdateScout(record._id)}>
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
            onConfirm={() => this.del(record._id)}
          >
            <a><Icon type="delete" style={{ color: C.red }} /></a>
          </Popconfirm>,
      },
    ]
    return (<Table
      className={$.scout}
      columns={columns}
      footer={() => <div style={{ textAlign: 'right' }}>
        <Button type="primary" size="large" onClick={this.props.actions.willAddScout}>
          <Icon type="plus" />添加
        </Button>
      </div>}
      rowKey="_id"
      dataSource={this.props.scouts}
      loading={this.state.loading}
    />)
  }
}

Scouts.propTypes = {
  scouts: T.arrayOf(T.shape()),
  actions: T.shape({
    getScout: T.func,
    delScout: T.func,
    willUpdateScout: T.func,
    willAddScout: T.func,
  }),
}

export default Scouts
