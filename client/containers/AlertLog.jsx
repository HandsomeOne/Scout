import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import AlertLog from '../components/AlertLog'
import Footer from '../components/Footer'
import $ from './container.css'

const { Content } = Layout
export default () => (
  <Layout>
    <Header selectedKeys={['alertlog']} />
    <Content className={$.content}>
      <AlertLog />
    </Content>
    <Footer />
  </Layout>
)
