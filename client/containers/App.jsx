import React from 'react'
import Header from '../components/Header'
import MainSection from '../components/MainSection'

export default props => (
  <div>
    <Header selectedKeys={['scout']} />
    <MainSection {...props} />
  </div>
)
