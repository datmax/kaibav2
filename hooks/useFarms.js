import React, { useState, useEffect } from 'react'
import { BigNumber, ethers } from 'ethers'
import addresses from '../web3/addresses'
import farms from '../web3/farms'
import { getPriceByAddress } from '../web3/web3Api'
const testUrl =
  'https://rpc.tenderly.co/fork/0e1aee75-985d-42d2-ab4b-b30319d253f1'
const url = 'https://mainnet.infura.io/v3/8e8c4801cca84a098f713f7821399ee9'
const KAIBA = '0xF2210f65235c2FB391aB8650520237E6378e5C5A'
const FANG = '0x988fc5e37281f6c165886db96b3fdd2f61e6bb3f'
const dumb = '0x5c61a31d854E00C7446598898c67CC27744f8B88'
const LPPool = ''
export function useFarmsStatic() {
  const [fangPool, setFangPool] = useState(null)
  const [kaibaPool, setKaibaPool] = useState(null)
  const [LPPool, setLPPool] = useState(null)
  const [fangApy, setFangApy] = useState('-')
  const [kaibaApy, setKaibaApy] = useState('-')
  const [kaibaPrice, setKaibaPrice] = useState(0)
  const [fangPrice, setFangPrice] = useState(0)

  const [block, setBlock] = useState('-')

  const provider = new ethers.providers.StaticJsonRpcProvider(url)
  const farmContract = new ethers.Contract(farms.address, farms.abi, provider)

  useEffect(async () => {
    //TODO: DE-COMMENT ONCE POOLS AVAILABLE
    const kaibaPool = await farmContract.get_stakable_token(KAIBA)
    setKaibaPool(kaibaPool)
    const fangPoolInfo = await farmContract.get_stakable_token(FANG)
    console.log(fangPoolInfo)
    setFangPool(fangPoolInfo)

    /* 
    const fangoReward = await farmContract.get_reward_on_pool(
      dumb,
      0,
      true
    )
    const fangoQty = fangoPool.quantity
    const fangoPool = await farmContract.get_single_pool(
      dumb,
       0
     )
     const apiFango = await farmContract.get_apy(
      FANG,
      FANG,
      fangoQty / Math.pow(10,9),
      fangoReward / Math.pow(10,9)
      setFangApy("40")
      setFangPool(fangPoolInfo
    )*/

    const qty = 100
    const kaibaWeekly = await farmContract.get_reward_on_pool(dumb, 2, true)
    const kaibaMonthly = await farmContract.get_reward_on_pool(dumb, 1, true)
    const fangWeekly = await farmContract.get_reward_on_pool(dumb, 3, true)
    const fangMonthly = await farmContract.get_reward_on_pool(dumb, 4, true)
    const kaibaPrice = await getPriceByAddress(KAIBA)
    const fangPrice = await getPriceByAddress(FANG)
    setKaibaPrice(kaibaPrice)
    setFangPrice(fangPrice)

    const stakedKaibaPrice = 100 * kaibaPrice
    const stakedFangPrice = 100 * fangPrice

    const kaibaReward6 = (kaibaMonthly / Math.pow(10, 18)) * fangPrice
    const kaibaReward1 = (kaibaWeekly / Math.pow(10, 18)) * fangPrice
    const fangReward6 = (fangMonthly / Math.pow(10, 18)) * fangPrice
    const fangReward1 = (fangWeekly / Math.pow(10, 18)) * fangPrice

    const kaiba1Apy = (kaibaReward1 * 100) / stakedKaibaPrice
    const kaiba6Apy = (kaibaReward6 * 100) / stakedKaibaPrice
    const fang1Apy = (fangReward1 * 100) / stakedFangPrice
    const fang6Apy = (fangReward6 * 100) / stakedFangPrice

    console.log(fang6Apy)

    setKaibaApy(kaiba1Apy.toFixed(0) + '%/' + kaiba6Apy.toFixed(0) + '%')
    setFangApy(fang1Apy.toFixed(0) + '%/' + fang6Apy.toFixed(0) + '%')

    //TODO: DE-COMMENT ONCE POOLS AVAILABLE
    setKaibaPool(kaibaPool)
    //const LPPool = await farmContract.stakable(LP)
    //setKaibaPool(LPPool)

    provider.on('block', async (blockData) => {
      setBlock(blockData)
      const fangPoolInfo = await farmContract.get_stakable_token(FANG)
      setFangPool(fangPoolInfo)

      //TODO: DE-COMMENT ONCE POOLS AVAILABLE
      const kaibaPool = await farmContract.get_stakable_token(KAIBA)
      setKaibaPool(kaibaPool)
      //const LPPool = await farmContract.stakable(LP)
      //setKaibaPool(LPPool)
    })
  }, [])

  //TODO: find better way of doing this

  return {
    kaibaPool: kaibaPool,
    fangPool: fangPool,
    LPPool: LPPool,
    fangApy: fangApy,
    kaibaApy: kaibaApy,
    block: block,
    kaibaPrice: kaibaPrice,
    fangPrice: fangPrice,
  }
}

export function useFarmsDynamic(user) {
  const provider = new ethers.providers.StaticJsonRpcProvider(url)
  const farmContract = new ethers.Contract(farms.address, farms.abi, provider)
  const [userFarms, setUserFarms] = useState([])
  const [loading, setLoading] = useState(false)
  //const user = "0x773b7B5dd1048963Df5334970a28Ff0d49B4A866"
  const updateData = async () => {
    setLoading(true)

    const userFarmsIndex = await farmContract.get_staker(user)

    const adjusted = {
      pools: userFarmsIndex.pools,
      closed: userFarmsIndex.closed,
    }

    console.log(userFarmsIndex.pools)
    let hiddenPools = 0
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i] == user) hiddenPools = hiddenPools + 1
    }
    const closed = adjusted.closed.map((i) => {
      return i / 1
    })
    console.log(closed)
    let userFarmsData = []
    for (let i = 0; i < adjusted.pools; i++) {
      console.log('aaaaaaa' + i)

      if (closed.indexOf(i) < 0) {
        console.log(i, user)
        const stakeData = await farmContract.get_stake_pool(user, i)
        if (stakeData.status) {
          const rewards = await farmContract
            .get_reward_on_pool(user, i, false)
            .catch((err) => console.error(user, i))
          const data = { ...stakeData, reward: rewards, index: i }
          console.log(data)
          userFarmsData.push(data)
        }
      }

      console.log(userFarmsData)
      setLoading(false)
    }
    setUserFarms(userFarmsData)
  }

  useEffect(() => {
    let updater = null
    if (user) {
      updateData()
      updater = setInterval(async () => {
        updateData()
      }, 120 * 1000)
    }
    return () => {
      clearInterval(updater)
    }
  }, [user])

  const updateSingleFarm = async (i) => {
    const stakeData = await farmContract.get_stake_pool(user, i)
    const rewards = await farmContract.get_reward_on_pool(user, i, false)
    const data = { ...stakeData, reward: rewards, index: i }
    setUserFarms((current) => {
      current.splice(i, 1, data)
      return current
    })
  }

  const removeFarm = (index) => {
    setUserFarms((current) => {
      current.splice(index, 1)
      return current
    })
  }

  return {
    userFarms: userFarms,
    updateSingleFarm: updateSingleFarm,
    loading: loading,
    removeFarm: removeFarm,
  }
}
