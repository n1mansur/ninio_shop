import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import colors from './colors'
import { tabsTheme } from './components/Tab.theme'
const theme = extendTheme(
  {
    colors,
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: '#033246',
        },
      },
      Modal: {
        defaultProps: {
          isCentered: true,
          scrollBehavior: 'inside',
        },
      },
      Tabs: tabsTheme,
      Button: {
        variants: {
          outline: (props) => {
            return {
              color: `${props.colorScheme}.500`,
            }
          },
          ghost: (props) => {
            return {
              color: `${props.colorScheme}.500`,
            }
          },
        },
        defaultProps: {
          focusBorderColor: '#033246',
        },
        // baseStyle: {
        //   borderRadius: '8px',
        // },
      },
      // Badge: {
      //   baseStyle: {
      //     borderRadius: '28px',
      //   }
      // }
    },
    styles: {
      global: {
        h1: {
          fontSize: '26px',
        },
        h2: {
          fontSize: '19.5px',
        },
        h3: {
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: '',
  })
)

export default theme
