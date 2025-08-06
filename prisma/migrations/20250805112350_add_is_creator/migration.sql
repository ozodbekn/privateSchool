/*
  Warnings:

  - You are about to drop the column `gender` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Admins" ADD COLUMN     "is_creator" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "gender",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "public"."teachers" DROP COLUMN "gender";

-- DropEnum
DROP TYPE "public"."Gender";

-- CreateTable
CREATE TABLE "public"."Directors" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "image" VARCHAR(50) NOT NULL,
    "hashedRefreshToken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Directors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Directors_email_key" ON "public"."Directors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Directors_phone_number_key" ON "public"."Directors"("phone_number");
