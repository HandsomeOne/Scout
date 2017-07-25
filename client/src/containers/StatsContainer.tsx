import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStats, fetchStatsHealth, fetchStatsErrorlog } from '../actions/stats'
import Stats from '../components/Stats/index'

class StatsContainer extends React.Component<any> {
  state = {
    loadFinish: false,
  }

  componentWillMount() {
    const { id, since, interval } = this.props
    const me = this
    this.props.onLoad(id, since, interval, (isSucc: any) => {
      me.setState({ loadFinish: isSucc })
    })
  }

  render() {
    return (
      this.state.loadFinish && <Stats {...this.props} />
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  id: ownProps.match.params.id,
  since: 1440,
  interval: 30,
  common: state.stats.common,
  health: state.stats.health,
  logs: state.stats.logs,
})

const mapDispatchToProps = (dispatch: any) => ({
  onLoad: (id: any, since: any, interval: any, callback: any) => {
    Promise.all([
      dispatch(fetchStats(id, since)),
      dispatch(fetchStatsHealth(id, since, interval)),
      dispatch(fetchStatsErrorlog(id, since)),
    ]).then((results) => {
      (callback !== undefined) && callback(results.every(e => (e === true)))
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
