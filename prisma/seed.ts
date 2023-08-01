import { PoolType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const iUSDC = 'EQBuMOcj9Wn0GrxJgaCCNjRRKcL49ITH7KwcG6o_Itz1yMtf'
const iUSDT = 'EQDD43IlrLh-WB9fR5fpEKFnoJVaXbhPUeUWkwFmrFjHotrN'
const iDAI = 'EQBB71tByWZdvYJHrHSPOy4i2bGYL3zaj9hGaoWJ-wM3jaQ3'
const oUSDT = 'EQAAC95Z42lx8g3PIUanPDfNwxxvlNuWUyS48rF2bqrDIVYc'
const oWBTC = 'EQDaqmEu51dQ5Yq72zInwPW6u-XwcuUjorTQ89GUbdo54Cy8'
const jWBTC = 'EQBDMkUCqrS7avMbTrfKpxaop5z7dNk4qhNZcv6vfKhU9wnO'
const WTON = 'EQDYz2CjZxOj89hbrWNFLVUUnRZStsJ_swnP8n1ZjTPnZsha'

const triPool = {
  id: 'EQAW0HfBulYajjX6uTVniI9rKvBqJyUR2hiHAlmF-D3BhAXm',
  coins: [iUSDC, iDAI, iUSDT],
}
const BTCPool = {
  id: 'EQCA889dWEGxzSigaP1rBnSS16ejXk78jUp98AO5Uv5ekTrD',
  coins: [oWBTC, jWBTC],
}
const USDTPool = {
  id: 'EQAUfRkTvF34OmO_RzxR-MIF5RWeAovZMeeSa3n_5viyXEHi',
  coins: [iUSDT, oUSDT],
}
const daiTONPool = {
  id: 'EQD90QGcxYfjuk1Ob_yDYteQKIQ7-wOsK_WZZLkLAU5TNBnz',
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
        description: 'iUSDT iDAI iUSDC',
        image: '',
        symbol: 'ITRIPOOL',
        coins: triPool.coins,
        balances: ['0', '0', '0'],
        rates: ['1000000000000', '1', '1000000000000'],
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
