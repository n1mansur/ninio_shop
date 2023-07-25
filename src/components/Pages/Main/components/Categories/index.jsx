import React from 'react'
import styles from './styles.module.scss'
import { Box, Heading, Img, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Categories({ data }) {
  const category = data.filter((el) => !el.categories_id)

  return (
    <Box className={styles.categories}>
      <Heading className={styles.heading}>Товары по категориям</Heading>
      <Box className={styles.cards}>
        {category.map((el) => (
          <Link href={`/products/${el.guid}`} className={styles.card} key={el.guid}>
           <Box className={styles.cardImg}>
            <img src={el.photo} alt={el?.name} />
           </Box>
            <Text className={styles.cardName}>
              {el?.name}
            </Text>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
