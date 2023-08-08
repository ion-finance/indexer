import dotenv from 'dotenv'
import cron from 'node-cron'
import Fastify from 'fastify'
import express from 'express'
import cors from '@fastify/cors'
import fetchEvents from './tasks/fetchEvents'
import handleEvent from './tasks/handleEvent'
import prisma from './clients/prisma'
import sleep from './utils/sleep'
import {
  refreshAllPools,
  refreshPoolsIfRecentEventsExist,
} from './tasks/refreshPools'
import { refreshDailyAPY, refreshWeeklyApy } from './tasks/refreshAPY'
import { refreshPrices } from './tasks/refreshPrices'
import { refreshDailyVolume } from './tasks/refreshVoulme'
import { compact } from 'lodash'
import { Coin } from '@prisma/client'
import { Address } from 'ton-core'
import moment from 'moment'

dotenv.config()

const MIN_POOL = 200 // 0.2s

const eventPooling = async () => {
  const events = await fetchEvents()

  if (events.length === 0) {
    // console.debug(`No events found. Sleep for ${MIN_POOL / 1000}s.`);
    sleep(MIN_POOL)
    return
  }

  console.log(`${events.length} events found.`)
  for (let i = 0; i < events.length; i++) {
    await handleEvent(events[events.length - 1 - i].event_id)
  }
  console.log(`${events.length} events are indexed.`)

  if (events.length > 0) {
    await prisma.indexerState.setLastTimestamp(events[0].timestamp)
  }
}

const main = async () => {
  await refreshPrices()
  await refreshDailyVolume()
  await refreshDailyAPY()
  await refreshWeeklyApy()
  await refreshAllPools()
  console.log('Initial data is refreshed.')

  console.log('Event pooling is started. ')
  for (;;) {
    await eventPooling()
  }
}

main()

cron.schedule('0 * * * *', async () => {
  await refreshPrices()
  await refreshDailyVolume()
  await refreshDailyAPY()
  await refreshWeeklyApy()
})

cron.schedule('*/10 * * * * *', async () => {
  await refreshPoolsIfRecentEventsExist()
})

cron.schedule('* * * * *', async () => {
  await refreshAllPools()
})

const server = Fastify({
  logger: false,
})

server.register(cors, {
  origin: '*',
  methods: ['GET', 'OPTIONS'],
})

server.get('/', async function handler() {
  return { hello: 'world' }
})

server.get('/pools', async function handler() {
  const [coins, pools] = await Promise.all([
    prisma.coin.findMany(),
    prisma.pool.findMany(),
  ])

  return pools.map((pool) => {
    const coinData = pool.coins.map((coinId) =>
      coins.find((coin) => coin.id === coinId),
    )
    const coinsInPool: Coin[] = compact(coinData)

    return {
      ...pool,
      coins: coinsInPool,
    }
  })
})

server.get('/coins', async function handler() {
  return await prisma.coin.findMany()
})

server.get('/events/:account', async function handler(request, reply) {
  const { account } = request.params as { account: string }

  if (!account) return reply.code(400).send('Invalid account address')

  let address: string
  try {
    address = Address.parse(account).toString()
  } catch {
    return reply.code(400).send('Invalid account address')
  }

  const { afterTimestamp } = request.query as { afterTimestamp?: string }

  if (afterTimestamp) {
    if (isNaN(Number(afterTimestamp))) {
      return reply
        .code(400)
        .send('Invalid afterTimesamp. afterTimestamp should be a number')
    }
    const parsedTimestamp = Number(afterTimestamp)

    if (parsedTimestamp < moment().unix() - 3600) {
      return reply
        .code(400)
        .send('afterTimestamp shoud be less than 1 hour from now')
    }
  }

  const parsedTimestamp = afterTimestamp ? Number(afterTimestamp) : 0

  const [coins, pools, exchanges, mints, burns, addLiquidities] =
    await Promise.all([
      prisma.coin.findMany(),
      prisma.pool.findMany(),
      prisma.exchange.findMany({
        where: {
          from: address,
          timestamp: { gte: parsedTimestamp },
        },
      }),
      prisma.mint.findMany({
        where: {
          from: address,
          timestamp: { gte: parsedTimestamp },
        },
      }),
      prisma.burn.findMany({
        where: {
          from: address,
          timestamp: { gte: parsedTimestamp },
        },
      }),
      prisma.addLiquidity.findMany({
        where: {
          from: address,
          timestamp: { gte: parsedTimestamp },
        },
      }),
    ])

  const poolsWithCoins = pools.map((pool) => {
    const coinData = pool.coins.map((coinId) =>
      coins.find((coin) => coin.id === coinId),
    )
    const coinsInPool: Coin[] = compact(coinData)

    return {
      ...pool,
      coins: coinsInPool,
    }
  })

  return {
    exchanges: exchanges.map((exchange) => {
      const poolData = poolsWithCoins.find(
        (pool) => pool.id === exchange.poolId,
      )

      return {
        ...exchange,
        pool: poolData,
      }
    }),
    mints: mints.map((mint) => {
      const poolData = poolsWithCoins.find((pool) => pool.id === mint.poolId)

      return {
        ...mint,
        pool: poolData,
      }
    }),
    burns: burns.map((burn) => {
      const poolData = poolsWithCoins.find((pool) => pool.id === burn.poolId)

      return {
        ...burn,
        pool: poolData,
      }
    }),
    addLiquidities: addLiquidities.map((addLiquidity) => {
      const poolData = poolsWithCoins.find(
        (pool) => pool.id === addLiquidity.poolId,
      )

      return {
        ...addLiquidity,
        pool: poolData,
      }
    }),
  }
})

/*
server.listen({ port: 3000 }).then(() => {
  console.log(`Server listening on port 3000`)
})
*/

const app = express()

app.get('/', async (req, res) => {
  res.send(`Hello!`)
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
