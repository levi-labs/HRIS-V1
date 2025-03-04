/*
  Warnings:

  - You are about to alter the column `checkIn` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `checkOut` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `attendances` MODIFY `checkIn` TIMESTAMP NOT NULL,
    MODIFY `checkOut` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `geolocations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkInLatitude` DECIMAL(18, 8) NOT NULL,
    `checkInLongitude` DECIMAL(11, 8) NOT NULL,
    `checkOutLatitude` DECIMAL(18, 8) NOT NULL,
    `checkOutLongitude` DECIMAL(11, 8) NOT NULL,
    `attendance_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `geolocations` ADD CONSTRAINT `geolocations_attendance_id_fkey` FOREIGN KEY (`attendance_id`) REFERENCES `attendances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
