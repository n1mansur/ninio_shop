import { Box, Button, Card, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import { MinusIcon, PlusIcon } from '@/components/svg.js'
import { useRouter } from 'next/router';
import YoutubePlayer from '@/components/UI/YoutubePlayer';
import { HeartIcon } from '@/components/svg'
import { useResponsive } from '@/hooks/useResponsive'

export default function ProductSecrion({ el }) {
  const [isOpen, setIsOpen] = useState('Video');
  const [tofavorite, setTofavorite] = useState([]);
  const md = useResponsive('md')

  const router = useRouter();
  const toast = useToast()
  const [quantity, setQuantity] = useState(1);
  const formattedNumber = el?.sell_price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  const warningFn = () => {
    toast({
      title: `Добавлено! можете изменить количество в корзинке`,
      status: 'warning',
      isClosable: true,
      position: 'top'
    })
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

  const addedFn = (products) => {
    products.push({ ...el, quantity })
    toast({
      title: `Добавлено`,
      status: 'success',
      isClosable: true,
      position: 'top'
    })
  }

  const addInBasket = () => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    const find = products.some(product => product.guid == el.guid)
    !find ? addedFn(products) : warningFn(products)
    localStorage.setItem('products', JSON.stringify(products))
    router.back()
  }
  const url = el?.url_link_youtube
  const videoId = url?.split("=")[1]

  return (
    <Box className={styles.product}>
      <Card className={styles.card}>
        {url
          ? <Box className={styles.gallery}>
            <Box className={styles.cardImg}>
              {
                isOpen != 'Изображение'
                  ? <img className={styles.img} src={el?.photo} alt={el?.name} />
                  : <YoutubePlayer videoId={videoId} />
              }
            </Box>
            <Button
              onClick={() => setIsOpen(old => old == 'Video' ? 'Изображение' : 'Video')}
              color={'#fff'} bg={'#033246'}
            >{isOpen}</Button>
          </Box>
          :
          <Box className={styles.gallery}>
            <Box className={styles.cardImg}>
              <img className={styles.img} src={el?.photo} alt={el?.name} />
            </Box>
          </Box>
        }
        <Card className={styles.section}>
          <Heading className={styles.heading}>
            {el?.name}
          </Heading>
          <Text className={styles.text}>{formattedNumber} сум</Text>
          <hr className={styles.hr} />
          <Box className={styles.dFlex}>
            <Text className={styles.characteristics}>Характеристики</Text>
            <Button
              bg={!md && toggle?.length > 0 ? '#84919A' : 'none'}
              onClick={() => toFavoritesProduct(el)}
              color={toggle?.length > 0 ? '#fff' : '#000'}
              className={styles.likedBtn}>
              {
                md
                  ? <HeartIcon bg={toggle?.length > 0 ? '#84919A' : 'none'} />
                  : 'Избранное'
              }
            </Button>
          </Box>
          <div className={styles.cardInfo}>
            <Text>Объем</Text>
            <div className={styles.borderBottom}></div>
            <Text>{el?.volume}</Text>
          </div>
          <div className={styles.cardInfo}>
            <Text>Бренд</Text>
            <div className={styles.borderBottom}></div>
            <Text>{el?.brands_id_data.name}</Text>
          </div>
          <div className={styles.cardInfo}>
            <Text>Возраст</Text>
            <div className={styles.borderBottom}></div>
            <Text>{el?.age}</Text>
          </div>
          <div className={styles.cardInfo}>
            <Text>Страна производства</Text>
            <div className={styles.borderBottom}></div>
            <Text>{el?.product_country_id_data.name_of_country}</Text>
          </div>
          <div className={styles.bySection}>
            <Box className={styles.countSection}>
              <Button className={styles.countBtn} onClick={() => setQuantity(old => old > 1 ? old - 1 : old)}>
                <MinusIcon />
              </Button>
              <span>{quantity}</span>
              <Button className={styles.countBtn} onClick={() => setQuantity(old => old + 1)}>
                <PlusIcon />
              </Button>
            </Box>
            {
              el?.status ?
                <Button className={styles.inCartBtn}
                  onClick={() => addInBasket()}>
                  Добавить в корзину
                </Button> :
                <Button className={`${styles.inCartBtn} ${styles.disabled}`}>
                  Добавить в корзину
                </Button>
            }
          </div>
        </Card>
      </Card>
    </Box>
  )
}
