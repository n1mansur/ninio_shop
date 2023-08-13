import React, { useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import styles from './index.module.scss'
import Container from '@/components/UI/Container'
import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService'
import { useRouter } from 'next/router'
import ProductCard from '@/components/UI/ProductCard'
import Pagination from '../../components/UI/Pagination'


export default function ProductsPage({ category, data, products }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const lastPostIndex = currentPage * 12
  const firstPostIndex = lastPostIndex - 12

  useEffect(() => {
    router.push({
      query: { offset: firstPostIndex }
    });
  }, [currentPage]);

  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container position={'relative'}>
          <Box className={styles.productsSection} mb={'24px'}>
            {data?.response?.length > 0
              ? <SimpleGrid columns={[2, 3, 4]} spacing={'20px'} className={styles.cards} >
                {data?.response?.map(el => el?.status && <ProductCard el={{ ...el, quantity: 1 }} key={el.guid} />)}
              </SimpleGrid>
              : <Heading>Товары закончились</Heading>
            }
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <Pagination
              totalProducts={data.count}
              count={12}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </Box>
        </Container>
      </MainLayout >
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const [categoryData, productsData, data] =
      await Promise.all([
        categoryService.getList({ data: { with_relations: true } }),
        productsService.getList({ data: { with_relations: true, status: true } }),
        productsService.getList({ data: { with_relations: true, status: true }, offset: context.query.offset, limit: 12 }),
      ])
    return {
      props: {
        category: categoryData.data.response ?? [],
        products: productsData.data.response ?? [],
        data: data.data ?? [],
      },
    }
  } catch (err) {
    return {
      props: {
        category: [],
        products: [],
        data: [],
      },
    }
  }
}