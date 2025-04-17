-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookingId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
