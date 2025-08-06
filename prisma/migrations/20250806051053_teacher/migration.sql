/*
  Warnings:

  - You are about to drop the column `deplom` on the `teachers` table. All the data in the column will be lost.
  - Added the required column `diplom` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."teachers" DROP COLUMN "deplom",
ADD COLUMN     "diplom" TEXT NOT NULL;
