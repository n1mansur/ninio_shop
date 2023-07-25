import { Box, Text } from '@chakra-ui/react'
import logo from '@/../public/images/LOGO.png'
import styles from './styles.module.scss'

const Logo = () => {
  return (
    <Box className={styles.logo}>
      <img className={styles.img} src={logo.src} alt="LOGO" />
    </Box>
  )
}
export default Logo
