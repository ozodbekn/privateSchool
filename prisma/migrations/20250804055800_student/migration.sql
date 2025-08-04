/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AttendStatus" AS ENUM ('KELGAN', 'SABABSIZ_KELMAGAN', 'SABABLI_KELMAGAN');

-- DropForeignKey
ALTER TABLE "public"."Parents" DROP CONSTRAINT "Parents_studentsId_fkey";

-- DropTable
DROP TABLE "public"."Students";

-- CreateTable
CREATE TABLE "public"."students" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "login" VARCHAR(50) NOT NULL,
    "parol" VARCHAR(50) NOT NULL,
    "birthday" VARCHAR(50) NOT NULL,
    "birth_certificate" TEXT,
    "image" BOOLEAN NOT NULL DEFAULT false,
    "gender" "public"."Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StudentAttenddance" (
    "id" SERIAL NOT NULL,
    "studentsId" INTEGER,
    "reason" TEXT,
    "status" "public"."AttendStatus" NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentAttenddance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_login_key" ON "public"."students"("login");

-- AddForeignKey
ALTER TABLE "public"."Parents" ADD CONSTRAINT "Parents_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "public"."students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAttenddance" ADD CONSTRAINT "StudentAttenddance_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "public"."students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
