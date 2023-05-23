/*
  Warnings:

  - Added the required column `finance_type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "finance_type" TEXT NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;
