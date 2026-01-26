/*
  Warnings:

  - You are about to drop the column `TokenExpirationDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "TokenExpirationDate",
ADD COLUMN     "tokenExpirationDate" TIMESTAMP(3);
