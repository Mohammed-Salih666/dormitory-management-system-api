ALTER TABLE `users` MODIFY COLUMN `role` varchar(255) NOT NULL DEFAULT 'student';--> statement-breakpoint
ALTER TABLE `users` ADD `access_token` varchar(255);