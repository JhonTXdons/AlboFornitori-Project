-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: albo
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AccessoAzienda`
--

DROP TABLE IF EXISTS `AccessoAzienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccessoAzienda` (
  `Mail` varchar(50) NOT NULL,
  `Passwd` varchar(50) NOT NULL,
  `ID` char(11) DEFAULT NULL,
  `Token` varchar(30) DEFAULT NULL,
  `Ruolo` enum('Banditore','Supervisore') NOT NULL DEFAULT 'Banditore',
  PRIMARY KEY (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccessoAzienda`
--

LOCK TABLES `AccessoAzienda` WRITE;
/*!40000 ALTER TABLE `AccessoAzienda` DISABLE KEYS */;
INSERT INTO `AccessoAzienda` VALUES ('admin@lucegas.it','Prova123','A0000000001',NULL,'Banditore');
/*!40000 ALTER TABLE `AccessoAzienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccessoForn`
--

DROP TABLE IF EXISTS `AccessoForn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccessoForn` (
  `Mail` varchar(50) NOT NULL,
  `Passwd` varchar(50) NOT NULL,
  `ID` char(11) DEFAULT NULL,
  `Token` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccessoForn`
--

LOCK TABLES `AccessoForn` WRITE;
/*!40000 ALTER TABLE `AccessoForn` DISABLE KEYS */;
INSERT INTO `AccessoForn` VALUES ('franco.rossi@rossiristorazione.it','PasswordRossi','F0000000001',NULL);
/*!40000 ALTER TABLE `AccessoForn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Azienda`
--

DROP TABLE IF EXISTS `Azienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Azienda` (
  `IdAzienda` char(11) NOT NULL,
  `NomeAzienda` varchar(70) NOT NULL,
  `MailBando` varchar(50) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  PRIMARY KEY (`IdAzienda`),
  UNIQUE KEY `NomeAzienda` (`NomeAzienda`),
  UNIQUE KEY `MailBando` (`MailBando`),
  UNIQUE KEY `Telefono` (`Telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Azienda`
--

LOCK TABLES `Azienda` WRITE;
/*!40000 ALTER TABLE `Azienda` DISABLE KEYS */;
INSERT INTO `Azienda` VALUES ('A0000000001','LuceGas S.p.A','bando2019@lucegas.it','0311234567');
/*!40000 ALTER TABLE `Azienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bando`
--

DROP TABLE IF EXISTS `Bando`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bando` (
  `IdBando` int(11) NOT NULL AUTO_INCREMENT,
  `NomeBando` varchar(100) NOT NULL,
  `Categoria` varchar(30) NOT NULL,
  `DataCreazione` date NOT NULL,
  `DataApertura` date NOT NULL,
  `DataChiusura` date NOT NULL,
  `SogliaMax` int(11) NOT NULL,
  `MinRating` int(3) DEFAULT '0',
  `Stato` enum('Aperto','Chiuso','Nascosto') DEFAULT 'Nascosto',
  PRIMARY KEY (`IdBando`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bando`
--

LOCK TABLES `Bando` WRITE;
/*!40000 ALTER TABLE `Bando` DISABLE KEYS */;
INSERT INTO `Bando` VALUES (1,'Appalto Mensa interna 2019','Alimentari','2018-09-01','2018-09-18','2018-10-30',10000,0,'Nascosto'),(2,'Nouvelle Cousine','Alimentari','2018-10-01','2018-10-18','2018-11-30',100000,0,'Nascosto'),(3,'Carlo Cracco tour','Alimentari','2018-10-01','2018-10-18','2018-11-30',100000,22,'Nascosto');
/*!40000 ALTER TABLE `Bando` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Certificazione`
--

DROP TABLE IF EXISTS `Certificazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Certificazione` (
  `Codice` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(50) NOT NULL,
  `Data` date NOT NULL,
  `Scadenza` date DEFAULT NULL,
  PRIMARY KEY (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Certificazione`
--

LOCK TABLES `Certificazione` WRITE;
/*!40000 ALTER TABLE `Certificazione` DISABLE KEYS */;
/*!40000 ALTER TABLE `Certificazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documento`
--

DROP TABLE IF EXISTS `Documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Documento` (
  `Codice` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(30) NOT NULL,
  `Data` date NOT NULL,
  `Scadenza` date NOT NULL,
  PRIMARY KEY (`Codice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documento`
--

LOCK TABLES `Documento` WRITE;
/*!40000 ALTER TABLE `Documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `Documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fornitore`
--

DROP TABLE IF EXISTS `Fornitore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fornitore` (
  `IdForn` char(11) NOT NULL,
  `NomeForn` varchar(50) NOT NULL,
  `IVAForn` char(11) NOT NULL,
  `FGiurid` varchar(15) NOT NULL,
  `ATECO` char(17) NOT NULL,
  `ProvinciaCCIAA` enum('AG','AL','AN','AO','AP','AQ','AR','AT','AV','BG','BI','BL','BN','BR','BS','BT','BZ','CB','CE','CH','CL','CN','CO','CR','CS','CZ','EN','FC','FE','FG','FM','FR','GO','GR','IM','IS','KR','LC','LE','LI','LO','LT','LU','MB','MC','MI','MN','MO','MS','MT','NO','NU','OR','PC','PD','PE','PG','PI','PN','PO','PR','PT','PU','PV','PZ','RA','RE','RG','RI','RN','RO','SA','SI','SO','SP','SR','SS','SU','SV','TA','TN','TP','TR','TS','TV','UD','VA','VB','VC','VI','VR','VT','VV') NOT NULL,
  `NumeroREA` varchar(10) NOT NULL,
  `SitoWeb` varchar(50) NOT NULL,
  `PEC` varchar(70) NOT NULL,
  `AreaServizio` varchar(100) NOT NULL,
  `SLStato` varchar(20) NOT NULL,
  `SLRegione` varchar(20) NOT NULL,
  `SLProvincia` enum('AG','AL','AN','AO','AP','AQ','AR','AT','AV','BG','BI','BL','BN','BR','BS','BT','BZ','CB','CE','CH','CL','CN','CO','CR','CS','CZ','EN','FC','FE','FG','FM','FR','GO','GR','IM','IS','KR','LC','LE','LI','LO','LT','LU','MB','MC','MI','MN','MO','MS','MT','NO','NU','OR','PC','PD','PE','PG','PI','PN','PO','PR','PT','PU','PV','PZ','RA','RE','RG','RI','RN','RO','SA','SI','SO','SP','SR','SS','SU','SV','TA','TN','TP','TR','TS','TV','UD','VA','VB','VC','VI','VR','VT','VV') NOT NULL,
  `SLCAP` char(5) NOT NULL,
  `SLIndirizzo` varchar(50) NOT NULL,
  `SLFAX` varchar(10) NOT NULL,
  `SAmmStato` varchar(20) NOT NULL,
  `SAmmRegione` varchar(20) NOT NULL,
  `SAmmProvincia` enum('AG','AL','AN','AO','AP','AQ','AR','AT','AV','BG','BI','BL','BN','BR','BS','BT','BZ','CB','CE','CH','CL','CN','CO','CR','CS','CZ','EN','FC','FE','FG','FM','FR','GO','GR','IM','IS','KR','LC','LE','LI','LO','LT','LU','MB','MC','MI','MN','MO','MS','MT','NO','NU','OR','PC','PD','PE','PG','PI','PN','PO','PR','PT','PU','PV','PZ','RA','RE','RG','RI','RN','RO','SA','SI','SO','SP','SR','SS','SU','SV','TA','TN','TP','TR','TS','TV','UD','VA','VB','VC','VI','VR','VT','VV') NOT NULL,
  `SAmmCAP` char(5) NOT NULL,
  `SAmmIndirizzo` varchar(50) NOT NULL,
  `SAmmFAX` varchar(10) NOT NULL,
  `Categoria1` enum('Abbigliamento','Alimentari','Apparecchiature per ufficio','Arredamento','Articoli di rappresentanza','Attrezzature elettriche','Autovetture, officine e carburanti','Caccia e pesca','Cancelleria','Estetiste','Fiori e piante','Forniture alberghiere','Forniture e servizi igienici','Fornitura e manutenzione di impianti','Manutenzione locali','Organizzazione congressi','Parrucchieri','Personale','Fornitura e manutenzione di prodotti informatici','Prodotti tipografici e litografici','Pubblicazioni varie','Pubblicità','Servizi vari','Smaltimento rifiuti','Strade','Trasporto e traslochi','Architettura e ingegneria') NOT NULL,
  `Categoria2` enum('Abbigliamento','Alimentari','Apparecchiature per ufficio','Arredamento','Articoli di rappresentanza','Attrezzature elettriche','Autovetture, officine e carburanti','Caccia e pesca','Cancelleria','Estetiste','Fiori e piante','Forniture alberghiere','Forniture e servizi igienici','Fornitura e manutenzione di impianti','Manutenzione locali','Organizzazione congressi','Parrucchieri','Personale','Fornitura e manutenzione di prodotti informatici','Prodotti tipografici e litografici','Pubblicazioni varie','Pubblicità','Servizi vari','Smaltimento rifiuti','Strade','Trasporto e traslochi','Architettura e ingegneria') DEFAULT NULL,
  `Categoria3` enum('Abbigliamento','Alimentari','Apparecchiature per ufficio','Arredamento','Articoli di rappresentanza','Attrezzature elettriche','Autovetture, officine e carburanti','Caccia e pesca','Cancelleria','Estetiste','Fiori e piante','Forniture alberghiere','Forniture e servizi igienici','Fornitura e manutenzione di impianti','Manutenzione locali','Organizzazione congressi','Parrucchieri','Personale','Fornitura e manutenzione di prodotti informatici','Prodotti tipografici e litografici','Pubblicazioni varie','Pubblicità','Servizi vari','Smaltimento rifiuti','Strade','Trasporto e traslochi','Architettura e ingegneria') DEFAULT NULL,
  `Categoria4` enum('Abbigliamento','Alimentari','Apparecchiature per ufficio','Arredamento','Articoli di rappresentanza','Attrezzature elettriche','Autovetture, officine e carburanti','Caccia e pesca','Cancelleria','Estetiste','Fiori e piante','Forniture alberghiere','Forniture e servizi igienici','Fornitura e manutenzione di impianti','Manutenzione locali','Organizzazione congressi','Parrucchieri','Personale','Fornitura e manutenzione di prodotti informatici','Prodotti tipografici e litografici','Pubblicazioni varie','Pubblicità','Servizi vari','Smaltimento rifiuti','Strade','Trasporto e traslochi','Architettura e ingegneria') DEFAULT NULL,
  `FattAnnuo` int(11) NOT NULL,
  `CapSociale` int(11) NOT NULL,
  `NDipendenti` int(11) NOT NULL,
  `NStabilimenti` int(5) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `Cognome` varchar(30) NOT NULL,
  `Ruolo` varchar(30) NOT NULL,
  `Lingua` varchar(30) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Rating` int(3) DEFAULT '0',
  PRIMARY KEY (`IdForn`),
  UNIQUE KEY `IVAForn` (`IVAForn`),
  UNIQUE KEY `Telefono` (`Telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fornitore`
--

LOCK TABLES `Fornitore` WRITE;
/*!40000 ALTER TABLE `Fornitore` DISABLE KEYS */;
INSERT INTO `Fornitore` VALUES ('F0000000001','Rossi Ristorazione','12345678901','SNC','12345678901234567','CO','123456','www.rossiristorazione.it','pec@rossiristorazione.it','CO,RO','Italia','Lombardia','CO','22100','Via Roma, 1','0314567890','Italia','Lazio','RO','00118','Via Alessandria, 10','067890547','Alimentari',NULL,NULL,NULL,100000,70000,52,3,'Franco','Rossi','Titolare','Italiana','3381234567',0);
/*!40000 ALTER TABLE `Fornitore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gestione`
--

DROP TABLE IF EXISTS `Gestione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Gestione` (
  `RefBando` int(11) NOT NULL,
  `RefAzienda` int(11) NOT NULL,
  PRIMARY KEY (`RefBando`,`RefAzienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gestione`
--

LOCK TABLES `Gestione` WRITE;
/*!40000 ALTER TABLE `Gestione` DISABLE KEYS */;
INSERT INTO `Gestione` VALUES (1,0),(2,0),(3,0);
/*!40000 ALTER TABLE `Gestione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partecipazione`
--

DROP TABLE IF EXISTS `Partecipazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Partecipazione` (
  `RefBando` int(11) NOT NULL,
  `RefForn` int(11) NOT NULL,
  `DataIscr` date NOT NULL,
  `Candidatura` enum('In Attesa','Rifiutata','Approvata') NOT NULL DEFAULT 'In Attesa',
  `Vincitore` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RefBando`,`RefForn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partecipazione`
--

LOCK TABLES `Partecipazione` WRITE;
/*!40000 ALTER TABLE `Partecipazione` DISABLE KEYS */;
INSERT INTO `Partecipazione` VALUES (1,0,'0000-00-00','In Attesa',0);
/*!40000 ALTER TABLE `Partecipazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReqCert`
--

DROP TABLE IF EXISTS `ReqCert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReqCert` (
  `RefForn` int(11) NOT NULL,
  `IdCert` int(11) NOT NULL,
  PRIMARY KEY (`RefForn`,`IdCert`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReqCert`
--

LOCK TABLES `ReqCert` WRITE;
/*!40000 ALTER TABLE `ReqCert` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReqCert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReqDoc`
--

DROP TABLE IF EXISTS `ReqDoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReqDoc` (
  `RefForn` int(11) NOT NULL,
  `IdDoc` int(11) NOT NULL,
  PRIMARY KEY (`RefForn`,`IdDoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReqDoc`
--

LOCK TABLES `ReqDoc` WRITE;
/*!40000 ALTER TABLE `ReqDoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReqDoc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-14 14:59:11
