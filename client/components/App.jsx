import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { Layout } from 'antd'

import Dashboard from './Dashboard'
import Settings from './Settings'
import AlertLog from './AlertLog'
import Stats from './Stats'
import Header from './Header'
import Footer from './Footer'

const { Content } = Layout
export default function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px 0' }}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/alertlog" component={AlertLog} />
          <Route path="/stats/:id" component={Stats} />
        </Content>
        <Footer />
      </Layout>
    </Router>
  )
}
