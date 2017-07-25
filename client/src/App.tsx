import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as React from 'react'
import { Layout } from 'antd'

import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import AlertLog from './components/AlertLog'
import Stats from './components/Stats'
import Header from './components/Header'
import Footer from './components/Footer'

const { Content } = Layout
export default function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px 0' }}>
          <Route exact={true} path="/" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/alertlog" component={AlertLog} />
          <Route path="/stats/:id" component={Stats} />
        </Content>
        <Footer />
      </Layout>
    </Router>
  )
}
