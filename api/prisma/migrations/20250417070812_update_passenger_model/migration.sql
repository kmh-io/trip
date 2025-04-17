/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Passenger_idNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Contact_mobile_key" ON "Contact"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
