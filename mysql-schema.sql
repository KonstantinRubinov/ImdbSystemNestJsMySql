# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: ImdbFavorites
# Generation Time: 2021-28-04 14:55:05 +0000
# ************************************************************

# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  	`userID` nvarchar(9),
	`userFirstName` NVARCHAR(50) NOT NULL,
	`userLastName` NVARCHAR(50) NOT NULL,
	`userNickName` NVARCHAR(50) NOT NULL,
	`userBirthDate` DATETIME NULL,
	`userGender` NVARCHAR(50) NOT NULL,
	`userEmail` NVARCHAR(50) NOT NULL,
	`userPassword` NVARCHAR(50) NOT NULL,
	`userPicture` NVARCHAR(50) NULL,
	`userImdbPass` NVARCHAR(50) NULL,
  	PRIMARY KEY ( `userID` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table Movies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Movies`;

CREATE TABLE `Movies` (
  	`imdbID` nvarchar(15) NOT NULL,
	`title` nvarchar(50) NOT NULL,
	`poster` nvarchar(10000) NOT NULL,
	`year` int NOT NULL,
	`userID` nvarchar(9) ,
  	PRIMARY KEY (`imdbID`, `userID`),
  	FOREIGN KEY (`userID`) REFERENCES users (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table Movieextends
# ------------------------------------------------------------
 
DROP TABLE IF EXISTS `Movieextends`;

CREATE TABLE `Movieextends` (
  	`imdbID` nvarchar(15) NOT NULL,
	`plot` nvarchar(1000),
	`website` nvarchar(1000),
	`rated` nvarchar(10),
	`imdbRating` real,
	`seen` bit,
	`userID` nvarchar(9) NOT NULL,
  	PRIMARY KEY (`imdbID`, `userID`),
  	FOREIGN KEY (`imdbID`, `userID`) REFERENCES MOVIES (`imdbID`, `userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;