/*
  Warnings:

  - You are about to drop the column `email` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ID]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."teachers_email_key";

-- AlterTable
ALTER TABLE "public"."teachers" DROP COLUMN "email",
DROP COLUMN "is_active",
ADD COLUMN     "ID" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teachers_ID_key" ON "public"."teachers"("ID");
