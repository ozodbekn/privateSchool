/*
  Warnings:

  - A unique constraint covering the columns `[ID]` on the table `IdList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Directors" ADD COLUMN     "schoolId" INTEGER;

-- AlterTable
ALTER TABLE "public"."IdList" ALTER COLUMN "ID" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "public"."School" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "website" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdList_ID_key" ON "public"."IdList"("ID");

-- AddForeignKey
ALTER TABLE "public"."Directors" ADD CONSTRAINT "Directors_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
