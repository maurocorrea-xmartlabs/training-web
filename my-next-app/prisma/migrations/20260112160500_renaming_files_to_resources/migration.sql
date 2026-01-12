/*
  Warnings:

  - You are about to drop the `FileMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileMetadata" DROP CONSTRAINT "FileMetadata_subjectId_fkey";

-- DropTable
DROP TABLE "FileMetadata";

-- CreateTable
CREATE TABLE "ResourceMetadata" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "ResourceMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceMetadata_key_key" ON "ResourceMetadata"("key");

-- AddForeignKey
ALTER TABLE "ResourceMetadata" ADD CONSTRAINT "ResourceMetadata_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
