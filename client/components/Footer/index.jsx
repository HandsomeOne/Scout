import React from 'react'
import { Layout, Icon } from 'antd'
import { colors as C } from '../../config'

const { Footer } = Layout
export default () => (
  <Footer style={{ textAlign: 'center' }}>
    Made with Ant Design and <Icon type="heart" style={{ color: C.red }} />
  </Footer>
)
