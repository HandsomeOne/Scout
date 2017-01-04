import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Settings from '../components/Settings'
import Footer from '../components/Footer'
import $ from './container.css'

const { Content } = Layout
export default () => (
  <Layout>
    <Header selectedKeys={['settings']} />
    <Content className={$.content}>
      <Settings />
    </Content>
    <Footer />
  </Layout>
)
