import * as React from 'react'
import * as Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'
import './CodeEditor.css'

interface P {
  value?: string
  onChange?: (...args: any[]) => any,
}

export default class CodeEditor extends React.Component<P> {
  static defaultProps = {
    value: '',
    onChange: (e: any) => e
  }

  state = {
    value: this.props.value,
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      value: nextProps.value,
    })
  }
  updateCode = (newCode: string) => {
    this.props.onChange!(newCode)
  }
  render() {
    return (
      <Codemirror
        value={this.state.value}
        onChange={this.updateCode}
        options={{
          mode: 'javascript',
          theme: 'mdn-like',
          indentUnit: 2,
          tabSize: 2,
          lineNumbers: true,
          extraKeys: {
            Tab: (cm: any) => {
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
