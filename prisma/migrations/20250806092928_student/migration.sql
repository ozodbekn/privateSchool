/*
  Warnings:

  - You are about to drop the column `email` on the `Directors` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ID]` on the table `Directors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID` to the `Directors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthyear` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Directors_email_key";

-- AlterTable
ALTER TABLE "public"."Directors" DROP COLUMN "email",
ADD COLUMN     "ID" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "birthday",
ADD COLUMN     "birthyear" VARCHAR(50) NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Directors_ID_key" ON "public"."Directors"("ID");
