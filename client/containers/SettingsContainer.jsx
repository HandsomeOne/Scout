import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { fetchSettings, patchSettings } from '../actions/settings'
import Settings from '../components/Settings/index'

class SettingsContainer extends Component {

  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <Settings {...this.props} />
    )
  }
}

const mapStateToProps = state => ({ settings: state.settings.settings })

const mapDispatchToProps = dispatch => ({
  onSubmit: (data, callback) => {
    dispatch(patchSettings(data)).then((isSucc) => {
      (callback !== undefined) && callback(isSucc)
    })
  },
  onLoad: () => {
    dispatch(fetchSettings())
  },
})

SettingsContainer.propTypes = {
  onLoad: T.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
