/*
  Warnings:

  - You are about to drop the column `city` on the `Station` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,cityId]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Station_city_idx";

-- DropIndex
DROP INDEX "Station_name_city_key";

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "city",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE INDEX "Station_cityId_idx" ON "Station"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_cityId_key" ON "Station"("name", "cityId");

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
