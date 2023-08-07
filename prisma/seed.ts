import { PoolType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const iUSDC = 'EQAy1dZ7EceO5ttjXb8f5DCOpIHrcMfMcDTiBmDeL_vNontR'
const iUSDT = 'EQAhuJDQQM7xuIHOmHx40Z1ZWnmU7HHr-ElPkVO1OI52e5rb'
const iDAI = 'EQBRzRfI3mUz2jIj806jenH5q3NsNsyahSq6qlBRdt4N_HBI'
const oUSDT = 'EQAyZnglvqBzg_26gfZFVbonXBSClexXXymuCr8N7GD-UWk7'
const oWBTC = 'EQBnLcBsmzh3r3EaghuqTzML6ahz3rMZKdFt4CQDKU9Reikq'
const WTON = 'EQBgXllYwjzy07gkTH3Znc7Oti2AUuuUY1oMuB7X81AfyrOj'
const jWBTC = 'EQBCS0N67AVulqQvg0j_u8hxJk8rIe57DWu8yGOLnqTZ5Ygo'

const triPool = {
  id: 'EQBqfblp1Nj5zCQ7l1vi4ZCHZWC6mQiugbbtqXOVXgBEV9vy',
  coins: [iUSDT, iUSDC, iDAI],
}
const BTCPool = {
  id: 'EQAHCgYIOtfAIEHj6m-v7ENm4qTrms8EZjWEFBqwolNuxmSf',
  coins: [oWBTC, jWBTC],
}
const USDTPool = {
  id: 'EQAywQklSSGMaktH7E8owk5lwiowq-xAqjJscE4h3bSIRCXP',
  coins: [iUSDT, oUSDT],
}
const daiTONPool = {
  id: 'EQA9wH1HODRG4nHu7vcE4SqrPCPBIzu89UGvN9ZBfnKXwOdT',
  coins: [iDAI, oWBTC],
}

async function main() {
  await prisma.coin.createMany({
    data: [
      {
        id: iUSDT,
        name: 'iUSDT',
        symbol: 'iUSDT',
        decimals: 6,
        jettonMinter: 'EQBD5rI620ZgEU_0Wy-XMb-Zv56lLP2fHhSqSfxEyrs0OCD5',
        image: 'https://s2.coinmarketcap.com/static/img/coins/128x128/825.png',
        refId: 'tether',
      },
      {
        id: iUSDC,
        name: 'iUSDC',
        symbol: 'iUSDC',
        decimals: 6,
        jettonMinter: 'EQDjuwnrPsmMO3Z9W0r8ftR-ukQD8JI-elJt_xSjd2gV5Vru',
        image: 'https://s2.coinmarketcap.com/static/img/coins/128x128/3408.png',
        refId: 'usd-coin',
      },
      {
        id: iDAI,
        name: 'iDAI',
        symbol: 'iDAI',
        decimals: 18,
        jettonMinter: 'EQDUaOnw_q4b8wdrGtLmX_WmLbvHpmomZZkhxcu2m2Q9r1tN',
        image: 'https://s2.coinmarketcap.com/static/img/coins/128x128/4943.png',
        refId: 'dai',
      },
      {
        id: oUSDT,
        name: 'oUSDT',
        symbol: 'oUSDT',
        decimals: 6,
        jettonMinter: 'EQBb-3wK3bFV7IceStsrOxNYy4bz-wWy2N9C4imNS1BITDZN',
        image:
          'https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/usdt.png',
        refId: 'tether',
      },
      {
        id: oWBTC,
        name: 'oWBTC',
        symbol: 'oWBTC',
        decimals: 8,
        jettonMinter: 'EQBnce2nzsCh1qVE9C4dn73rOLdTnKfGxZvi13U7dcAcOiZH',
        image:
          'https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/wbtc.png',
        refId: 'wrapped-bitcoin',
      },
      {
        id: WTON,
        name: 'WTON',
        symbol: 'WTON',
        decimals: 9,
        jettonMinter: 'EQBC8fG0Fw0FWqiaBkTW68_fN_Z2dxbigq4RkqALpoo_Ak6V',
        image: 'https://wton.dev/logo192.png',
        refId: 'the-open-network',
      },
      {
        id: jWBTC,
        name: 'jWBTC',
        symbol: 'jWBTC',
        decimals: 8,
        jettonMinter: 'EQBgDWxHz4Q9BkU9IlqaogD-4xc1AVrG1k1qBmrIthB84DYK',
        image:
          'https://bridge.ton.org/token/1/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
        refId: 'wrapped-bitcoin',
      },
    ],
  })

  // All pool token's decimal = 9

  await prisma.pool.createMany({
    data: [
      {
        id: triPool.id,
        type: PoolType.STABLE,
        name: 'iTripool',
        description: 'iUSDT iUSDC iDAI',
        image: '',
        symbol: 'ITRIPOOL',
        coins: triPool.coins,
        balances: ['0', '0', '0'],
        rates: ['1000000000000', '1000000000000', '1'],
        collectedAdminFees: ['0', '0', '0'],
        initialA: 5000,
        futureA: 5000,
        initialATime: new Date(),
        futureATime: new Date(),
        fee: 10,
        adminFeeRatio: 50,
        isInitialized: true,
        totalSupply: '0',
      },
      {
        id: BTCPool.id,
        type: PoolType.STABLE,
        name: 'btc2',
        description: 'oWBTC jWBTC',
        image: '',
        symbol: 'IBTCPOOL',
        coins: BTCPool.coins,
        balances: ['0', '0'],
        rates: ['10000000000', '10000000000'],
        collectedAdminFees: ['0', '0'],
        initialA: 2000,
        futureA: 5000,
        initialATime: new Date(),
        futureATime: new Date(),
        fee: 30,
        adminFeeRatio: 40,
        isInitialized: true,
        totalSupply: '12340000',
      },
      {
        id: USDTPool.id,
        type: PoolType.STABLE,
        name: 'usdt2',
        description: 'iUSDT oUSDT',
        image: '',
        symbol: 'oiUSDT',
        coins: USDTPool.coins,
        balances: ['0', '0'],
        rates: ['1000000000000', '1000000000000'],
        collectedAdminFees: ['0', '0'],
        initialA: 5000,
        futureA: 5000,
        initialATime: new Date(),
        futureATime: new Date(),
        fee: 20,
        adminFeeRatio: 50,
        isInitialized: true,
        totalSupply: '123400000',
      },
      {
        id: daiTONPool.id,
        type: PoolType.VOLATILE,
        name: 'DAI/TON',
        description: 'iDAI oWBTC',
        image: '',
        symbol: '',
        coins: daiTONPool.coins,
        balances: ['0', '0'],
        rates: [],
        collectedAdminFees: ['0', '0'],
        initialA: 0,
        futureA: 0,
        initialATime: new Date(),
        futureATime: new Date(),
        fee: 20,
        adminFeeRatio: 45,
        isInitialized: true,
        totalSupply: '0',
      },
    ],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
