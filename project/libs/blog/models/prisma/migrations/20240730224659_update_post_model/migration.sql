/*
  Warnings:

  - You are about to drop the column `link_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `photo_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quote_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `text_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `video_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "link_id",
DROP COLUMN "photo_id",
DROP COLUMN "quote_id",
DROP COLUMN "text_id",
DROP COLUMN "video_id";
