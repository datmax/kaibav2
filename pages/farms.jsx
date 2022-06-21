import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { useFarmsStatic, useFarmsDynamic } from '../hooks/useFarms'
import FarmUnit from '../components/FarmUnit'
import { getPriceByAddress } from '../web3/web3Helper'

const KAIBA = '0xF2210f65235c2FB391aB8650520237E6378e5C5A'
const FANG = '0x988fc5e37281f6c165886db96b3fdd2f61e6bb3f'

const Farms = () => {
  const { kaibaPool, fangPool, kaibaApy, fangApy } = useFarmsStatic()
  const [tvl, setTvl] = useState('--')
  const [kaibaPrice, setKaibaPrice] = useState(0)
  const [fangPrice, setFangPrice] = useState(0)

  useEffect(async () => {
    if (kaibaPool && fangPool) {
      const kaibaPrice = await getPriceByAddress(KAIBA)
      const fangPrice = await getPriceByAddress(FANG)
      setKaibaPrice(kaibaPrice)
      setFangPrice(fangPrice)
      const a = (kaibaPrice * kaibaPool.amount_in) / Math.pow(10, 9)
      const b = (fangPrice * fangPool.amount_in) / Math.pow(10, 18)
      setTvl((a + b).toFixed(2))
    }
  }, [fangPool, kaibaPool])
  return (
    <div className="flex min-h-screen flex-col items-center  py-2">
      <Head>
        <title>Kaibex: farms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-20 text-center font-thin text-white">
        <h1 className="pb-4 text-3xl">Farms</h1>
        <h1 className="text-xl"> TVL: {tvl >= 0 ? tvl : "--"}</h1>
      </div>
      <div className="mt-10 grid grid-cols-1 place-content-center sm:mt-40 md:grid-cols-2">
        <FarmUnit
          infos={kaibaPool}
          apy={kaibaApy}
          name="KAIBA/FANG"
          icon="/kaiba-logo-white.png"
        ></FarmUnit>

        <FarmUnit
          infos={fangPool}
          apy={fangApy}
          name="FANG/FANG"
          icon="/fang.jpg"
        ></FarmUnit>
      </div>
    </div>
  )
}

export default Farms
