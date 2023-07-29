import React from 'react'
import styles from './styles.module.scss'
import { Box, Card, Heading, Img, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function BrandCategories({ data}) {

  const brands = data.brands
  return (
    <Box className={styles.brandCategories}>
      <Heading className={styles.heading}>Продукты от всех брендов</Heading>
      <Box className={styles.cards}>
        {brands && brands.map(brand => (
          <Link href={`/products/brands_id?id=${brand.guid}`} className={styles.card} key={brand.guid}>
            {
              brand.photo
                ? <Img src={brand.photo} alt={brand.name} className={styles.cardImg} />
                : <Text>{brand.name}</Text>
            }
          </Link>
        ))}
      </Box>
    </Box>
  )
}
