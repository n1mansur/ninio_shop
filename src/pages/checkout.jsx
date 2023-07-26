import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import CheckoutPage from '../components/CheckoutPage'

const Home = (props) => {
  return (
    <>
      <SEO />
      <MainLayout products={props.products} category={props.category}>
        <CheckoutPage data={props} />
      </MainLayout>
    </>
  )
}

export default Home