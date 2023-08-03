import axios from 'axios'
import prisma from '../clients/prisma'
import { Event } from '../types/ton-api'

const fetchEvents = async () => {
  const timestamp = await prisma.indexerState.getLastTimestamp()
  const startTimeStamp = timestamp ? timestamp - 10 : 0
  const routerAddress = 'EQDEEwdjcctlXsOkNFeACn9z9wnZoUEoEyI_Pw0mnAM6FtS3'
  const res = await axios(
    `${process.env.TON_API_URL}/accounts/${routerAddress}/events?start_date=${startTimeStamp}&limit=100`,
  )

  const events = res.data.events as Event[]

  return events
}

export default fetchEvents
