-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('ayol', 'erkak');

-- CreateTable
CREATE TABLE "public"."Parents" (
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

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Students" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "login" VARCHAR(50) NOT NULL,
    "parol" TEXT NOT NULL,
    "birthday" VARCHAR(50) NOT NULL,
    "birth_certificate" TEXT,
    "image" BOOLEAN NOT NULL DEFAULT false,
    "gender" "public"."Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parents_email_key" ON "public"."Parents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_login_key" ON "public"."Students"("login");

-- AddForeignKey
ALTER TABLE "public"."Parents" ADD CONSTRAINT "Parents_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "public"."Students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
