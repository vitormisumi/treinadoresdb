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
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_id_UNIQUE` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Flamengo','RJ'),(2,'Goiás','GO'),(3,'Fluminense','RJ'),(4,'Figueirense','SC'),(5,'São Paulo','SP'),(6,'Botafogo','RJ'),(7,'Santos','SP'),(8,'Sport','PE'),(9,'Atletico','PR'),(10,'Grêmio','RS'),(11,'Atlético','MG'),(12,'Corinthians','SP'),(13,'Bahia','BA'),(14,'Cruzeiro','MG'),(15,'Internacional','RS'),(16,'Vitória','BA'),(17,'Criciuma','SC'),(18,'Palmeiras','SP'),(19,'Chapecoense','SC'),(20,'Coritiba','PR'),(21,'Bragantino','SP'),(22,'Náutico','PE'),(23,'Ponte Preta','SP'),(24,'Icasa','CE'),(25,'Vasco Da Gama','RJ'),(26,'América','MG'),(27,'Santa Cruz','PE'),(28,'ABC','RN'),(29,'Sampaio Correa','MA'),(30,'Paraná','PR'),(31,'Ceará','CE'),(32,'Oeste','SP'),(33,'Vila Nova','GO'),(34,'Luverdense','MT'),(35,'América','RN'),(36,'Avaí','SC'),(37,'Boa','MG'),(38,'Atlético','GO'),(39,'Portuguesa','SP'),(40,'Joinville','SC'),(41,'Botafogo','PB'),(42,'Treze','PB'),(43,'Paysandu','PA'),(44,'Aguia','PA'),(46,'CRB','AL'),(47,'Salgueiro','PE'),(48,'Fortaleza','CE'),(49,'Cuiabá','MT'),(50,'CRAC','GO'),(52,'Juventude','RS'),(53,'Madureira','RJ'),(54,'Duque De Caxias','RJ'),(55,'Mogi Mirim','SP'),(56,'Guaratinguetá','SP'),(57,'Tupi','MG'),(58,'Macae','RJ'),(59,'São Caetano','SP'),(60,'Guarani','SP'),(62,'Princesa Do Solimões','AM'),(63,'Genus','RO'),(64,'Atlético','AC'),(65,'Guarany','CE'),(67,'Remo','PA'),(68,'Moto Club','MA'),(69,'Baraúnas','RN'),(70,'Central','PE'),(71,'Coruripe','AL'),(72,'Jacuipense','BA'),(73,'Porto','PE'),(74,'Globo','RN'),(75,'Vitória Da Conquista','BA'),(76,'Betim','MG'),(77,'Villa Nova','MG'),(78,'Brasiliense','DF'),(80,'Anapolina','GO'),(81,'Luziania','DF'),(82,'Tombense','MG'),(83,'Goianesia','GO'),(84,'Operário','MT'),(85,'Cabofriense','RJ'),(86,'Guarani','SC'),(87,'Ituano','SP'),(88,'Brasil','RS'),(89,'Metropolitano','SC'),(90,'Boavista','RJ'),(91,'Pelotas','RS'),(92,'Penapolense','SP'),(93,'Rio Branco','AC'),(94,'Santos','AP'),(95,'São Raimundo','RR'),(96,'Interporto','TO'),(97,'Campinense','PB'),(98,'Confiança','SE'),(99,'Estrela Do Norte','ES'),(100,'Grêmio Barueri','SP'),(101,'Maringá','PR'),(102,'Londrina','PR'),(103,'Itaporã','MS'),(104,'River','PI'),(106,'Resende','RJ'),(107,'Nautico','RR'),(108,'Sao Bernardo','SP'),(109,'J. Malucelli','PR'),(110,'Novo Hamburgo','RS'),(111,'Flamengo','PI'),(112,'Desportiva','ES'),(113,'Mixto','MT'),(114,'Vilhena','RO'),(115,'Naviraiense','MS'),(116,'Paragominas','PA'),(117,'Horizonte','CE'),(118,'Juazeiro','BA'),(119,'Sergipe','SE'),(120,'Bahia De Feira','BA'),(121,'Sao Luiz','RS'),(122,'Nacional','AM'),(123,'Lagarto','SE'),(124,'Potiguar','RN'),(125,'Santa Rita','AL'),(126,'CSA','AL'),(127,'Rondonopolis','MT'),(128,'Plácido De Castro','AC'),(129,'Lajeadense','RS'),(130,'Cene','MS'),(131,'Caldense','MG'),(132,'Brasília','DF'),(133,'Maranhão','MA'),(134,'Barbalha','CE'),(135,'Parnahyba','PI'),(137,'ASA','AL'),(138,'Águia De Marabá','PA'),(139,'Caxias','RS'),(140,'Guarani','CE'),(141,'Palmas','TO'),(142,'Serra Talhada','PE'),(143,'Colo Colo','BA'),(144,'Serrano','BA'),(145,'Estanciano','SE'),(146,'Rio Branco','ES'),(147,'Aparecidense','GO'),(149,'Gama','DF'),(150,'Botafogo','SP'),(151,'Operario','PR'),(153,'Internacional','SC'),(154,'Foz Do Iguaçu','PR'),(155,'Volta Redonda','RJ'),(156,'Imperatriz','MA'),(157,'Comercial','MS'),(158,'Red Bull Brasil','SP'),(159,'Ypiranga','RS'),(160,'Santo André','SP'),(161,'Alecrim','RN'),(162,'Amadense','SE'),(166,'Capivariano','SP'),(167,'Real Noroeste','ES'),(168,'Águia Negra','MS'),(169,'Murici','AL'),(170,'Independente','PA'),(171,'Piauí','PI'),(172,'Trem','AP'),(173,'S.Francisco','PA'),(174,'Bare','RR'),(175,'São Raimundo','PA'),(176,'Rondoniense','RO'),(177,'Tocantinópolis','TO'),(178,'Juazeirense','BA'),(179,'Altos','PI'),(181,'Sousa','PB'),(182,'Galicia','BA'),(183,'América','PE'),(184,'Uniclinic','CE'),(185,'Itabaiana','SE'),(186,'Fluminense De Feira','BA'),(187,'Araguaia','MT'),(188,'Ceilândia','DF'),(189,'7 De Setembro','MS'),(190,'Anápolis','GO'),(191,'Sinop','MT'),(192,'Urt','MG'),(193,'Espirito Santo','ES'),(194,'Audax','SP'),(195,'São Bento','SP'),(196,'São José','RS'),(197,'Portuguesa','RJ'),(198,'Brusque','SC'),(199,'Linense','SP'),(200,'Pstc','PR'),(201,'São Paulo','RS'),(202,'Parauapebas','PA'),(203,'Ferroviária','SP'),(204,'Ivinhema','MS'),(205,'Galvez','AC'),(206,'Dom Bosco','MT'),(207,'Real Desportivo','RO'),(208,'Gurupi','TO'),(209,'Fast Clube','AM'),(210,'Tocantins Esporte Clube','TO'),(211,'Cordino','MA'),(214,'Atletico','PE'),(216,'Jacobina Ec','BA'),(217,'União De Rondonópolis','MT'),(218,'Itumbiara','GO'),(220,'Bangu','RJ'),(221,'Xv De Piracicaba','SP'),(222,'Friburguense','RJ'),(223,'Americano','RJ'),(224,'Novorizontino','SP'),(225,'Ipora','GO'),(226,'Corumbaense','MS'),(227,'Ferroviário','CE'),(228,'Macapa','AP'),(229,'4 De Julho','PI'),(230,'Sparta','TO'),(231,'Belo Jardim','PE'),(232,'Flamengo','PE'),(233,'Uberlândia','MG'),(234,'Atletico','ES'),(235,'Mirassol','SP'),(236,'Nova Iguaçu','RJ'),(237,'Tubarão','SC'),(238,'Cianorte','PR'),(239,'Prudentópolis','PR'),(240,'Manaus','AM'),(241,'ASSU','RN'),(242,'Novoperario','MS'),(243,'Barcelona','RO'),(244,'Inter De Lages','SC'),(245,'Aimoré','RS'),(246,'Novo','MS'),(247,'Floresta','CE'),(248,'Inter De Limeira','SP'),(249,'Athletico Paranaense','PR'),(252,'Atlético Roraima','RR'),(253,'Ypiranga','AP'),(254,'Bragantino','PA'),(255,'Santa Cruz','RN'),(256,'Atlético Cearense','CE'),(257,'Serrano','PB'),(258,'Vitória','PE'),(260,'Atletico Patrocinense','MG'),(261,'Operário','MS'),(262,'Vitoria F. C.','ES'),(263,'Sobradinho','DF'),(265,'Hercilio Luz Futebol Clube','SC'),(266,'Associacao Desportiva Itaborai','RJ'),(267,'Gaúcho','RS'),(268,'Avenida','RS'),(269,'Votuporanguense','SP'),(270,'Serra','ES'),(271,'Red Bull Bragantino','SP'),(272,'Ji-Paraná','RO'),(274,'Aquidauanense','MS'),(275,'Vilhenense','RO'),(277,'Afogados','PE'),(278,'Atletico De Cajazeiras','PB'),(279,'Frei Paulistano','SE'),(280,'Jaciobá','AL'),(281,'União','MT'),(282,'Goiania','GO'),(283,'Atlético','BA'),(284,'Tupynambas','MG'),(285,'Toledo','PR'),(286,'Nacional','PR'),(287,'FC Cascavel','PR'),(288,'Marcílio Dias','SC'),(289,'Caucaia','CE'),(291,'Santana','AP'),(292,'G.A.S','RR'),(293,'Picos','PI'),(294,'Real Ariquemes','RO'),(295,'Penarol','AM'),(296,'Castanhal','PA'),(297,'Sampaio','RR'),(298,'Juventude','MA'),(299,'Retrô','PE'),(300,'Porto Velho','RO'),(301,'Jaraguá','GO'),(302,'Nova Mutum','MT'),(303,'Ca Patrocinense','MG'),(304,'Rio Branco - Vn','ES'),(305,'Real Brasília','DF'),(306,'Esportivo','RS'),(307,'Santa Cruz','RS'),(308,'Marilia','SP'),(309,'Cascavel','PR'),(316,'São Raimundo','AM'),(317,'Humaitá','AC'),(318,'Amazonas Fc','AM'),(319,'Pacajus','CE'),(320,'Tuna Luso','PA'),(321,'Fluminense','PI'),(322,'São Paulo Crystal','PB'),(323,'Crato','CE'),(324,'Cse','AL'),(325,'Costa Rica','MS'),(326,'Ação','MT'),(327,'Gremio Anapolis','GO'),(328,'Nova Venecia F. C.','ES'),(329,'Pouso Alegre','MG'),(330,'Pérolas Negras','RJ'),(331,'Sao Bernardo Fc','SP'),(332,'Ge Juventus','SC'),(333,'Prospera','SC'),(334,'Azuriz','PR'),(336,'Marica','RJ'),(337,'Tuntum','MA'),(338,'Gloria','RS'),(339,'Atlhetic Ce Saf','MG'),(340,'Ec Democrata','MG'),(342,'Camboriu Futebol Clube','SC'),(343,'Falcon','SE'),(344,'Sao Francisco','AC'),(345,'Iguatu','CE'),(346,'Mutum Esporte Clube','MT');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-21  9:40:59
