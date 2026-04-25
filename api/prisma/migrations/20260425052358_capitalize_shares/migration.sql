/*
  Warnings:

  - You are about to drop the `shares` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shares" DROP CONSTRAINT "shares_resourceId_fkey";

-- DropTable
DROP TABLE "shares";

-- CreateTable
CREATE TABLE "Shares" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "Shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shares_token_key" ON "Shares"("token");

-- CreateIndex
CREATE INDEX "Shares_expiresAt_idx" ON "Shares"("expiresAt");

-- CreateIndex
CREATE INDEX "Shares_resourceId_idx" ON "Shares"("resourceId");

-- AddForeignKey
ALTER TABLE "Shares" ADD CONSTRAINT "Shares_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
