import React from 'react'
import styles from './styles.module.scss'
import { Box, Heading } from '@chakra-ui/react'
import SwiperSlider from '../../../../UI/SwiperSlider'


export default function BrandCategories({ data }) {

  const brands = data.brands

  const even = brands.filter(((el, i) => i % 2 == 0))
  const odd = brands.filter(((el, i) => i % 2 != 0))

  return (
    <Box className={styles.brandCategories}>
      <Heading className={styles.heading}>Продукты от всех брендов</Heading>

      <SwiperSlider brands={even} style={{
        marginBottom: "20px"
      }} />

      <SwiperSlider brands={odd} />

    </Box>
  )
}
