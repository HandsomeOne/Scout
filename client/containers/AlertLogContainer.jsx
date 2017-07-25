import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { fetchAlertLogs, loadAlertLogs } from '../actions/alertlog'
import AlertLog from '../components/AlertLog/index'

class AlertLogContainer extends Component {

  componentDidMount() {
    this.props.loadData(1, this.props.pageSize)
  }

  render() {
    return (
      <AlertLog {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.alertlog.loading,
  alertLogs: state.alertlog.alertLogs,
  pageSize: 10,
})

const mapDispatchToProps = dispatch => ({
  loadData: (page, pageSize) => {
    dispatch(loadAlertLogs())
    dispatch(fetchAlertLogs(page, pageSize))
  },
})

AlertLogContainer.propTypes = {
  loadData: T.func,
  pageSize: T.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertLogContainer)
