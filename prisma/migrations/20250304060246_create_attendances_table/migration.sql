-- CreateTable
CREATE TABLE `attendances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `checkIn` TIMESTAMP NOT NULL,
    `checkOut` TIMESTAMP NOT NULL,
    `status` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
