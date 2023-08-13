import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService.js'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import Container from '@/components/UI/Container'
import { Box, Heading, SimpleGrid, Spinner} from '@chakra-ui/react'
import styles from './styles.module.scss'
import Product from './ProductSecrion'
import ProductCard from '@/components/UI/ProductCard'
import { discountsService } from '../../services/discountsService'

export default function ProductPage({products, category}) {
  const router = useRouter()
  const [discountProduct, setDiscountProduct] = useState();
  const [load, SetLoad] = useState(true);
  const discount = router.query?.discount || false

useEffect(() => {
  SetLoad(true)
  discountsService.getList(
    {
      data:
      {
        with_relations: true,
        guid: router.query.id
      },
      offset: 0
    }
  ).then(res => setDiscountProduct(res.data.response))
    .finally(() => SetLoad(false))
}, []);

  const productData = products?.filter(el => el.guid == router.query.id)?.[0]
  const similar = products?.filter(el => el.categories_id == productData?.categories_id && el.guid != router.query.id && el.status)
  return (
    !load ? <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
        <Container>
          {!discount
          ? productData && <Product el={productData} discount={false} />
          : discountProduct[0].products_id_data && <Product el={discountProduct[0].products_id_data} discount={discountProduct?.[0]} />
        }
          {similar.length > 0 ? <Box mb={'24px'}>
            <Heading fontWeight={'600'} fontSize={'30px'} mb={'24px'}>Похожие товары</Heading>
            <SimpleGrid columns={[ 2, 3, 4]} spacing={'20px'}  className={styles.cards} >
              {similar.map(el => <ProductCard el={{ ...el, quantity: 0 }} key={el.guid} />)}
            </SimpleGrid>
          </Box> :
            <Heading fontWeight={'600'} textAlign={'center'} fontSize={'30px'} mb={'24px'}>Похожих товаров нет</Heading>
          }
        </Container>
      </MainLayout>
    </>:<Box w={'100vw'} h={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Spinner />
    </Box>
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