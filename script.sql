-- MySQL Dump Script

-- Set database character set
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Create `menuitems` table
CREATE TABLE `menuitems` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `reservation` table
CREATE TABLE `reservation` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT,
    `table_id` BIGINT,
    `reservation_date` DATE NOT NULL,
    `party_size` INT NOT NULL,
    `status` VARCHAR(255) DEFAULT 'confirmed',
    `reservation_time` TIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `roles` table
CREATE TABLE `roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `tables` table
CREATE TABLE `tables` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `zone_id` BIGINT,
    `table_number` INT NOT NULL,
    `capacity` INT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `users` table
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `users_role` table
CREATE TABLE `users_role` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create `zones` table
CREATE TABLE `zones` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into `menuitems`
INSERT INTO `menuitems` (`id`, `name`, `description`, `price`) VALUES
(1, 'Item 1', 'Description 1', 10.00),
(2, 'Item 2', 'Description 2', 20.00); -- Add your real data here

-- Insert data into `reservation`
INSERT INTO `reservation` (`id`, `user_id`, `table_id`, `reservation_date`, `party_size`, `status`, `reservation_time`) VALUES
(1, 1, 22, '2024-10-15', 5, 'confirmed', '13:41:00'),
(2, 1, 7, '2024-10-15', 2, 'confirmed', '13:41:00'),
(3, 1, 18, '2024-10-16', 5, 'confirmed', '19:00:00'),
(4, 23, 17, '2000-12-12', 4, 'confirmed', '23:00:00'),
(5, 23, 1, '2024-10-17', 3, 'confirmed', '21:00:00');

-- Insert data into `roles`
INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- Insert data into `tables`
INSERT INTO `tables` (`id`, `zone_id`, `table_number`, `capacity`) VALUES
(1, 1, 1, 4),
(2, 1, 2, 4),
(3, 1, 3, 4),
(4, 1, 4, 4),
(5, 1, 5, 4);

-- Insert data into `users`
INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'pavel', 'pavellukasenko80@gmail.com', '1111', '2024-10-03 07:06:14'),
(2, 'nicolas', 'sdfsdf@jug.sdf', '1111', '2024-10-03 07:06:12'),
(3, 'johndoe', 'johndoe@example.com', '1111', '2024-10-03 10:32:42');

-- Insert data into `users_role`
INSERT INTO `users_role` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2);

-- Insert data into `zones`
INSERT INTO `zones` (`id`, `name`) VALUES
(1, 'hall 1'),
(2, 'hall 2'),
(3, "children's area"),
(4, 'terrace');

-- Reset auto-increment values
ALTER TABLE `menuitems` AUTO_INCREMENT = 100;
ALTER TABLE `reservation` AUTO_INCREMENT = 100;
ALTER TABLE `roles` AUTO_INCREMENT = 100;
ALTER TABLE `tables` AUTO_INCREMENT = 100;
ALTER TABLE `users` AUTO_INCREMENT = 100;
ALTER TABLE `zones` AUTO_INCREMENT = 100;

SET FOREIGN_KEY_CHECKS = 1;
