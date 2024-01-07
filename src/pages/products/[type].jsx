import React, { useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import styles from './index.module.scss'
import Container from '@/components/UI/Container'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { categoryService } from '@/services/categoryService'
import { productsService } from '@/services/productsService.js'
import { useRouter } from 'next/router'
import ProductCard from '@/components/UI/ProductCard'
import Pagination from '../../components/UI/Pagination'


export default function ProductsPage({ category, products }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const lastPostIndex = currentPage * 12
  const firstPostIndex = lastPostIndex - 12

  useEffect(() => {
    router.replace({
      query: { ...router.query, offset: firstPostIndex }
    });
  }, [currentPage]);

  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container>
          <Box className={styles.productsSection}>
            {products.response?.length > 0
              ? <SimpleGrid columns={[2, 3, 4]} spacing={'20px'} className={styles.cards} >
                {products.response?.map(el => el?.status && <ProductCard el={{ ...el, quantity: 1 }} key={el.guid} />)}
              </SimpleGrid>
              : <Heading>Товары закончились</Heading>}
          </Box>
          {
            products.count > 12 && <Box display={'flex'} justifyContent={'center'}>
              <Pagination
                totalProducts={products.count}
                count={12}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Box>
          }
        </Container>
      </MainLayout >
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const [categoryData, products] =
      await Promise.all([
        categoryService.getList({ data: { with_relations: true } }),
        productsService.getList({ data: { with_relations: true, status: true, [context.query.type]: context.query.id }, offset: context.query.offset, limit: 12 }),
      ])
    return {
      props: {
        category: categoryData.data.response ?? [],
        products: products.data ?? [],
      },
    }
  } catch (err) {
    return {
      props: {
        category: [],
        products: [],
      },
    }
  }
}