/*
  Warnings:

  - You are about to drop the column `arrivalStation` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `departureStation` on the `Route` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Operator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arrivalStationId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureStationId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "arrivalStation",
DROP COLUMN "departureStation",
ADD COLUMN     "arrivalStationId" TEXT NOT NULL,
ADD COLUMN     "departureStationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "vehicleType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Station_city_idx" ON "Station"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_city_key" ON "Station"("name", "city");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");

-- CreateIndex
CREATE INDEX "Operator_name_idx" ON "Operator"("name");

-- CreateIndex
CREATE INDEX "Route_departureStationId_idx" ON "Route"("departureStationId");

-- CreateIndex
CREATE INDEX "Route_arrivalStationId_idx" ON "Route"("arrivalStationId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_departureStationId_fkey" FOREIGN KEY ("departureStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_arrivalStationId_fkey" FOREIGN KEY ("arrivalStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
