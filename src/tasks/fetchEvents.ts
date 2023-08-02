import axios from 'axios'
import prisma from '../clients/prisma'
import { Event } from '../types/ton-api'

const fetchEvents = async () => {
  const timestamp = await prisma.indexerState.getLastTimestamp()
  const routerAddress = 'EQCewkWzGJaEaYnk9eUveOPM-t20-FNhTxbx-kVaekB5TpAl'
  const res = await axios(
    `${process.env.TON_API_URL}/accounts/${routerAddress}/events?start_date=${
      timestamp - 10
    }&limit=100`,
  )

  const events = res.data.events as Event[]

  return events
}

export default fetchEvents
