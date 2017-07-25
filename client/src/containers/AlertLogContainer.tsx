import * as React from 'react'
import { connect } from 'react-redux'
import { fetchAlertLogs, loadAlertLogs } from '../actions/alertlog'
import AlertLog from '../components/AlertLog'

class AlertLogContainer extends React.Component<any> {
  componentDidMount() {
    this.props.loadData(1, this.props.pageSize)
  }

  render() {
    return (
      <AlertLog {...this.props} />
    )
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.alertlog.loading,
  alertLogs: state.alertlog.alertLogs,
  pageSize: 10,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadData: (page: any, pageSize: any) => {
    dispatch(loadAlertLogs())
    dispatch(fetchAlertLogs(page, pageSize))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertLogContainer)
