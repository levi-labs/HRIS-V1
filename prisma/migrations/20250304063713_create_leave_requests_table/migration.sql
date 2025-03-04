/*
  Warnings:

  - You are about to alter the column `checkIn` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `checkOut` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `attendances` MODIFY `checkIn` TIMESTAMP NOT NULL,
    MODIFY `checkOut` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `leave_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `reason` VARCHAR(120) NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `approvedBy` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `leave_requests` ADD CONSTRAINT `leave_requests_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave_requests` ADD CONSTRAINT `leave_requests_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
