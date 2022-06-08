import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/Navbar'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
  <div className='flex flex-col w-screen h-screen'>
  <QueryClientProvider client={queryClient}>
  <Navbar/>
  <div className="grow">
  <Component {...pageProps}/>
  </div>
  <footer className="w-full text-center h-8 bg-base-800"> GCASPP 2022</footer>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </div>
  
  )
}

export default MyApp
