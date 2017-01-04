import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Footer from '../components/Footer'

const { Content } = Layout
export default () => (
  <Layout>
    <Header selectedKeys={['dashboard']} />
    <Content>
      <Dashboard />
    </Content>
    <Footer />
  </Layout>
)
