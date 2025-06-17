-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_wineId_fkey`;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `orderId` VARCHAR(191) NULL,
    MODIFY `wineId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_wineId_fkey` FOREIGN KEY (`wineId`) REFERENCES `Wine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
