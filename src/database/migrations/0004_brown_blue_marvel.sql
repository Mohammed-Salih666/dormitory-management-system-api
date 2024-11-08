ALTER TABLE `apartments` RENAME COLUMN `for_male` TO `gender`;--> statement-breakpoint
ALTER TABLE `apartments` MODIFY COLUMN `gender` varchar(1) NOT NULL;