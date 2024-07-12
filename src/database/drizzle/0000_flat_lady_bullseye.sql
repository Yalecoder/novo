CREATE TABLE `farmers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`reference` text,
	`birthDate` text,
	`cellphone` text,
	`pgr` integer,
	`high_risk_farmer` integer,
	`photo` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`password` text,
	`type` text
);
