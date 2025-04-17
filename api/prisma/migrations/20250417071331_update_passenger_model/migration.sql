/*
  Warnings:

  - A unique constraint covering the columns `[idNumber]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Passenger_idNumber_key" ON "Passenger"("idNumber");
