import SEO from '@/components/SEO'
import MainLayout from '@/components/Layouts/MainLayout'
import CheckoutPage from '../components/CheckoutPage'

const Home = (props) => {
  return (
    <>
      <SEO />
        <CheckoutPage data={props} />
    </>
  )
}

export default Home