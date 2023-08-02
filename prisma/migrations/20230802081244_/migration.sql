/*
  Warnings:

  - You are about to drop the column `jettonAmouont` on the `AddLiquidity` table. All the data in the column will be lost.
  - Added the required column `jettonAmount` to the `AddLiquidity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddLiquidity" DROP COLUMN "jettonAmouont",
ADD COLUMN     "jettonAmount" TEXT NOT NULL;
