import React, { useEffect, useState } from 'react'
import { Box, Button, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { HeartIcon } from '@/components/svg'
import styles from './styles.module.scss'

export default function ProductCard({ el }) {
  const [tofavorite, setTofavorite] = useState([]);

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

  return (
    <Box onClick={() => {
      window.location.href = `/product/${el.guid}`
    }}
      w={'auto'}
      h={'auto'}
    >
      <Box
        className={styles.product} key={el.guid}
      >
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
            <Image src={el.photo} />
          </Box>
        </Box>
        <Box className={styles.productInfo}>
          <Text className={styles.productCategory}>
            {el.categories_id_data.name}
          </Text>
          <Text className={styles.productName}>
            <span>{el.name}</span>
          </Text>
          <Text className={styles.productPrice}>{el.sell_price} Сум</Text>
        </Box>
        {/*<Link
          href={`/product/${el.guid}`}
        >*/}
          <Button className={styles.buyBtn}>Добавить</Button>
        {/*</Link>*/}
      </Box>
    </Box>
  )
}
