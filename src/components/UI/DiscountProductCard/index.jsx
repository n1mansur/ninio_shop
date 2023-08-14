import React, { useEffect, useState } from 'react'
import { Box, Button, Image, Text, Tooltip, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { HeartIcon } from '@/components/svg'
import styles from './styles.module.scss'
import {useResponsive}from '@/hooks/useResponsive.js'

export default function DiscountProductCard({ el, discount }) {
  const def = useResponsive()
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(el);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    products = products.map(p => {
      if (p.guid == el.guid) {
        setOpen(true)
        setProduct(p)
      }
    })
  }, []);

  function checkDate(dateStr) {
    const today = new Date()
    const [year, month, day] = dateStr.split('-')
    const date = new Date(year, month - 1, day)
    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24))
    return diff < 7
  }

  const oldPriceFormatted = discount?.old_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  const newPriceFormatted = discount?.new_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  const inCart = (el, operator) => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    let find = products.some(old => old.guid == el.guid)
    find ? products = products.map(p => {
      if (p.guid == el.guid) {
        operator == 'plus' ? setProduct({ ...p, quantity: p.quantity + 1 }) : setProduct({ ...p, quantity: p.quantity - 1 })
        return operator == 'plus' ? { ...p, quantity: p.quantity + 1 } : { ...p, quantity: p.quantity - 1 }
      } else {
        return p
      }
    })
      : products.push({ guid: el.guid, photo: el.photo, quantity: el.quantity, name: el.name, sell_price: el.sell_price })
    localStorage.setItem('products', JSON.stringify(products))
  }


  return (
    <Box w={'auto'} h={'auto'}>
      <Box className={styles.product} key={el.guid}>
        <Box onClick={() => {window.location.href = `/product/${discount.guid}?discount=true`}}>
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
              {el.brands_id_data.name}
            </Text>
            <Text className={styles.productName}>
              <Tooltip label={el.name} aria-label='A tooltip'>
                <span>{el.name}</span>
              </Tooltip>
            </Text>
            <div className={styles.prices}>
              <Text className={styles.oldPrice}>не {oldPriceFormatted} Сум</Text>
              <Text className={styles.newPrice}>{newPriceFormatted} Сум</Text>
            </div>
          </Box>
        </Box>
        <div>
        {open ?
            <Box className={styles.btns}>
              {product.quantity > 1 ? <Button bg={'#033246'} onClick={() => inCart(el, 'minus')}>-</Button> : <Button bg={'#0d3a4d8a'}>-</Button>}
              <div>{product.quantity}</div>
              <Button bg={'#033246'} onClick={() => inCart(el, 'plus')}>+</Button>
            </Box>
            : <Button onClick={() => { setOpen(true), inCart(el, 'plus') }} bg={'red'} className={styles.buyBtn}>Добавить</Button>
            }
        </div>
      </Box>
    </Box>
  )
}
