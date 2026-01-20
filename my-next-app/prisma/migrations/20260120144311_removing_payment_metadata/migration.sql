/*
  Warnings:

  - You are about to drop the `PaymentIntent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentIntent" DROP CONSTRAINT "PaymentIntent_userId_fkey";

-- DropTable
DROP TABLE "PaymentIntent";
