import React from 'react'
import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import styles from './styles.module.scss'
import { productsService } from '@/services/productsService.js'
import { categoryService } from '@/services/categoryService'
import Favorites from '../../components/Pages/favourites'



export default function FavouritesPage({ products, category }) {
  return (
    <>
      <SEO />
      <MainLayout products={products} category={category} wrapperSty={styles.bg}>
       <Favorites products={products}/>
      </MainLayout>
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
