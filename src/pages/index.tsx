import type { NextPage } from 'next'
import Image from 'next/image'





const Home: NextPage = () => {

 
  return (   
      <main className="h-full flex flex-col justify-center items-center">
        <Image src="/images/400dpiLogo.png" 
        alt="Logo da empresa" 
        layout="fill"
        />
      </main>   
  )
}

export default Home
