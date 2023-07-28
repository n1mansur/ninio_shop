import React from 'react'
import styles from './styles.module.scss'
import { Box, SimpleGrid } from '@chakra-ui/react'
import ProductCard from '@/components/UI/ProductCard'
import Link from 'next/link'

export default function Products({ data }) {
  const products = data.slice(0, 8)

  return (
    <Box mb={'24px'}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={'20px'} className={styles.products}>
        {products && products.map((el) => {
          return el.status ? (
            <ProductCard el={el} key={el.guid} />
          ) : null
        })}
      </SimpleGrid>
      {data.length > 6 && <Box w={'100%'} display={'flex'} justifyContent={'end'}>
        <Link href={`/products/`}>Смотреть все</Link>
      </Box>}
    </Box>
  )
}
