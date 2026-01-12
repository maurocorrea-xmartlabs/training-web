/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `FileMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileMetadata_key_key" ON "FileMetadata"("key");
