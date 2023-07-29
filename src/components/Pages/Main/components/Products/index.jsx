import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Box, SimpleGrid } from '@chakra-ui/react'
import ProductCard from '@/components/UI/ProductCard'
import Link from 'next/link'
import { discountsService } from '../../../../../services/discountsService'
import DiscountProductCard from '../../../../UI/DiscountProductCard'

export default function Products({ data }) {
  const products = data.slice(0, 8)
  const [dis, setDis] = useState([]);
  useEffect(() => {
    discountsService?.getList({ data: { with_relations: true } }).then(res => setDis(res.data.response))
  }, []);
  //console.log(dis);
  return (
    <Box mb={'24px'}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={'20px'} className={styles.products}>
        {dis && dis.map((el) => {
          return (
            <DiscountProductCard el={el.products_id_data} discount={el} key={el.guid} />
          )
        })}
      </SimpleGrid>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={'20px'} className={styles.products}>
        {products && products.map((el) => {
          return el.status ? (
            <ProductCard el={el} key={el.guid} />
          ) : null
        })}
      </SimpleGrid>
      {data.length > 8 && <Box w={'100%'} display={'flex'} justifyContent={'end'}>
        <Link href={`/products/`}>Смотреть все</Link>
      </Box>}
    </Box>
  )
}
