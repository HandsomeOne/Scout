import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Footer from '../components/Footer'
import $ from './container.css'

const { Content } = Layout
export default () => (
  <Layout>
    <Header selectedKeys={['dashboard']} />
    <Content className={$.content}>
      <Dashboard />
    </Content>
    <Footer />
  </Layout>
)
