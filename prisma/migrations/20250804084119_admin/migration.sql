/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Admins" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "hashedRefreshToken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentsId" INTEGER,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teachers" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "hashedRefreshToken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "deplom" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "public"."Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_phone_number_key" ON "public"."Admins"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "public"."teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_phone_number_key" ON "public"."Parents"("phone_number");
