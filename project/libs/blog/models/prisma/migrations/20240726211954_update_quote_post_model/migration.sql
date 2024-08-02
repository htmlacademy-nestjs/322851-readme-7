/*
  Warnings:

  - Added the required column `author` to the `quote_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "original_author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quote_posts" ADD COLUMN     "author" TEXT NOT NULL;
