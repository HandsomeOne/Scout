import React from 'react'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

export default () => (
  <div>
    <Header selectedKeys={['dashboard']} />
    <Dashboard />
  </div>
)
