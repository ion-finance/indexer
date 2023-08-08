import { Prisma } from '@prisma/client'

const IndexerStateExtenstions = Prisma.defineExtension((client) => {
  return client.$extends({
    name: `IndexerStateExtensions`,
    model: {
      indexerState: {
        async getLastTimestamp(): Promise<number> {
          const lastTimestamp = await client.indexerState.findFirst({
            where: { key: 'last_timestamp' },
          })
          return lastTimestamp ? Number(lastTimestamp.value) : 0
        },
        async setLastTimestamp(timestamp: number): Promise<void> {
          await client.indexerState.upsert({
            where: { key: 'last_timestamp' },
            update: { value: timestamp.toString() },
            create: { key: 'last_timestamp', value: timestamp.toString() },
          })
        },
      },
    },
  })
})

export default IndexerStateExtenstions
