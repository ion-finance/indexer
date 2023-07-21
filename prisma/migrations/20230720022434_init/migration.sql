-- CreateEnum
CREATE TYPE "PoolType" AS ENUM ('STABLE', 'VOLATILE');

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jettonMinter" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "image" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL DEFAULT 9,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "PoolType" NOT NULL DEFAULT 'STABLE',
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "coins" TEXT[],
    "balances" TEXT[],
    "rates" TEXT[],
    "collectedAdminFees" TEXT[],
    "initialA" INTEGER NOT NULL,
    "initialATime" TIMESTAMP(3) NOT NULL,
    "futureA" INTEGER NOT NULL,
    "futureATime" TIMESTAMP(3) NOT NULL,
    "fee" INTEGER NOT NULL,
    "adminFeeRatio" INTEGER NOT NULL,
    "isInitialized" BOOLEAN NOT NULL DEFAULT false,
    "totalSupply" TEXT NOT NULL,
    "apy" TEXT NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poolId" TEXT NOT NULL,
    "i" INTEGER NOT NULL,
    "j" INTEGER NOT NULL,
    "amountI" TEXT NOT NULL,
    "amountJ" TEXT NOT NULL,
    "feeI" TEXT NOT NULL,
    "feeJ" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
