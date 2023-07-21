import axios from "axios";
import { TransactionResult } from "../types/ton-api";
import parseMint from "../parsers/parseMint";
import { Address, Cell } from "ton-core";
import { handleBurn, handleExchange, handleMint } from "../mappings/pool";
import parseBurn from "../parsers/parseBurn";
import parseExchange from "../parsers/parseExchange";
import { handlePoolCreated } from "../mappings/router";
import parsePoolCreated from "../parsers/parsePoolCreated";

const fetchTransactions = async () => {
  // Find latest txHash from IndexerState;
  // Find lt from IndexerState
  const routerAddress = "EQDPba4MHzwT7Q8YT_qJhzRs4sfUDqCCxkS_Fn642yjPH-71";
  const res = await axios(
    `${process.env.TON_API_URL}/blockchain/${routerAddress}/transactions`
  );

  console.log(res.data);

  // update IndexerState;
  return [];
};

export default fetchTransactions;
