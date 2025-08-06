/*
  Warnings:

  - A unique constraint covering the columns `[activationLink]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Admins" ADD COLUMN     "activationLink" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admins_activationLink_key" ON "public"."Admins"("activationLink");
