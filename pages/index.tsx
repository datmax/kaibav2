import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-xl text-white text-center">
        <p>Kaibexv2 is a preview of the upcoming Kaibex update.</p>
        <p className='underline'>Evrything you see is a WIP and subject to change.</p>
        <p>Click on the wolf logo for the menu.</p>
      </div>
    </div>
  )
}

export default Home
