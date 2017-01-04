import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
import $ from './container.css'

const { Content } = Layout
export default props => (
  <Layout>
    <Header />
    <Content className={$.content}>
      <Stats {...props} />
    </Content>
    <Footer />
  </Layout>
)
