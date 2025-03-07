/*
  Warnings:

  - You are about to alter the column `checkIn` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `checkOut` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `attendances` MODIFY `checkIn` TIMESTAMP NOT NULL,
    MODIFY `checkOut` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `geolocations` MODIFY `checkOutLatitude` DECIMAL(18, 8) NULL,
    MODIFY `checkOutLongitude` DECIMAL(11, 8) NULL;
