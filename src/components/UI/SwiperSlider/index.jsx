import React from 'react'
import styles from './styles.module.scss'
import { Img, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';

export default function SwiperSlider({ brands, ...props }) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      cssMode={true}
      mousewheel={true}
      keyboard={true}
      rewind={true}
      autoplay={{
        delay: 3500,
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
      className={styles.swiper}
      {...props}
    >
      {brands && brands.map(brand => (
        <SwiperSlide key={brand.guid} className={styles.swiperSlide}>
          <Link href={`/products/brands_id?id=${brand.guid}`} className={styles.card} >
            {
              brand.photo
                ? <Img src={brand.photo} alt={brand.name} className={styles.cardImg} />
                : <Text>{brand.name}</Text>
            }
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
