CREATE DATABASE  IF NOT EXISTS `registra` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `registra`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: registra
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `building` (
  `BldCode` varchar(5) NOT NULL,
  `BldName` varchar(60) NOT NULL,
  PRIMARY KEY (`BldCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES ('EN100','Engineering Centennial Memorial Building'),('ENG3','Engineering 3');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `CName` varchar(50) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Credit` double NOT NULL,
  `BldCode` varchar(5) DEFAULT NULL,
  `RoomNum` varchar(5) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  PRIMARY KEY (`CID`,`Semester`),
  KEY `c_fk_room` (`BldCode`,`RoomNum`),
  KEY `coursename_index` (`CID`,`Semester`,`CName`),
  CONSTRAINT `c_fk_room` FOREIGN KEY (`BldCode`, `RoomNum`) REFERENCES `room` (`BldCode`, `RoomNum`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('2110332','2/2017','Systems Analysis and Design',NULL,3,NULL,NULL,NULL,NULL,NULL),('2110422','2/2017','Database Management Systems Design','placeholder',3,'EN100','405','2007-05-11','08:30:00','11:30:00');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `FID` varchar(2) NOT NULL,
  `DID` varchar(2) NOT NULL,
  `DName` varchar(50) NOT NULL,
  PRIMARY KEY (`FID`,`DID`),
  CONSTRAINT `dep_fk_faculty` FOREIGN KEY (`FID`) REFERENCES `faculty` (`FID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('21','00','Engineering'),('21','03','Civil Engineering'),('21','10','Computer Engineering');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll`
--

DROP TABLE IF EXISTS `enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enroll` (
  `SID` varchar(10) NOT NULL,
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `SecNum` varchar(2) NOT NULL,
  PRIMARY KEY (`SID`,`CID`,`Semester`,`SecNum`),
  KEY `enroll_fk_sec` (`CID`,`Semester`,`SecNum`),
  CONSTRAINT `enroll_fk_sec` FOREIGN KEY (`CID`, `Semester`, `SecNum`) REFERENCES `section` (`CID`, `Semester`, `SecNum`) ON DELETE CASCADE,
  CONSTRAINT `enroll_fk_student` FOREIGN KEY (`SID`) REFERENCES `student` (`SID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll`
--

LOCK TABLES `enroll` WRITE;
/*!40000 ALTER TABLE `enroll` DISABLE KEYS */;
INSERT INTO `enroll` VALUES ('5830000021','2110332','2/2017','2'),('5830000021','2110422','2/2017','1'),('5931111121','2110422','2/2017','1');
/*!40000 ALTER TABLE `enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `FID` varchar(2) NOT NULL,
  `FName` varchar(50) NOT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('21','Faculty of Engineering'),('22','Faculty of Arts'),('23','Faculty of Science'),('24','Faculty of Political Science'),('25','Faculty of Architecture'),('26','Faculty of Commerce and Accountancy'),('27','Faculty of Education'),('28','Faculty of Communication Arts'),('29','Faculty of Economics'),('30','Faculty of Medicine'),('31','Faculty of Veterinary Science'),('32','Faculty of Dentistry'),('33','Faculty of Pharmaceutical Sciences'),('34','Faculty of Law'),('35','Faculty of Fine and Applied Arts'),('37','Faculty of Allied Health Sciences'),('38','Faculty of Psychology'),('39','Faculty of Sports Science'),('40','School of Agricultural');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grade` (
  `SID` varchar(10) NOT NULL,
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `Grade` double DEFAULT NULL,
  `WFlag` tinyint(1) NOT NULL,
  PRIMARY KEY (`SID`,`CID`,`Semester`),
  KEY `grade_fk_course` (`CID`,`Semester`),
  CONSTRAINT `grade_fk_course` FOREIGN KEY (`CID`, `Semester`) REFERENCES `course` (`CID`, `Semester`) ON DELETE CASCADE,
  CONSTRAINT `grade_fk_std` FOREIGN KEY (`SID`) REFERENCES `student` (`SID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES ('5830000021','2110332','2/2017',NULL,0),('5830000021','2110422','2/2017',3.5,0),('5931111121','2110422','2/2017',NULL,0);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prequire`
--

DROP TABLE IF EXISTS `prequire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prequire` (
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `PFID` varchar(2) NOT NULL,
  `PDID` varchar(2) NOT NULL,
  `Pname` varchar(50) NOT NULL,
  `Year` varchar(4) NOT NULL,
  PRIMARY KEY (`CID`,`Semester`,`PFID`,`PDID`,`Pname`,`Year`),
  KEY `req_fk_program` (`PFID`,`PDID`,`Pname`,`Year`),
  CONSTRAINT `req_fk_course` FOREIGN KEY (`CID`, `Semester`) REFERENCES `course` (`CID`, `Semester`) ON DELETE CASCADE,
  CONSTRAINT `req_fk_program` FOREIGN KEY (`PFID`, `PDID`, `Pname`, `Year`) REFERENCES `program` (`FID`, `DID`, `Pname`, `Year`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prequire`
--

LOCK TABLES `prequire` WRITE;
/*!40000 ALTER TABLE `prequire` DISABLE KEYS */;
INSERT INTO `prequire` VALUES ('2110332','2/2017','21','10','Bachelor of Engineering (Computer Engineering)','2010'),('2110422','2/2017','21','10','Bachelor of Engineering (Computer Engineering)','2010');
/*!40000 ALTER TABLE `prequire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `FID` varchar(2) NOT NULL,
  `DID` varchar(2) NOT NULL,
  `Pname` varchar(100) NOT NULL,
  `Year` varchar(4) NOT NULL,
  PRIMARY KEY (`FID`,`DID`,`Pname`,`Year`),
  CONSTRAINT `p_fk_department` FOREIGN KEY (`FID`, `DID`) REFERENCES `department` (`FID`, `DID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES ('21','10','Bachelor of Engineering (Computer Engineering)','2010'),('21','10','Bachelor of Engineering (Computer Engineering)','2016'),('21','10','Master of Engineering (Computer Engineering)','2015');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt` (
  `ReceiptNum` varchar(12) NOT NULL,
  `PayDate` date NOT NULL,
  `PrintStatus` tinyint(1) NOT NULL,
  PRIMARY KEY (`ReceiptNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES ('111111111111','2017-03-12',1),('999999999999','2017-04-18',0);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `BldCode` varchar(5) NOT NULL,
  `RoomNum` varchar(5) NOT NULL,
  `RoomType` varchar(10) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  PRIMARY KEY (`BldCode`,`RoomNum`),
  CONSTRAINT `room_fk_bld` FOREIGN KEY (`BldCode`) REFERENCES `building` (`BldCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('EN100','405','Classroom',1),('EN100','406','Classroom',1);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s_document`
--

DROP TABLE IF EXISTS `s_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s_document` (
  `SID` varchar(10) NOT NULL,
  `DocID` varchar(4) NOT NULL,
  PRIMARY KEY (`SID`,`DocID`),
  CONSTRAINT `fk_s_doc` FOREIGN KEY (`SID`) REFERENCES `student` (`SID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s_document`
--

LOCK TABLES `s_document` WRITE;
/*!40000 ALTER TABLE `s_document` DISABLE KEYS */;
INSERT INTO `s_document` VALUES ('5830000021','CR00'),('5830000021','CR01');
/*!40000 ALTER TABLE `s_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `SecNum` varchar(2) NOT NULL,
  PRIMARY KEY (`CID`,`Semester`,`SecNum`),
  CONSTRAINT `section_fk` FOREIGN KEY (`CID`, `Semester`) REFERENCES `course` (`CID`, `Semester`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES ('2110332','2/2017','1'),('2110332','2/2017','2'),('2110422','2/2017','1'),('2110422','2/2017','2');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `SID` varchar(10) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Status` varchar(1) DEFAULT NULL,
  `CurrentFlag` tinyint(1) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `FFlag` tinyint(1) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `NID` varchar(13) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `Passport` varchar(15) DEFAULT NULL,
  `BloodType` varchar(2) DEFAULT NULL,
  `Ename` varchar(50) DEFAULT NULL,
  `Ephone` varchar(10) DEFAULT NULL,
  `AdvisorTID` varchar(10) DEFAULT NULL,
  `FID` varchar(2) DEFAULT NULL,
  `DID` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`SID`),
  KEY `std_fk_department` (`FID`,`DID`),
  KEY `std_advisor_index` (`AdvisorTID`),
  CONSTRAINT `std_fk_advisor` FOREIGN KEY (`AdvisorTID`) REFERENCES `teacher` (`TID`),
  CONSTRAINT `std_fk_department` FOREIGN KEY (`FID`, `DID`) REFERENCES `department` (`FID`, `DID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('5830000021','notAPassword','B',1,'Someone','notAlum',0,'0987654321','987 somewhere','1996-12-31','9999999999999','M',NULL,'B','Some mom','0123456789','1111111111','21','10'),('5931111121','1234','B',1,'Goku','Sun',1,'0912345678','Far East','1999-01-01',NULL,'M','111B111B111','O','Who?','0000000000','2222222222','21','00');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_document`
--

DROP TABLE IF EXISTS `t_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_document` (
  `TID` varchar(10) NOT NULL,
  `DocID` varchar(4) NOT NULL,
  PRIMARY KEY (`TID`,`DocID`),
  CONSTRAINT `fk_t_doc` FOREIGN KEY (`TID`) REFERENCES `teacher` (`TID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_document`
--

LOCK TABLES `t_document` WRITE;
/*!40000 ALTER TABLE `t_document` DISABLE KEYS */;
INSERT INTO `t_document` VALUES ('1111111111','CR98'),('1111111111','CR99');
/*!40000 ALTER TABLE `t_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teach`
--

DROP TABLE IF EXISTS `teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teach` (
  `TID` varchar(10) NOT NULL,
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `SecNum` varchar(2) NOT NULL,
  PRIMARY KEY (`TID`,`CID`,`Semester`,`SecNum`),
  KEY `teach_fk_sec` (`CID`,`Semester`,`SecNum`),
  CONSTRAINT `teach_fk_sec` FOREIGN KEY (`CID`, `Semester`, `SecNum`) REFERENCES `section` (`CID`, `Semester`, `SecNum`) ON DELETE CASCADE,
  CONSTRAINT `teach_fk_tid` FOREIGN KEY (`TID`) REFERENCES `teacher` (`TID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teach`
--

LOCK TABLES `teach` WRITE;
/*!40000 ALTER TABLE `teach` DISABLE KEYS */;
INSERT INTO `teach` VALUES ('1111111111','2110332','2/2017','2'),('1111111111','2110422','2/2017','2');
/*!40000 ALTER TABLE `teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `TID` varchar(10) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `FFlag` tinyint(1) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `NID` varchar(13) DEFAULT NULL,
  `Sex` varchar(1) DEFAULT NULL,
  `Passport` varchar(15) DEFAULT NULL,
  `BloodType` varchar(2) DEFAULT NULL,
  `Ename` varchar(50) DEFAULT NULL,
  `Ephone` varchar(10) DEFAULT NULL,
  `FID` varchar(2) DEFAULT NULL,
  `DID` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`TID`),
  KEY `t_fk_department` (`FID`,`DID`),
  CONSTRAINT `t_fk_department` FOREIGN KEY (`FID`, `DID`) REFERENCES `department` (`FID`, `DID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('1111111111','password','Jane','Doe',0,'0999999999','111 Phayathai Bangkok','1970-01-01','1111111111111','F',NULL,'A','John Doe','0888888888','21','10'),('2222222222','abcd','Paddington','Brown',1,'0900000000','Darkest Peru','2000-02-14',NULL,'M','123A123A123','B','Aunt Lucy','0800000000','21','00');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tuition`
--

DROP TABLE IF EXISTS `tuition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tuition` (
  `SID` varchar(10) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `ReceiptNum` varchar(12) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  PRIMARY KEY (`SID`,`Semester`),
  KEY `fk_receipt` (`ReceiptNum`),
  CONSTRAINT `fk_receipt` FOREIGN KEY (`ReceiptNum`) REFERENCES `receipt` (`ReceiptNum`) ON DELETE SET NULL,
  CONSTRAINT `tuition_fk_student` FOREIGN KEY (`SID`) REFERENCES `student` (`SID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tuition`
--

LOCK TABLES `tuition` WRITE;
/*!40000 ALTER TABLE `tuition` DISABLE KEYS */;
INSERT INTO `tuition` VALUES ('5830000021','1/2017',NULL,21000,0),('5830000021','2/2017','999999999999',21000,1),('5931111121','2/2017','111111111111',21000,1);
/*!40000 ALTER TABLE `tuition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_room`
--

DROP TABLE IF EXISTS `use_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `use_room` (
  `CID` varchar(7) NOT NULL,
  `Semester` varchar(6) NOT NULL,
  `SecNum` varchar(2) NOT NULL,
  `BldCode` varchar(5) NOT NULL,
  `RoomNum` varchar(5) NOT NULL,
  `Day` varchar(3) NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  PRIMARY KEY (`CID`,`Semester`,`SecNum`,`BldCode`,`RoomNum`,`Day`),
  KEY `use_fk_room` (`BldCode`,`RoomNum`),
  CONSTRAINT `use_fk_room` FOREIGN KEY (`BldCode`, `RoomNum`) REFERENCES `room` (`BldCode`, `RoomNum`) ON DELETE CASCADE,
  CONSTRAINT `use_fk_sec` FOREIGN KEY (`CID`, `Semester`, `SecNum`) REFERENCES `section` (`CID`, `Semester`, `SecNum`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_room`
--

LOCK TABLES `use_room` WRITE;
/*!40000 ALTER TABLE `use_room` DISABLE KEYS */;
INSERT INTO `use_room` VALUES ('2110422','2/2017','1','EN100','405','MON','08:00:00','09:00:00'),('2110422','2/2017','2','EN100','405','TUE','08:00:00','09:00:00');
/*!40000 ALTER TABLE `use_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-29 12:17:45
