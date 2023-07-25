import React from 'react'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import styles from './index.module.scss'
import Container from '@/components/UI/Container'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService'
import { useRouter } from 'next/router'
import ProductCard from '@/components/UI/ProductCard'


export default function ProductsPage({ products, category }) {
  const router = useRouter()
  const mainData = products?.filter(el => el.main_category === router.query.guid)
  const brandsData = products?.filter(el => el.categories_id === router.query.guid)
  //console.log(brandsData);
  const data = mainData.length > 0 ? mainData : brandsData
  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container>
          <Box className={styles.productsPage}>
            {data.length > 0
              ? <Box className={styles.cards} >
                {data.map(el => el?.status && <ProductCard el={el} key={el.guid} />)}
              </Box>
              : <Heading>Товары закончились</Heading>}
          </Box>
        </Container>
      </MainLayout >
    </>
  )
}

export async function getServerSideProps() {
  try {
    const [categoryData, productsData] =
      await Promise.all([
        categoryService.getList({ data: { with_relations: true } }),
        productsService.getList({ data: { with_relations: true }, offset: 0 }),
      ])
    return {
      props: {
        products: productsData.data.response ?? [],
        category: categoryData.data.response ?? [],
      },
    }
  } catch (err) {
    return {
      props: {
        products: [],
        category: [],
      },
    }
  }
}