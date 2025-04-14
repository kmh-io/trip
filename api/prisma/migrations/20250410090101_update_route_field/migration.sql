/*
  Warnings:

  - You are about to drop the column `transportType` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `transportType` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "transportType" "TransportType" NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "transportType",
DROP COLUMN "vehicleType";
