import React from 'react'
import Header from '../components/Header'
import Settings from '../components/Settings'

export default () => (
  <div>
    <Header selectedKeys={['settings']} />
    <Settings />
  </div>
)
