import { Box } from '@chakra-ui/react'
import Slider from './components/Slider'
import Categories from './components/Categories'
import Products from './components/Products'
import BrandCategories from './components/BrandCategories'
import styles from './styles.module.scss'
import Container from '@/components/UI/Container'

const MainPage = ({ data }) => {

  return (
    <Box className={styles.mainPage}>
      <Container>
        <Slider data={data.banner} />
        <Categories data={data.category} />
        <Products data={data.products} />
        <BrandCategories data={data} />
      </Container>
    </Box>
  )
}

export default MainPage
