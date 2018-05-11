import * as React from 'react'
import { connect } from 'react-redux'
import {
  loadScouts,
  fetchScouts,
  patchScouts,
  addScout,
  deleteScout,
  patchScout,
  fetchScout,
  cleanChosenScout,
  cleanSelectedScouts,
  selectScouts,
} from '../actions/scouts'
import Dashboard from '../components/Dashboard/index'

class DashboardContainer extends React.Component<any> {
  render() {
    return <Dashboard {...this.props as any} />
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.scouts.loading,
  scouts: state.scouts.scouts,
  scout: state.scouts.chosenScout,
  activeId: state.scouts.activeId,
  selectedScouts: state.scouts.selectedScouts,
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchScouts: () => {
    dispatch(loadScouts())
    dispatch(fetchScouts())
  },
  patchScouts: (selectedScouts: any, patch: any, callback: any) => {
    dispatch(loadScouts())
    dispatch(patchScouts(selectedScouts, patch)).then((isSucc: any) => {
      if (callback) {
        callback(isSucc)
      }
    })
  },
  cleanSelectedScouts: () => {
    dispatch(cleanSelectedScouts())
  },
  selectScouts: (selectedScouts: any) => {
    dispatch(selectScouts(selectedScouts))
  },

  addScout: (data: any, callback: any) => {
    dispatch(addScout(data)).then((isSucc: any) => {
      if (callback) {
        callback(isSucc)
      }
    })
  },
  deleteScout: (id: any, callback: any) => {
    dispatch(deleteScout(id)).then((isSucc: any) => {
      if (callback) {
        callback(isSucc)
      }
    })
  },
  patchScout: (id: any, data: any, callback: any) => {
    dispatch(patchScout(id, data)).then((isSucc: any) => {
      if (callback) {
        callback(isSucc)
      }
    })
  },
  fetchScout: (id: any, callback: any) => {
    dispatch(fetchScout(id)).then((isSucc: any) => {
      if (callback) {
        callback(isSucc)
      }
    })
  },
  cleanChosenScout: () => {
    dispatch(cleanChosenScout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
