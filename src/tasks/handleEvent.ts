import axios from 'axios'
import { TransactionResult } from '../types/ton-api'
import parseMint from '../parsers/parseMint'
import { Address, Cell } from 'ton-core'
import {
  handleAddLiquidity,
  handleBurn,
  handleExchange,
  handleMint,
} from '../mappings/pool'
import parseBurn from '../parsers/parseBurn'
import parseExchange from '../parsers/parseExchange'
import { handlePoolCreated } from '../mappings/router'
import parsePoolCreated from '../parsers/parsePoolCreated'
import parseAddLiquidity from '../parsers/parseAddLiquidity'

const MINT = '0x12761d14'
const BURN = '0x443cf371'
const EXCHANGE = '0xbd687ba6'
const POOL_CREATED = '0x7d0e1322'
const ADD_LIQUIDITY = '0x5e27b769'

const handleEvent = async (event_id: string) => {
  // TODO : handle errors;
  // ! FIXME
  // * traces api response can be pending
  const res = await axios(`${process.env.TON_API_URL}/traces/${event_id}`)

  const transactionRes = res.data as TransactionResult

  let txs = [transactionRes]
  const txsHasOutMsgs: TransactionResult[] = []
  while (txs.length != 0) {
    let new_txs: TransactionResult[] = []

    txs.forEach((t) => {
      if (t.transaction.out_msgs.length > 0) {
        txsHasOutMsgs.push({
          ...t,
          children: undefined,
        })
      }

      if (t.children) {
        new_txs = [...new_txs, ...t.children]
      }
    })

    txs = new_txs
  }

  for (let i = 0; i < txsHasOutMsgs.length; i++) {
    const tx = txsHasOutMsgs[i]
    for (let j = 0; j < tx.transaction.out_msgs.length; j++) {
      const msg = tx.transaction.out_msgs[j]
      const body = Cell.fromBoc(Buffer.from(msg.raw_body, 'hex'))[0]
      const parseTx = {
        source: Address.parseRaw(tx.transaction.account.address).toString(),
        hash: tx.transaction.hash,
        timestamp: tx.transaction.utime,
      }

      switch (msg.op_code) {
        case MINT: {
          await handleMint({
            transaction: parseTx,
            params: parseMint(body),
          })
          break
        }
        case BURN: {
          await handleBurn({
            transaction: parseTx,
            params: parseBurn(body),
          })
          break
        }
        case EXCHANGE: {
          await handleExchange({
            transaction: parseTx,
            params: parseExchange(body),
          })
          break
        }
        case POOL_CREATED: {
          await handlePoolCreated({
            transaction: parseTx,
            params: parsePoolCreated(body),
          })
          break
        }
        case ADD_LIQUIDITY: {
          await handleAddLiquidity({
            transaction: parseTx,
            params: parseAddLiquidity(body),
          })
          break
        }
        default:
          console.log('UNKNOWN')
          break
      }
    }
  }
}

export default handleEvent
