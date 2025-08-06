/*
  Warnings:

  - You are about to drop the column `birth_certificate` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `parol` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ID]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."students_login_key";

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "birth_certificate",
DROP COLUMN "login",
DROP COLUMN "parol",
ADD COLUMN     "ID" VARCHAR(50) NOT NULL,
ADD COLUMN     "hashedPassword" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_ID_key" ON "public"."students"("ID");
