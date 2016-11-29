import React from 'react'
import Header from '../components/Header'
import Settings from '../components/Settings'

export default function () {
  return (<div>
    <Header selectedKeys={['settings']} />
    <Settings />
  </div>)
}
