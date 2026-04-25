/*
  Warnings:

  - You are about to drop the column `folder` on the `Folders` table. All the data in the column will be lost.
  - Added the required column `name` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folders" RENAME COLUMN "folder" TO "name";
