import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './styles.module.scss'

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useResponsive'

export default function Slider({ data }) {
  const md = useResponsive('md')
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        rewind={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {data.map((el) => (
          <SwiperSlide className={styles.slide} key={el?.guid}>
            <Link href={el.url_link}>
              <img
                className={styles.img}
                src={!md ? el?.image_pc : el.image_phone}
                alt="Banner"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
