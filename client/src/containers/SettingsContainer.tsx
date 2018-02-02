import * as React from 'react'
import { connect } from 'react-redux'
import { fetchSettings, patchSettings } from '../actions/settings'
import Settings from '../components/Settings/index'

class SettingsContainer extends React.Component<any> {
  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <Settings {...this.props} />
    )
  }
}

const mapStateToProps = (state: any) => ({ settings: state.settings.settings })

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: (data: any, callback: any) => {
    dispatch(patchSettings(data))
      .then((isSucc: any) => callback !== undefined && callback(isSucc))
  },
  onLoad: () => {
    dispatch(fetchSettings())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
