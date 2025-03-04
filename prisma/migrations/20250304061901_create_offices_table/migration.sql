/*
  Warnings:

  - You are about to alter the column `checkIn` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `checkOut` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `office_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendances` MODIFY `checkIn` TIMESTAMP NOT NULL,
    MODIFY `checkOut` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `employees` ADD COLUMN `office_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `offices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `latitude` DECIMAL(18, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_office_id_fkey` FOREIGN KEY (`office_id`) REFERENCES `offices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
