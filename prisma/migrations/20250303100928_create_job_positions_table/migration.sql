-- CreateTable
CREATE TABLE `job_positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `level` VARCHAR(20) NOT NULL,
    `salary_min` DECIMAL(18, 2) NOT NULL,
    `salary_max` DECIMAL(18, 2) NOT NULL,
    `department_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `job_positions` ADD CONSTRAINT `job_positions_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
