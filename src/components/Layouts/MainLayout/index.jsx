import React, { FC } from 'react'
import Footer from '@/components/UI/Footer'
import Header from '@/components/UI/Header'
import styles from './styles.module.scss'

const Layout = ({ children, products, wrapperSty, category }) => {
  return (
    <div className={`${styles.wrapper} ${wrapperSty}`}>
      <Header data={products} category={category} />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
