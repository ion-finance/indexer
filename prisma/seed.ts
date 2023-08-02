import { PoolType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const iUSDC = 'EQB6UB46ipi601N1arUs5Vv7QktciiL9eefunUvLSHgm5fcf'
const iUSDT = 'EQCtvA6MbXDOhjjivcObumI48YbIc7N9KE5X0x07TvRKTqcK'
const iDAI = 'EQBBxsIAaCCP5yrK_u9sY84UFlwZSFSDCGzE-nsz_uNJlI1C'
const oUSDT = 'EQBwfWymTvTtsNADYZMkLxuuh3G-VfJA0uaeELneC1wjobxo'
const oWBTC = 'EQBr8ezCqfust-ICF8mup-DqbI8dGD5NAczEH8Hd2X9CumTb'
const WTON = 'EQBYFCrhipizQp3C3gj5TSPZK1Aaa3_ZsgHmxj6wLluEzks2'
const jWBTC = 'EQDUE_6h6bajiBNmIp3skoCugi_v4s8usrfsHLI-xMvHDWHO'

const triPool = {
  id: 'EQCZAVu6poebTVMuAl_kQkVScVe652t7UOic8AgwA-f1WBup',
  coins: [iUSDT, iDAI, iUSDC],
}
const BTCPool = {
  id: 'EQDD1HSYzM2w9DEoGZBHo0bPAnHeZEv1pURL0KHCvxgHEKh4',
  coins: [oWBTC, jWBTC],
}
const USDTPool = {
  id: 'EQDLuA7ygunEupWb1OkRTMJb9CmsqKp2kjdROaV3fO8iTQCa',
  coins: [iUSDT, oUSDT],
}
const daiTONPool = {
  id: 'EQD_nWH5FGdIGTEEzMPrVjpJW_dTZidSkWnsm0fh8ML3zAtL',
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
