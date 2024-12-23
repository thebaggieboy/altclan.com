import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination'
import '../styles/globals.css'
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout"

import { CartContextProvider } from '../context/CartContext'
import Providers from '../features/Providers';
import usePreviousRoute from '../hooks/usePreviousRoute'
import { HistoryProvider } from "../context/HistoryContext"

function App({ Component, pageProps }: AppProps) {

  const route = usePreviousRoute()
  

  return (
    <>
      <CartContextProvider>
        <HistoryProvider value={route}>
          <Providers>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Providers>
        </HistoryProvider>

      </CartContextProvider>



    </>

  )
}



export default App

