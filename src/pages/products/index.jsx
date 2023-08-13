import React, { useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import styles from './index.module.scss'
import Container from '@/components/UI/Container'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService'
import { useRouter } from 'next/router'
import ProductCard from '@/components/UI/ProductCard'
import Pagination from '../../components/UI/Pagination'

export default function ProductsPage({ products = [], category }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(12)
  const lastPostIndex = currentPage * count
  const firstPostIndex = lastPostIndex - count
  const data = products?.filter(el => el.status)?.slice(firstPostIndex, lastPostIndex)
  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container position={'relative'}>
          <Box className={styles.productsSection} mb={'24px'}>
            {data?.length > 0
              ? <SimpleGrid columns={[ 2, 3, 4]} spacing={'20px'} className={styles.cards} >
                {data?.map(el => el?.status && <ProductCard el={{ ...el, quantity: 0 }} key={el.guid} />)}
              </SimpleGrid>
              : <Heading>Товары закончились</Heading>
            }
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <Pagination
              totalTodos={products?.length}
              count={count}
              setCurrentPage={setCurrentPage}
              setCount={setCount}
              currentPage={currentPage}
              />
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