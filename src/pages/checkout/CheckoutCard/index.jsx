import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { HeartIcon, DeleteIcon, PlusIcon, MinusIcon } from '@/components/svg'
import { useResponsive } from '@/hooks/useResponsive'

export default function Card({ el, toFavorite, setProducts }) {
  const md = useResponsive('md')

  const formattedNumber = el?.sell_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

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
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}
