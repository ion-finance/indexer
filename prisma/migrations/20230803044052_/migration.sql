/*
  Warnings:

  - Added the required column `ownerAddr` to the `AddLiquidity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddLiquidity" ADD COLUMN     "ownerAddr" TEXT NOT NULL;
