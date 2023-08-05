import React from 'react'
import styles from './styles.module.scss'
import { Box, Heading, Img, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';

export default function Categories({ data }) {
  const category = data.filter((el) => !el.categories_id)

  return (
    <Box className={styles.categories}>
      <Heading className={styles.heading}>Товары по категориям</Heading>
      <Box className={styles.cards}>
        <Swiper
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
              slidesPerView: 1,
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
          className={styles.swiper}
        >
          {category.map((el) => (
            <SwiperSlide className={styles.swiperSlide}>
              <Link href={`/products/main_category?id=${el.guid}`} className={styles.card} key={el.guid}>
                <Box className={styles.cardImg}>
                  <img src={el.photo} alt={el?.name} />
                </Box>
                <Text className={styles.cardName}>
                  {el?.name}
                </Text>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
