import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadScouts, fetchScouts, patchScouts,
  addScout, deleteScout, patchScout, fetchScout,
  cleanChosenScout, cleanSelectedScouts, selectScouts } from '../actions/scouts'
import Dashboard from '../components/Dashboard/index'

class DashboardContainer extends Component {
  render() {
    return (
      <Dashboard {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.scouts.loading,
  scouts: state.scouts.scouts,
  scout: state.scouts.chosenScout,
  activeId: state.scouts.activeId,
  selectedScouts: state.scouts.selectedScouts,
})

const mapDispatchToProps = dispatch => ({
  fetchScouts: () => {
    dispatch(loadScouts())
    dispatch(fetchScouts())
  },
  patchScouts: (selectedScouts, patch, callback) => {
    dispatch(loadScouts())
    dispatch(patchScouts(selectedScouts, patch)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  cleanSelectedScouts: () => {
    dispatch(cleanSelectedScouts())
  },
  selectScouts: (selectedScouts) => {
    dispatch(selectScouts(selectedScouts))
  },

  addScout: (data, callback) => {
    dispatch(addScout(data)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  deleteScout: (id, callback) => {
    dispatch(deleteScout(id)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  patchScout: (id, data, callback) => {
    dispatch(patchScout(id, data)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  fetchScout: (id, callback) => {
    dispatch(fetchScout(id)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  cleanChosenScout: () => {
    dispatch(cleanChosenScout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
