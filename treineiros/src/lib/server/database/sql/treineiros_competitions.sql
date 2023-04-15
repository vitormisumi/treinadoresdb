CREATE DATABASE  IF NOT EXISTS `treineiros` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `treineiros`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: treineiros
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitions` (
  `competition_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `year` year NOT NULL,
  PRIMARY KEY (`competition_id`),
  UNIQUE KEY `competition_id_UNIQUE` (`competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (1,'Campeonato Brasileiro - Série A',2014),(2,'Campeonato Brasileiro - Série B',2014),(3,'Campeonato Brasileiro - Série C',2014),(4,'Campeonato Brasileiro - Série D',2014),(5,'Copa Do Brasil - Profissional',2014),(6,'Campeonato Brasileiro - Série A',2015),(7,'Campeonato Brasileiro - Série B',2015),(8,'Campeonato Brasileiro - Série C',2015),(9,'Campeonato Brasileiro - Série D',2015),(10,'Copa Do Brasil - Profissional',2015),(11,'Campeonato Brasileiro - Série A',2016),(12,'Campeonato Brasileiro - Série B',2016),(13,'Campeonato Brasileiro - Série C',2016),(14,'Campeonato Brasileiro - Série D',2016),(15,'Copa Do Brasil - Profissional',2016),(16,'Campeonato Brasileiro - Série A',2017),(17,'Campeonato Brasileiro - Série B',2017),(18,'Campeonato Brasileiro - Série C',2017),(19,'Campeonato Brasileiro - Série D',2017),(20,'Copa Do Brasil - Profissional',2017),(21,'Campeonato Brasileiro - Série A',2018),(22,'Campeonato Brasileiro - Série B',2018),(23,'Campeonato Brasileiro - Série C',2018),(24,'Campeonato Brasileiro - Série D',2018),(25,'Copa Do Brasil - Profissional',2018),(26,'Campeonato Brasileiro - Série A',2019),(27,'Campeonato Brasileiro - Série B',2019),(28,'Campeonato Brasileiro - Série C',2019),(29,'Campeonato Brasileiro - Série D',2019),(30,'Copa Do Brasil - Profissional',2019),(31,'Campeonato Brasileiro - Série A',2020),(32,'Campeonato Brasileiro - Série B',2020),(33,'Campeonato Brasileiro - Série C',2020),(34,'Campeonato Brasileiro - Série D',2020),(35,'Copa Do Brasil - Profissional',2020),(36,'Campeonato Brasileiro - Série A',2021),(37,'Campeonato Brasileiro - Série B',2021),(38,'Campeonato Brasileiro - Série C',2021),(39,'Campeonato Brasileiro - Série D',2021),(40,'Copa Do Brasil - Profissional',2021),(41,'Campeonato Brasileiro - Série A',2022),(42,'Campeonato Brasileiro - Série B',2022),(43,'Campeonato Brasileiro - Série C',2022),(44,'Campeonato Brasileiro - Série D',2022),(45,'Copa Do Brasil - Profissional',2022),(46,'Copa Do Brasil - Profissional',2023);
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-14 10:13:54
