import React, { useEffect, useState } from 'react'
import { Box, Button, Image, Text, Tooltip, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { HeartIcon } from '@/components/svg'
import styles from './styles.module.scss'

export default function ProductCard({ el }) {
  const toast = useToast()
  const [tofavorite, setTofavorite] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({ guid: el.guid, quantity: 1 });

  function checkDate(dateStr) {
    const today = new Date()
    const [year, month, day] = dateStr.split('-')
    const date = new Date(year, month - 1, day)
    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24))
    return diff < 7
  }

  useEffect(() => {
    let tofavoriteProducts = JSON.parse(localStorage.getItem('toFavorites')) || []
    setTofavorite(tofavoriteProducts)
  }, []);

  const toFavoritesProduct = (el) => {
    let tofavoriteProducts = JSON.parse(localStorage.getItem('toFavorites')) || []
    const find = tofavoriteProducts.find(old => old === el.guid)
    find
      ? tofavoriteProducts = tofavoriteProducts.filter(old => old != el.guid)
      : tofavoriteProducts.push(el.guid)
    setTofavorite(tofavoriteProducts)
    localStorage.setItem('toFavorites', JSON.stringify(tofavoriteProducts))
  }

  const toggle = tofavorite?.filter(old => old === el.guid)

  const formattedNumber = el?.sell_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  const plusFn = () => {
    setProduct(old => ({ ...old, quantity: old.quantity + 1 }))
  }

  const minusFn = () => {
    setProduct(old => ({ ...old, quantity: old.quantity > 1 ? old.quantity - 1 : old.quantity }))
  }

  const addedFn = (products, product) => {
    products.push({ guid: product.guid, quantity: product.quantity })
    toast({
      title: `Добавлено`,
      status: 'success',
      isClosable: true,
      position: 'top'
    })
  }

  const warningFn = () => {
    toast({
      title: `Добавлено! можете изменить количество в корзинке`,
      status: 'warning',
      isClosable: true,
      position: 'top'
    })
  }

  const inCart = (product) => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    const find = products.some(old => old.guid == product.guid)
    !find ? addedFn(products, product) : warningFn()
    localStorage.setItem('products', JSON.stringify(products))
  }

  return (
    <Box
      w={'auto'}
      h={'auto'}
      className={styles.productCard}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        className={styles.product} key={el.guid}
      >
        <Box onClick={() => { window.location.href = `/product/${el.guid}` }}>
          <Box className={styles.heroSection}>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              flexDir={'row-reverse'}
              position={'relative'}
              zIndex={'10'}
            >
              <Button className={styles.likedBtn} onClick={(e) => {
                e.stopPropagation()
                toFavoritesProduct(el)
              }}>
                <HeartIcon bg={toggle?.length > 0 ? '#84919A' : 'none'} />
              </Button>
              {
                checkDate(el.create_date.slice(0, 10)) ?
                  <Text className={styles.status}>Новинка</Text> : null
              }
            </Box>
            <Box
              position={'relative'}
              zIndex={'1'}
              className={styles.cardImg}
            >
              <Image src={el.photo} alt={el.name} />
            </Box>
          </Box>
          <Box className={styles.productInfo}>
            <Text className={styles.productCategory}>
              {el.categories_id_data.name}
            </Text>
            <Text className={styles.productName}>
              <Tooltip label={el.name} aria-label='A tooltip'>
                <span>{el.name}</span>
              </Tooltip>
            </Text>
            <Text className={styles.productPrice}>{formattedNumber} Сум</Text>
          </Box>
        </Box>
        <div>
          {open ?
            <Box className={styles.btns}>
              <Button bg={'#033246'} onClick={() => minusFn(el)}>-</Button>
              <Button onClick={() => inCart(product)} bg={'#033246'}>Добавить {product.quantity}</Button>
              <Button bg={'#033246'} onClick={() => plusFn(el)}>+</Button>
            </Box>
            : <Button className={styles.buyBtn}>Добавить</Button>}
        </div>
      </Box>
    </Box>
  )
}
