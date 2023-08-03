/*
  Warnings:

  - You are about to drop the column `ownerAddr` on the `AddLiquidity` table. All the data in the column will be lost.
  - Added the required column `from` to the `AddLiquidity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddLiquidity" DROP COLUMN "ownerAddr",
ADD COLUMN     "from" TEXT NOT NULL;
