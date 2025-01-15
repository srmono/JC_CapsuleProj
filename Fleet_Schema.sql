CREATE DATABASE `fleetsystem`;

USE `fleetsystem`;

DROP TABLE IF EXISTS `truck`;

CREATE TABLE `truck` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `model` VARCHAR(255) NOT NULL,
    `status` ENUM('Operational', 'In Maintenance') NOT NULL,
    `details` TEXT
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `driver`;

CREATE TABLE `driver` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `license` VARCHAR(50) NOT NULL,
    `details` TEXT
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `maintenance`;

CREATE TABLE `maintenance` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `truckId` INT NOT NULL,
    `serviceDate` DATE NOT NULL,
    `serviceType` VARCHAR(255) NOT NULL,
    `details` TEXT,
    FOREIGN KEY (truckId) REFERENCES `truck`(`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `route`;

CREATE TABLE `route` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `startLocation` VARCHAR(255) NOT NULL,
    `endLocation` VARCHAR(255) NOT NULL,
    `details` TEXT
) ENGINE=InnoDB;