import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import MainSection from './MainSection'
import * as actions from '../actions'

function App(props) {
  return (<div>
    <Header />
    <MainSection {...props} />
  </div>)
}

function mapStateToProps(state) {
  return state.scout.toJS()
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
