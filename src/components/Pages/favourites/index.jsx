import { Box, Flex, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { readLocalStorage } from '@/helpers/localStorage.js'
import styles from './styles.module.scss'
import Container from '@/components/UI/Container'
import ProductCard from '@/components/UI/ProductCard'



export default function Favorites({ products: data }) {
  const [toFavorite, setЕoFavorite] = useState([]);

  const toFavoriteProducts = data?.filter(el => {
    return el.guid == toFavorite.filter(favEl => el.guid == favEl)
  }) || []
  useEffect(() => {
    const storedToFavorite = readLocalStorage('toFavorites');
    setЕoFavorite(storedToFavorite || []);
  }, []);

  return (
    <Box className={styles.favorites}>
      <Container>
        {toFavoriteProducts?.length > 0
          ? <SimpleGrid columns={[ 2, 3, 4]} spacing={'20px'} className={styles.products}>
            {toFavoriteProducts && toFavoriteProducts.map((el) => {
              return el.status ? (
                <ProductCard el={el} key={el.guid} />
              ) : null
            })}
          </SimpleGrid>
          : <Heading>
            Список пуст
          </Heading>}
      </Container>
    </Box>
  )
}
