import * as React from 'react'
import { Layout, Icon } from 'antd'
import { colors as C, version } from '../../config'

const { Footer } = Layout
export default () => (
  <Footer style={{ textAlign: 'center' }}>
    <a
      href="https://github.com/HandsomeOne/Scout"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon type="github" /> Scout v{version}
    </a>
    <span style={{ color: '#ccc' }}> # </span>
    Made with Ant Design and <Icon type="heart" style={{ color: C.red }} />
    <span style={{ color: '#ccc' }}> # </span>
    <a
      href="https://github.com/HandsomeOne/Scout/issues/new"
      target="_blank"
      rel="noopener noreferrer"
    >
      报告问题
    </a>
  </Footer>
)
