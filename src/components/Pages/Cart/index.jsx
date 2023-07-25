import { Box, Flex, Heading, Text, Button, Card, Img } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { readLocalStorage } from '@/helpers/localStorage.js'
import styles from './styles.module.scss'
import { TrashIcon } from '@/components/svg.js'
import Container from '@/components/UI/Container'
import BasketCard from './components/BasketCard'
import Link from 'next/link'

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [toFavorite, setЕoFavorite] = useState();

  useEffect(() => {
    const storedProducts = readLocalStorage('products');
    const storedToFavorite = readLocalStorage('toFavorites');
    setЕoFavorite(storedToFavorite || []);
    setProducts(storedProducts || []);
  }, []);

  const sum = products.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.sell_price;
  }, 0);

  const clearAll = () => {
    localStorage.setItem('products', JSON.stringify([]))
    setProducts([])
  }

  return (
    <Box className={styles.cart}>
      <Container>
        <Heading className={styles.heading}>
          Корзина
        </Heading>
        <Flex className={styles.cartSection}>
          <Box className={styles.cards}>
            {products.length ? <>
              <Flex className={styles.cardsHeader}>
                <Box>
                  <Text>Всего: {products.length} товара</Text>
                </Box>
                <Button onClick={() => clearAll()} className={styles.clearAllBtn} >
                  <TrashIcon />
                  Очистить корзину
                </Button>
              </Flex>
              <Box className={styles.cardsList}>
                {products.map(el => <Box key={el.guid} >
                  <BasketCard el={el} toFavorite={toFavorite} setProducts={setProducts} />
                  <hr />
                </Box>)}
              </Box>
            </> :
              <Text>
                Корзина пока пустая
              </Text>
            }
          </Box>
          {Boolean(products.length) && <Box className={styles.totalSection}>
            <Flex className={styles.flex}>
              <Heading className={styles.heading}>
                Итого
              </Heading>
            </Flex>
            <Flex className={styles.flex}>
              <Text>Всего: {products.length} товара</Text>
              <Text className={styles.sum}>
                {sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} сум
              </Text>
            </Flex>
            <Link
              href={`/checkout?products=${encodeURIComponent(JSON.stringify(products))}`}
              className={styles.buyBtn}>
              Перейти к оформлению
            </Link>
          </Box>}
        </Flex>
      </Container>
    </Box>
  )
}
