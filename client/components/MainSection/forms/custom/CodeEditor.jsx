import React, { Component, PropTypes as T } from 'react'
import Codemirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default class CodeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.updateCode = this.updateCode.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    })
  }
  updateCode(newCode) {
    this.props.onChange(newCode)
  }
  render() {
    return (
      <Codemirror
        value={this.state.value}
        onChange={this.updateCode}
        options={{
          mode: 'javascript',
          indentUnit: 2,
          tabSize: 2,
          lineNumbers: true,
          extraKeys: {
            Tab: (cm) => {
              const spacesPerTab = cm.getOption('indentUnit')
              const spacesToInsert = spacesPerTab - (cm.doc.getCursor('start').ch % spacesPerTab)
              const spaces = ' '.repeat(spacesToInsert)
              cm.replaceSelection(spaces, 'end', '+input')
            },
          },
        }}
      />
    )
  }
}

CodeEditor.propTypes = {
  value: T.string.isRequired,
  onChange: T.func.isRequired,
}
CodeEditor.defaultProps = {
  value: '',
  onChange: e => e,
}
