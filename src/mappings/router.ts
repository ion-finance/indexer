import { PoolType } from "@prisma/client";
import { Event, PoolCreatedParams } from "../types/events";
import { times } from "lodash";
import prisma from "../clients/prisma";

export const handlePoolCreated = async (event: Event<PoolCreatedParams>) => {
  console.log("PoolCreated event is indexed");
  console.log(event);

  await prisma.pool.upsert({
    where: {
      id: event.params.poolAddress,
    },
    create: {
      id: event.params.poolAddress,
      coins: event.params.coins,
      name: "UnknownPool",
      description: "",
      type: event.params.poolType === 0 ? PoolType.STABLE : PoolType.VOLATILE,
      image: "",
      symbol: "UP",
      balances: times(event.params.coins.length, () => "0"),
      rates: [],
      collectedAdminFees: times(event.params.coins.length, () => "0"),
      initialA: 0,
      futureA: 0,
      initialATime: new Date(),
      futureATime: new Date(),
      fee: 0,
      adminFeeRatio: 0,
      isInitialized: true,
      totalSupply: "0",
    },
    update: {},
  });
};
