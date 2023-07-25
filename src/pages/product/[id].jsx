import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService.js'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import Container from '@/components/UI/Container'
import { Box, Heading} from '@chakra-ui/react'
import styles from './styles.module.scss'
import Product from './ProductSecrion'
import ProductCard from '@/components/UI/ProductCard'


export default function ProductPage({products, category}) {
  const router = useRouter()
  //console.log(products)

  const productData = products?.filter(el => el.guid == router.query.id)?.[0]
  const similar = products?.filter(el => el.categories_id == productData.categories_id && el.guid != router.query.id && el.status)
  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container>
          {productData && <Product el={productData} />}
          {similar.length > 0 ? <Box mb={'24px'}>
            <Heading fontWeight={'600'} fontSize={'30px'} mb={'24px'}>Похожие товары</Heading>
            <Box className={styles.cards} >
              {similar.map(el => <ProductCard el={el} key={el.guid} />)}
            </Box>
          </Box> :
            <Heading fontWeight={'600'} textAlign={'center'} fontSize={'30px'} mb={'24px'}>Похожих товаров нет</Heading>
          }
        </Container>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const [ categoryData, productsData] =
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