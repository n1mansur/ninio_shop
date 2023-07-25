import React from 'react'
import '@/styles/editorStyles.scss'
import '@/styles/globals.scss'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/queryClient'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import NavigationLoader from '@/components/UI/NavigationLoader'
import NextAdapterPages from 'next-query-params/pages'
import { QueryParamProvider } from 'use-query-params'
import '../../node_modules/react-quill/dist/quill.snow.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryParamProvider adapter={NextAdapterPages}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <NavigationLoader />
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </QueryParamProvider>
  )
}

export default MyApp
