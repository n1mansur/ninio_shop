import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Box, SimpleGrid } from '@chakra-ui/react'
import ProductCard from '@/components/UI/ProductCard'
import Link from 'next/link'
import { discountsService } from '../../../../../services/discountsService'
import DiscountProductCard from '../../../../UI/DiscountProductCard'

export default function Products({ data }) {
  const products = data.filter(el => el.status).slice(0, 8)
  const [dis, setDis] = useState([]);
  useEffect(() => {
    discountsService?.getList({ data: { with_relations: true } }).then(res => setDis(res.data.response))
  }, []);

  return (
    <Box mb={'24px'}>
      <Box  display={'flex'} overflow={'scroll'} gap={'10px'} mb={'24px'}>
        {dis && dis.map((el) => {
          return (
            <DiscountProductCard el={el.products_id_data} discount={el} key={el.guid} />
          )
        })}
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={'15px'} >
        {products && products.map((el) => {
          return (
            <ProductCard el={el} key={el.guid} />
          )
        })}
      </SimpleGrid>
      {products.length > 8 && <Box w={'100%'} display={'flex'} justifyContent={'end'}>
        <Link href={`/products/`}>Смотреть все</Link>
      </Box>}
    </Box>
  )
}
