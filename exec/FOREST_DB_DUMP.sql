-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: k8b105.p.ssafy.io    Database: forest
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `cheering_msgs`
--

DROP TABLE IF EXISTS `cheering_msgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheering_msgs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(200) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_answer_rates`
--

DROP TABLE IF EXISTS `class_answer_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_answer_rates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_rate` int NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `ungraded_rate` int NOT NULL DEFAULT '0',
  `problem_list_id` bigint NOT NULL,
  `study_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi9ucta3dgafpijxigicadh3lj` (`problem_list_id`),
  KEY `FKmdd47fjow82y116nl1i2vqx5u` (`study_id`),
  CONSTRAINT `FKi9ucta3dgafpijxigicadh3lj` FOREIGN KEY (`problem_list_id`) REFERENCES `problem_lists` (`id`),
  CONSTRAINT `FKmdd47fjow82y116nl1i2vqx5u` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_study_results`
--

DROP TABLE IF EXISTS `class_study_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_study_results` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `average` double DEFAULT NULL,
  `average_solving_time` bigint DEFAULT NULL,
  `correct_answer_rate` int DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `participant_student` int DEFAULT NULL,
  `standard_deviation` double DEFAULT NULL,
  `take_rate` int DEFAULT NULL,
  `total_student` int DEFAULT NULL,
  `ungraded_answer_rate` int DEFAULT NULL,
  `study_id` bigint NOT NULL,
  `is_finished` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKrml6bgrd9jvav45j7cbn6mo40` (`study_id`),
  CONSTRAINT `FKrml6bgrd9jvav45j7cbn6mo40` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_users`
--

DROP TABLE IF EXISTS `class_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `class_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK986u17ogt99rvrd5gumq16s6f` (`class_id`),
  KEY `FKltoe9fc3cw9lrjqy9f4aytjoc` (`user_id`),
  CONSTRAINT `FK986u17ogt99rvrd5gumq16s6f` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `FKltoe9fc3cw9lrjqy9f4aytjoc` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(20) NOT NULL,
  `owner_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK84apqx2jc7pdcfc8d16hvklt1` (`owner_id`),
  CONSTRAINT `FK84apqx2jc7pdcfc8d16hvklt1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(200) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_image` tinyint(1) NOT NULL DEFAULT '0',
  `no` int NOT NULL,
  `problem_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK849vhdoe3bbkyehsryrin1yf3` (`problem_id`),
  CONSTRAINT `FK849vhdoe3bbkyehsryrin1yf3` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=559 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memos`
--

DROP TABLE IF EXISTS `memos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `updated_date` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjfl1v48y7d1vlk2jw1qqm3x42` (`user_id`),
  CONSTRAINT `FKjfl1v48y7d1vlk2jw1qqm3x42` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `problem_lists`
--

DROP TABLE IF EXISTS `problem_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_lists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `problem_num` int NOT NULL,
  `problem_id` bigint NOT NULL,
  `workbook_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc55yqws5nrtdx0p5g5ecfpyxu` (`problem_id`),
  KEY `FKpx9am4bdn1p1sww7jy6vcs27t` (`workbook_id`),
  CONSTRAINT `FKc55yqws5nrtdx0p5g5ecfpyxu` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`),
  CONSTRAINT `FKpx9am4bdn1p1sww7jy6vcs27t` FOREIGN KEY (`workbook_id`) REFERENCES `workbooks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problems` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `path` varchar(255) DEFAULT NULL,
  `point` int NOT NULL,
  `text` text,
  `title` text,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_study_problem_results`
--

DROP TABLE IF EXISTS `student_study_problem_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_study_problem_results` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_corrected` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_graded` tinyint(1) NOT NULL DEFAULT '0',
  `part_point` int NOT NULL DEFAULT '0',
  `user_answer` varchar(255) DEFAULT NULL,
  `problem_list_id` bigint NOT NULL,
  `study_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi05g9rh50ow474lgy9ek9sqc8` (`problem_list_id`),
  KEY `FK931mcq6s4vdlvlylyhxqbx230` (`study_id`),
  KEY `FKp0hdu6lt1ch80gdsyx8cjk0dg` (`user_id`),
  CONSTRAINT `FK931mcq6s4vdlvlylyhxqbx230` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`),
  CONSTRAINT `FKi05g9rh50ow474lgy9ek9sqc8` FOREIGN KEY (`problem_list_id`) REFERENCES `problem_lists` (`id`),
  CONSTRAINT `FKp0hdu6lt1ch80gdsyx8cjk0dg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=724 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_study_results`
--

DROP TABLE IF EXISTS `student_study_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_study_results` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_num` int NOT NULL DEFAULT '0',
  `correct_rate` int NOT NULL DEFAULT '0',
  `enter_time` timestamp NULL DEFAULT NULL,
  `exit_time` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_graded` tinyint(1) NOT NULL DEFAULT '0',
  `score` int NOT NULL DEFAULT '0',
  `study_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `is_submitted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKiiienf9o8rn38c21xuko8185t` (`study_id`),
  KEY `FKovxfw9rmdmb76m7brlnuw15h1` (`user_id`),
  CONSTRAINT `FKiiienf9o8rn38c21xuko8185t` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`),
  CONSTRAINT `FKovxfw9rmdmb76m7brlnuw15h1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `studies`
--

DROP TABLE IF EXISTS `studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `class_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `workbook_id` bigint NOT NULL,
  `type` varchar(10) DEFAULT 'SELF',
  `name` varchar(20) NOT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKnecvpbfhqa0s28c75thgy4bou` (`class_id`),
  KEY `FK41fw82vd9facxwi6k68q0cu53` (`user_id`),
  KEY `FKak1464finuo2oaj5t90w41tla` (`workbook_id`),
  CONSTRAINT `FK41fw82vd9facxwi6k68q0cu53` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKak1464finuo2oaj5t90w41tla` FOREIGN KEY (`workbook_id`) REFERENCES `workbooks` (`id`),
  CONSTRAINT `FKnecvpbfhqa0s28c75thgy4bou` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_workbooks`
--

DROP TABLE IF EXISTS `user_workbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_workbooks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `workbook_id` bigint NOT NULL,
  `is_bookmarked` tinyint(1) NOT NULL DEFAULT '0',
  `is_scraped` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKoak66oi7p622exxcbovu8emnv` (`user_id`),
  KEY `FKs8862d4beo81s1vq1b3r9issn` (`workbook_id`),
  CONSTRAINT `FKoak66oi7p622exxcbovu8emnv` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKs8862d4beo81s1vq1b3r9issn` FOREIGN KEY (`workbook_id`) REFERENCES `workbooks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `auth_provider` varchar(10) DEFAULT 'LOCAL',
  `role` varchar(10) DEFAULT 'STUDENT',
  `email` varchar(50) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workbook_imgs`
--

DROP TABLE IF EXISTS `workbook_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_imgs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workbooks`
--

DROP TABLE IF EXISTS `workbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbooks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `workbook_imgs_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `volume` int NOT NULL DEFAULT '0',
  `is_executed` tinyint(1) NOT NULL DEFAULT '0',
  `is_deploy` tinyint(1) DEFAULT '0',
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKj3in8gtikaa25funjf2e5oh9c` (`creator_id`),
  KEY `FKaojqprjnie4l3rq5619bg1c79` (`workbook_imgs_id`),
  CONSTRAINT `FKaojqprjnie4l3rq5619bg1c79` FOREIGN KEY (`workbook_imgs_id`) REFERENCES `workbook_imgs` (`id`),
  CONSTRAINT `FKj3in8gtikaa25funjf2e5oh9c` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 23:48:00
