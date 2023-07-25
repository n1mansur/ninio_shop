import { Box } from '@chakra-ui/react'
import styles from './styles.module.scss'

const Container = ({ children, ...props }) => {
  return (
    <Box className={styles.container} {...props}>
      {children}
    </Box>
  )
}
export default Container
