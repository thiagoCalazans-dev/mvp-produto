import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/Navbar'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Footer } from '../components/Footer'


function MyApp({ Component, pageProps }: AppProps) {

  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  interface IcontextClass  {
    success: string,
    error: string,
    info: string,
    warning: string,
    default: string,
    dark: string,
  }
  
  return (
  <div className='flex flex-col w-screen h-screen'>
  <QueryClientProvider client={queryClient}>  
  <Navbar/>
  <div className="grow">
  <Component {...pageProps}/>
  </div>
  <Footer/>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  <ToastContainer 
  theme='dark'
  progressClassName="progress-bar"   
  position="bottom-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover/>
  </div>
  
  )
}

export default MyApp
