import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Stats from '../components/Stats'
import Footer from '../components/Footer'

const { Content } = Layout
export default props => (
  <Layout>
    <Header />
    <Content>
      <Stats {...props} />
    </Content>
    <Footer />
  </Layout>
)
