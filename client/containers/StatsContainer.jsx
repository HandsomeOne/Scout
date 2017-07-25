import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { fetchStats, fetchStatsHealth, fetchStatsErrorlog } from '../actions/stats'
import Stats from '../components/Stats/index'

class StatsContainer extends Component {
  state = {
    loadFinish: false,
  }

  componentWillMount() {
    const { id, since, interval } = this.props
    const me = this
    this.props.onLoad(id, since, interval, (isSucc) => {
      me.setState({ loadFinish: isSucc })
    })
  }

  render() {
    return (
      this.state.loadFinish && <Stats {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  since: 1440,
  interval: 30,
  common: state.stats.common,
  health: state.stats.health,
  logs: state.stats.logs,
})

const mapDispatchToProps = dispatch => ({
  onLoad: (id, since, interval, callback) => {
    Promise.all([
      dispatch(fetchStats(id, since)),
      dispatch(fetchStatsHealth(id, since, interval)),
      dispatch(fetchStatsErrorlog(id, since)),
    ]).then((results) => {
      (callback !== undefined) && callback(results.every(e => (e === true)))
    })
  },
})

StatsContainer.propTypes = {
  id: T.string,
  since: T.number,
  interval: T.number,
  onLoad: T.func,
}


export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
