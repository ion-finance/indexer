-- CreateTable
CREATE TABLE "AddLiquidity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" INTEGER NOT NULL,
    "poolId" TEXT NOT NULL,
    "jettonAmouont" TEXT NOT NULL,
    "minLpOut" TEXT NOT NULL,
    "targetIndex" INTEGER NOT NULL,
    "intendedAmounts" TEXT[],

    CONSTRAINT "AddLiquidity_pkey" PRIMARY KEY ("id")
);