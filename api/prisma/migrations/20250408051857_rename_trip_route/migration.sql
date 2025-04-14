/*
  Warnings:

  - You are about to drop the column `seatNo` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `routeId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_operatorId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "seatNo" TEXT[];

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seatNo",
DROP COLUMN "tripId",
ADD COLUMN     "routeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Trip";

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "departureStation" TEXT NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "arrivalStation" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "operatorId" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Route_departure_idx" ON "Route"("departure");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
