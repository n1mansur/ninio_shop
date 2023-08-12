import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Box, SimpleGrid } from '@chakra-ui/react'
import ProductCard from '@/components/UI/ProductCard'
import Link from 'next/link'
import { discountsService } from '../../../../../services/discountsService'
import DiscountProductCard from '../../../../UI/DiscountProductCard'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Products({ data }) {
  const products = data.filter(el => el.status).slice(0, 8)
  const [dis, setDis] = useState([]);
  useEffect(() => {
    discountsService?.getList({ data: { with_relations: true } }).then(res => setDis(res.data.response))
  }, []);

  return (
    <Box mb={'24px'}>
      {/*<Box className={styles.discountProducts} >*/}
      <Swiper
        style={{ marginBottom:'24px'}}
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={10}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        rewind={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Pagination]}
      >
        {dis && dis.map((el) => {
          return (
            <SwiperSlide className={styles.swiperSlide} key={el.guid} >
              <DiscountProductCard el={el.products_id_data} discount={el}/>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {/*</Box>*/}
      <SimpleGrid columns={[2, 3, 4]} spacing={'15px'} >
        {products && products.map((el) => {
          return (
            <ProductCard el={el} key={el.guid} />
          )
        })}
      </SimpleGrid>
      {products.length > 8 && <Box w={'100%'} display={'flex'} justifyContent={'end'}>
        <Link href={`/products/`}>Смотреть все</Link>
      </Box>}
    </Box>
  )
}
