import { Box, Flex, Heading, Text, Button, Card, Img, Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { HeartIcon, DeleteIcon, PlusIcon, MinusIcon } from '@/components/svg'
import { useResponsive } from '@/hooks/useResponsive'

export default function BasketCard({ el, toFavorite, setProducts }) {
  const md = useResponsive('md')
  const [quantity, setQuantity] = useState(el.quantity);
  const [tofavorite, setTofavorite] = useState([]);

  const formattedNumber = el?.sell_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  const deleteProduct = (el) => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    products = products.filter(old => old.guid != el.guid)
    setProducts(products)
    localStorage.setItem('products', JSON.stringify(products))
  }

  const toFavoritesProduct = (el) => {
    let tofavoriteProducts = JSON.parse(localStorage.getItem('toFavorites')) || []
    const find = tofavoriteProducts.find(old => old === el.guid)
    find
      ? tofavoriteProducts = tofavoriteProducts.filter(old => old != el.guid)
      : tofavoriteProducts.push(el.guid)
    setTofavorite(tofavoriteProducts)
    localStorage.setItem('toFavorites', JSON.stringify(tofavoriteProducts))
  }

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    products = products.map(old => old.guid == el.guid ? { ...old, quantity: quantity } : old)
    setProducts(products)
    localStorage.setItem('products', JSON.stringify(products))
  }, [quantity])

  useEffect(() => {
    let tofavoriteProducts = JSON.parse(localStorage.getItem('toFavorites')) || []
    setTofavorite(tofavoriteProducts)
  }, []);

  const changeCount = (value) => {
    switch (value) {
      case 'plus':
        return (setQuantity(old => old + 1))
      case 'minus':
        return (setQuantity(old => old > 1 ? old - 1 : old))
    }
  }

  const img = (
    <Box mb={md && '10px'} className={styles.productImg}>
      <img src={el.photo} alt={el.name} />
    </Box>
  )

  const productName = (
    <div className={styles.productName}>
      <h2 >
        {el.name}
      </h2>
    </div>
  )

  const productPrice = (
    <div className={styles.productPriceBox}>
      <h2 className={styles.productPrice}>
        {formattedNumber} сум
      </h2>
    </div>
  )
 const toggle = tofavorite?.filter(old => old === el.guid)

  const controlBtns = (
    <div className={styles.controlBtns}>
      <Button className={styles.favoriteBtn} onClick={() => toFavoritesProduct(el)}>
        <HeartIcon bg={toggle?.length > 0 ? '#84919A' : 'none'} />
        <span>
          В избранное
        </span>
      </Button>
      <span className={styles.hr}></span>
      <Button className={styles.deleteBtn} onClick={() => deleteProduct(el)}>
        <DeleteIcon />
        <span>
          Удалить
        </span>
      </Button>
    </div>
  )

  const plusMinusBtns = (
    <div className={styles.plusMinusBtns}>
      <Button className={styles.plusMinusBtn} onClick={() => changeCount('minus')} >
        <MinusIcon />
      </Button>
      <span className={styles.quantity}>{quantity}</span>
      <Button className={styles.plusMinusBtn} onClick={() => changeCount('plus')} >
        <PlusIcon />
      </Button>
    </div>
  )

  return (
    <div>
      <Box className={styles.basketCard}>
        <Box>
          {img}
          {md && productPrice}
        </Box>
        <Flex flexDir={'column'} w={'100%'} justifyContent={'space-between'}>
          <Flex w={'100%'} justifyContent={'space-between'} mb={'24px'}>
            {productName}
            {!md && productPrice}
          </Flex>
          <Flex w={'100%'} justifyContent={'space-between'} flexWrap={'wrap-reverse'}>
            {!md && controlBtns}
            {plusMinusBtns}
          </Flex>
        </Flex>
      </Box>
      {md && controlBtns}
    </div>
  )
}
