import { ethers } from 'ethers'
import erc20 from './erc20'
const endpoint = 'https://deep-index.moralis.io/api/v2/'
const header = {
  accept: 'application/json',
  'X-API-Key':
    'aW9QPatxRtu1usW8rH4YUtqGqqFrvaXhCTXAtFhnobWoFrSuEvROkfJA2Iw8Ft40',
}
const empty = '0x0000000000000000000000000000000000000000'

const url = 'https://mainnet.infura.io/v3/9ed182e6c7b44c5fa80bd8c3b3779a6f'

export async function getPriceByAddress(address) {
  let req = await fetch(
    endpoint + 'erc20/' + address + '/price?chain=eth',
    { headers: header }
  )
  let res = await req.json()
  return res.usdPrice
}

export async function getUniv2Pair(token0, token1) {
  let req = await fetch(
    endpoint +
      token0 +
      '/' +
      token1 +
      '/pairAddress?chain=eth&exchange=uniswapv2',
    {
      headers: header,
    }
  )
  let res = await req.json()
  console.log(res.pairAddress)
  return res.pairAddress
}

export async function changeNetwork() {
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x1' }],
  })
}

export async function addToken(address) {
  ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x406b9dca8b52f08385014ec1ed1cf6a0d5c01289',
          symbol: 'MEISHU',
          decimals: 9,
          image:
            'https://res.cloudinary.com/mazculo/image/upload/v1650470530/meishu_tlqkce.jpg',
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log('MEISHU successfully added to wallet!')
      } else {
        throw new Error('Something went wrong.')
      }
    })
    .catch(console.error)
}

export async function getTokenBalance(token, address) {
  const provider = new ethers.providers.StaticJsonRpcProvider(url)
  const contract = new ethers.Contract(token.address, erc20, provider)
  console.log(token)
  const balance = await contract.balanceOf(address)
  return balance / Math.pow(10, token.decimals)
}

export async function fetchTokenData(address) {
  const data = await fetch(
    'https://api.coingecko.com/api/v3/coins/ethereum/contract/' + address,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const parsed = await data.json()
  if (!parsed.error) {
    console.log(parsed)
    const image = parsed.image.large
    const symbol = parsed.symbol.toUpperCase()
    const provider = new ethers.providers.StaticJsonRpcProvider(
      'https://mainnet.infura.io/v3/9ed182e6c7b44c5fa80bd8c3b3779a6f'
    )
    const contract = new ethers.Contract(address, erc20, provider)
    const decimals = await contract.decimals()
    return {
      symbol: symbol,
      decimals: decimals,
      address: address,
      logo: image,
    }
  }
}
