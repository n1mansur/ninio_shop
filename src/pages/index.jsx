import MainPage from '@/components/Pages/Main'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import { bannerService } from '@/services/bannerService'
import { categoryService } from '@/services/categoryService'
import { productsService } from '@/services/productsService'
import { brandsService } from '@/services/brandsService'
import axios from 'axios'
import { useEffect } from 'react'
import styles from './styles.module.scss'

const Home = (props) => {
  return (
    <>
      <SEO />
      <MainLayout products={props.products} category={props.category}>
        <MainPage data={props} />
      </MainLayout>
    </>
  )
}

export default Home

export async function getServerSideProps() {
  try {
    const [bannerData, categoryData, productsData, brandsData] =
      await Promise.all([
        bannerService.getList({ data: { with_relations: true }, offset: 0 }),
        categoryService.getList({ data: { with_relations: true } }),
        productsService.getList({ data: { with_relations: true }, offset: 0 }),
        brandsService.getList({ data: { with_relations: true }, offset: 0 }),
      ])
    return {
      props: {
        brands: brandsData.data.response ?? [],
        products: productsData.data.response ?? [],
        category: categoryData.data.response ?? [],
        banner: bannerData.data.response ?? [],
      },
    }
  } catch (err) {
    return {
      props: {
        brands: [],
        products: [],
        category: [],
        banner: [],
      },
    }
  }
}
