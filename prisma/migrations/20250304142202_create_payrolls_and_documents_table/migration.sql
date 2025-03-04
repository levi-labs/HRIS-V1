/*
  Warnings:

  - You are about to alter the column `checkIn` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `checkOut` on the `attendances` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `attendances` MODIFY `checkIn` TIMESTAMP NOT NULL,
    MODIFY `checkOut` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `payrolls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `salary` DECIMAL(18, 2) NOT NULL,
    `bonus` DECIMAL(18, 2) NOT NULL,
    `deduction` DECIMAL(18, 2) NOT NULL,
    `netSalary` DECIMAL(18, 2) NOT NULL,
    `payDate` DATE NOT NULL,
    `status` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `filePath` TEXT NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payrolls` ADD CONSTRAINT `payrolls_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
