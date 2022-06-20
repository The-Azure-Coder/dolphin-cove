CREATE DATABASE  IF NOT EXISTS `cove` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cove`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: cove
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `hotel_id` int NOT NULL,
  `voucher_num` varchar(225) NOT NULL,
  `guest_fn` varchar(80) NOT NULL,
  `guest_ln` varchar(80) NOT NULL,
  `booking_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_company_id_idx` (`company_id`),
  KEY `FK_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `FK_company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (41,1,2,'2022186138494','Tyrese','MOrgan','2022-06-18'),(43,1,4,'2022186142440','Shannel','Morgan','2022-06-18'),(45,2,4,'2022186151309','willy','brown','2022-06-18'),(47,2,4,'2022186217213','william','Morgan','2022-06-18'),(49,1,4,'2022186225542','Doctor','Stone','2022-06-18'),(50,1,3,'2022186230449','Donte','Patterson','2022-06-18'),(51,1,3,'2022186816102','Rajime','Roberts','2022-06-18'),(54,4,3,'2022206946598','Kevin','Hall','2022-06-20');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_nm` varchar(225) NOT NULL,
  `company_des` mediumtext NOT NULL,
  `company_img` longtext NOT NULL,
  `contact_info` varchar(145) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Dolphin Cove','Did you know that swimming with dolphins is considered one of the top 10 bucket list items? When you come to Dolphin Cove Jamaica you not only get a chance to live this dream; you have the opportunity to knock off a few more, like ride a camel and interact with stingrays. Here a place where you come for the day but remember for a lifetime.','http://jhtvt.com/wp-content/uploads/2018/12/dolphin3.jpg','876-875-7541'),(2,'Ocho Rios Jamaica Tours','Have thrills on this exclusive adventurous tour as you ride through the hills in Ocho Rios for fun and adventure on our mud buggies, before going to visit the Blue Hole & Secret Falls and then returning to your Hotel.','https://jamaicatoursandtravel.com/product_images/v/048/Untitled-4__85667_zoom.png','876-456-8431'),(3,'Loose cannon Tours','Thank you for choosing Loose Cannon Tours, Kingston’s newest attraction. Whether you want to do something special as a couple, come as a family or a much larger group, Loose Cannon Tours is right for you. Just pick one of our two weekly tours and buy the number of tickets you need (from 1-120). ','https://loosecannontours.com/wp-content/uploads/2020/08/lc_sunday_600px-1.jpg','876-345-7651'),(4,'Byron\'s Jamaica Tours','Byron’s Jamaica Tours provide ground transportation for airport transfer, cruise excursion for cruise ship passengers and island tours for visitors staying at resorts on the island.  The unique professional and personal attention given to every guest sets us apart from other providers in the industry.','https://images.squarespace-cdn.com/content/v1/599dab7de4fcb5173eaa7584/1596661352096-NYUZ55X90RLP2F73EINY/IMG-20191231-WA0014.jpg?format=1000w','876-456-6512');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_programmes`
--

DROP TABLE IF EXISTS `guest_programmes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_programmes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `booking_id` int NOT NULL,
  `guest_num` int NOT NULL,
  `excur_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_booking_id_idx` (`booking_id`),
  KEY `FK2_program_id_idx` (`program_id`),
  CONSTRAINT `FK2_program_id` FOREIGN KEY (`program_id`) REFERENCES `programmes` (`id`),
  CONSTRAINT `FK_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_programmes`
--

LOCK TABLES `guest_programmes` WRITE;
/*!40000 ALTER TABLE `guest_programmes` DISABLE KEYS */;
INSERT INTO `guest_programmes` VALUES (22,2,41,4,'2022-06-25'),(23,2,43,4,'2022-06-24'),(24,2,45,7,'2022-06-24'),(25,2,47,5,'2022-06-22'),(27,2,49,5,'2022-06-25'),(28,2,50,2,'2022-06-25'),(29,1,51,4,'2022-06-25'),(31,2,54,4,'2022-06-25');
/*!40000 ALTER TABLE `guest_programmes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Ac hotel'),(2,'Courtleigh hotel and suites'),(3,'walk-in'),(4,'Jewel Grande'),(5,'Moon Palace');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'tyresemorga@gmail.com','tyrese123',1),(2,'williamshard123@gmail.com','william123',2),(3,'kevinlaw@gmail.com','kevin123',2),(4,'jackieChan@gamil.com','jack123',2),(5,'jordangold@gmail.com','gold123',3);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_types`
--

DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_type` varchar(95) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (1,'Cash'),(2,'Credit'),(3,'Card'),(4,'Cheque');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `paytype_id` int NOT NULL,
  `total_payment` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_paytype_id_idx` (`paytype_id`),
  KEY `FK3_booking_id_idx` (`booking_id`),
  CONSTRAINT `FK3_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_paytype_id` FOREIGN KEY (`paytype_id`) REFERENCES `payment_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (48,41,'2022-06-18',3,12000),(49,43,'2022-06-18',3,12000),(50,45,'2022-06-18',3,21000),(51,47,'2022-06-18',3,15000),(53,49,'2022-06-18',3,15000),(54,50,'2022-06-18',3,6000),(55,51,'2022-06-18',3,9200),(57,54,'2022-06-20',3,12000);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programmes`
--

DROP TABLE IF EXISTS `programmes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programmes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pro_nm` varchar(45) NOT NULL,
  `pro_desc` varchar(255) NOT NULL,
  `pro_price` double NOT NULL,
  `image` longtext NOT NULL,
  `ratting` float NOT NULL DEFAULT '4.5',
  `review` int NOT NULL DEFAULT '323',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programmes`
--

LOCK TABLES `programmes` WRITE;
/*!40000 ALTER TABLE `programmes` DISABLE KEYS */;
INSERT INTO `programmes` VALUES (1,'Encouter','The dolphins will give you and kiss and allow you to caress them while standind in knew deep water. This adventure is the adventure is best for those who are not comfortable swimming in the sea and the very young',2300,'https://www.dolphincoveja.com/Content/src/program-1.jpg',4.2,241),(2,'Swim Adventure','At Dolphin Cove, interact with one dolphin while swimming in the deep. Enjoy a kiss, try a dance, perhaps you will get a splash or two and have a real up close experience.',3000,'https://www.dolphincoveja.com/Content/src/program-2.jpg',4.5,581),(3,'Royal Swim','The most fun and unique program, designed to exceed all your expectations.Feel the thrill of foot-push; The dolphins will rise you above the water surface by pushing you from the soles of your ',5000,'https://www.dolphincoveja.com/Content/src/program-3.jpg',4.8,600);
/*!40000 ALTER TABLE `programmes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Tour company'),(3,'Cashier');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` int NOT NULL,
  `company_id` int NOT NULL,
  `user_fname` varchar(45) NOT NULL,
  `user_lname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3_company_id_idx` (`company_id`),
  KEY `FK_login_id_idx` (`login_id`),
  CONSTRAINT `FK3_company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `FK_login_id` FOREIGN KEY (`login_id`) REFERENCES `login` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,1,'Tyrese','Morgan'),(2,2,1,'Wiilis','jackson'),(3,3,4,'Kevin','Law'),(4,4,4,'Jackie','Chan'),(5,5,2,'Jordon','Gold');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-20 10:01:32
