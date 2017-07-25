import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { Layout } from 'antd'

import DashboardContainer from '../containers/DashboardContainer'
import SettingsContainer from '../containers/SettingsContainer'
import StatsContainer from '../containers/StatsContainer'
import AlertLogContainer from '../containers/AlertLogContainer'
import Header from './Header'
import Footer from './Footer'

const { Content } = Layout
export default function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px 0' }}>
          <Route exact path="/" component={DashboardContainer} />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/alertlog" component={AlertLogContainer} />
          <Route path="/stats/:id" component={StatsContainer} />
        </Content>
        <Footer />
      </Layout>
    </Router>
  )
}
