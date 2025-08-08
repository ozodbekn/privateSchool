/*
  Warnings:

  - You are about to drop the column `is_active` on the `Directors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Directors" DROP COLUMN "is_active";

-- CreateTable
CREATE TABLE "public"."IdList" (
    "id" SERIAL NOT NULL,
    "ID" INTEGER NOT NULL,

    CONSTRAINT "IdList_pkey" PRIMARY KEY ("id")
);
