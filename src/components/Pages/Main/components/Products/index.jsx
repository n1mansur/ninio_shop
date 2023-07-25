import React from 'react'
import styles from './styles.module.scss'
import { Box } from '@chakra-ui/react'
import ProductCard from '@/components/UI/ProductCard'

export default function Products({ data }) {

  return (
    <Box className={styles.products}>
      {data && data.map((el) => {
        return el.status ? (
          <ProductCard el={el} key={el.guid} />
        ) : null
      })}
    </Box>
  )
}
