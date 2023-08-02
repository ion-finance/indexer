import {
  Event,
  BurnParams,
  ExchangeParams,
  MintParams,
  AddLiquidityParams,
} from '../types/events'
import prisma from '../clients/prisma'

export const handleExchange = async (event: Event<ExchangeParams>) => {
  console.log('Exchange event is indexed.')
  console.log(event)

  await prisma.exchange.upsert({
    where: {
      id: event.transaction.hash,
    },
    update: {
      from: event.params.from,
      i: event.params.i,
      j: event.params.j,
      amountI: event.params.amountI,
      amountJ: event.params.amountJ,
      to: event.params.to,
      poolId: event.transaction.source,
      timestamp: event.transaction.timestamp,
    },
    create: {
      id: event.transaction.hash,
      from: event.params.from,
      i: event.params.i,
      j: event.params.j,
      amountI: event.params.amountI,
      amountJ: event.params.amountJ,
      to: event.params.to,
      poolId: event.transaction.source,
      timestamp: event.transaction.timestamp,
    },
  })
}

export const handleBurn = async (event: Event<BurnParams>) => {
  console.log('Burn event is indexed.')
  console.log(event)

  await prisma.burn.upsert({
    where: {
      id: event.transaction.hash,
    },
    update: {
      from: event.params.from,
      poolId: event.transaction.source,
      amounts: event.params.amounts,
      timestamp: event.transaction.timestamp,
    },
    create: {
      id: event.transaction.hash,
      from: event.params.from,
      poolId: event.transaction.source,
      amounts: event.params.amounts,
      timestamp: event.transaction.timestamp,
    },
  })
}

export const handleMint = async (event: Event<MintParams>) => {
  console.log('Mint event is indexed.')
  console.log(event)

  await prisma.mint.upsert({
    where: {
      id: event.transaction.hash,
    },
    update: {
      from: event.params.from,
      poolId: event.transaction.source,
      amounts: event.params.amounts,
      timestamp: event.transaction.timestamp,
    },
    create: {
      from: event.params.from,
      poolId: event.transaction.source,
      id: event.transaction.hash,
      amounts: event.params.amounts,
      timestamp: event.transaction.timestamp,
    },
  })
}

export const handleAddLiquidity = async (event: Event<AddLiquidityParams>) => {
  console.log('Add liquidity event is indexed.')
  console.log(event)
  const { jettonAmount, minLpOut, targetIndex, intendedAmounts } = event.params
  const { hash, source, timestamp } = event.transaction

  await prisma.addLiquidity.upsert({
    where: {
      id: hash,
    },
    update: {
      jettonAmount,
      minLpOut,
      targetIndex,
      intendedAmounts,
      poolId: source,
      timestamp,
    },
    create: {
      id: hash,
      jettonAmount,
      minLpOut,
      targetIndex,
      intendedAmounts,
      poolId: source,
      timestamp,
    },
  })
}
