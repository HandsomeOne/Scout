import React from 'react'
import Header from '../components/Header'
import Stats from '../components/Stats'

export default props => (
  <div>
    <Header />
    <Stats {...props} />
  </div>
)
