-- this content is a database dump taken after the initial setup of the nginx proxy manager service
-- this allows us to bootstrap the service with a known admin account and any initial configuration
-- future migrations should be added in a similar fashion 
--      this is a bit of a hack but most future content is filebased, not db based.
--      eg. adding user accounts is a database level change, so will require a new migration

-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB-1:10.5.8+maria~focal

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
-- Current Database: `NginxProxyManager`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `NginxProxyManager` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `NginxProxyManager`;

--
-- Table structure for table `access_list`
--

DROP TABLE IF EXISTS `access_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `satisfy_any` int(11) NOT NULL DEFAULT 0,
  `pass_auth` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_list`
--

LOCK TABLES `access_list` WRITE;
/*!40000 ALTER TABLE `access_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `access_list_auth`
--

DROP TABLE IF EXISTS `access_list_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_list_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `access_list_id` int(10) unsigned NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_list_auth`
--

LOCK TABLES `access_list_auth` WRITE;
/*!40000 ALTER TABLE `access_list_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_list_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `access_list_client`
--

DROP TABLE IF EXISTS `access_list_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_list_client` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `access_list_id` int(10) unsigned NOT NULL,
  `address` varchar(255) NOT NULL,
  `directive` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_list_client`
--

LOCK TABLES `access_list_client` WRITE;
/*!40000 ALTER TABLE `access_list_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_list_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `object_type` varchar(255) NOT NULL DEFAULT '',
  `object_id` int(10) unsigned NOT NULL DEFAULT 0,
  `action` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'2023-03-21 11:37:24','2023-03-21 11:37:24',1,'user',1,'updated','{\"name\":\"SmsAdministrator\",\"nickname\":\"SmsAdmin\",\"email\":\"studio-management-system-admin@notreal.dev\",\"roles\":[\"admin\"],\"is_disabled\":0,\"id\":1,\"avatar\":\"//www.gravatar.com/avatar/50f6e4ee5dfe8e94490a842bdd1a804e?default=mm\"}'),(2,'2023-03-21 11:37:32','2023-03-21 11:37:32',1,'user',1,'updated','{\"name\":\"SmsAdministrator\",\"password_changed\":true,\"auth_type\":\"password\"}'),(3,'2023-03-21 11:38:39','2023-03-21 11:38:39',1,'proxy-host',1,'created','{\"domain_names\":[\"localhost\"],\"forward_scheme\":\"http\",\"forward_host\":\"frontend\",\"forward_port\":3000,\"block_exploits\":true,\"allow_websocket_upgrade\":true,\"access_list_id\":0,\"certificate_id\":0,\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false},\"advanced_config\":\"\",\"locations\":[],\"caching_enabled\":false,\"http2_support\":false,\"hsts_enabled\":false,\"hsts_subdomains\":false,\"ssl_forced\":false,\"owner_user_id\":1}'),(4,'2023-03-21 11:46:33','2023-03-21 11:46:33',1,'proxy-host',1,'updated','{\"id\":1,\"created_on\":\"2023-03-21T11:38:39.000Z\",\"modified_on\":\"2023-03-21T11:38:39.000Z\",\"owner_user_id\":1,\"domain_names\":[\"localhost\"],\"forward_host\":\"frontend\",\"forward_port\":3000,\"access_list_id\":0,\"certificate_id\":0,\"ssl_forced\":false,\"caching_enabled\":false,\"block_exploits\":true,\"advanced_config\":\"server {\\r\\n        listen 80;\\r\\n        server_name  localhost;\\r\\n        root /usr/share/nginx;\\r\\n        index index.html;\\r\\n}\",\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false},\"allow_websocket_upgrade\":true,\"http2_support\":false,\"forward_scheme\":\"http\",\"enabled\":1,\"locations\":[],\"hsts_enabled\":false,\"hsts_subdomains\":false}'),(5,'2023-03-21 11:47:50','2023-03-21 11:47:50',1,'proxy-host',1,'updated','{\"id\":1,\"created_on\":\"2023-03-21T11:38:39.000Z\",\"modified_on\":\"2023-03-21T11:46:33.000Z\",\"owner_user_id\":1,\"domain_names\":[\"localhost\"],\"forward_host\":\"frontend\",\"forward_port\":3000,\"access_list_id\":0,\"certificate_id\":0,\"ssl_forced\":false,\"caching_enabled\":false,\"block_exploits\":true,\"advanced_config\":\"location /{\\r\\n        root /usr/share/nginx;\\r\\n        index index.html;\\r\\n}\",\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false},\"allow_websocket_upgrade\":true,\"http2_support\":false,\"forward_scheme\":\"http\",\"enabled\":1,\"locations\":[],\"hsts_enabled\":false,\"hsts_subdomains\":false}'),(6,'2023-03-21 11:55:21','2023-03-21 11:55:21',1,'proxy-host',1,'updated','{\"id\":1,\"created_on\":\"2023-03-21T11:38:39.000Z\",\"modified_on\":\"2023-03-21T11:47:50.000Z\",\"owner_user_id\":1,\"domain_names\":[\"localhost\"],\"forward_host\":\"frontend\",\"forward_port\":3000,\"access_list_id\":0,\"certificate_id\":0,\"ssl_forced\":false,\"caching_enabled\":false,\"block_exploits\":true,\"advanced_config\":\"\",\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false},\"allow_websocket_upgrade\":true,\"http2_support\":false,\"forward_scheme\":\"http\",\"enabled\":1,\"locations\":[],\"hsts_enabled\":false,\"hsts_subdomains\":false}'),(7,'2023-03-21 12:01:15','2023-03-21 12:01:15',1,'proxy-host',1,'disabled','{\"id\":1,\"created_on\":\"2023-03-21T11:38:39.000Z\",\"modified_on\":\"2023-03-21T11:55:21.000Z\",\"owner_user_id\":1,\"domain_names\":[\"localhost\"],\"forward_host\":\"frontend\",\"forward_port\":3000,\"access_list_id\":0,\"certificate_id\":0,\"ssl_forced\":0,\"caching_enabled\":0,\"block_exploits\":1,\"advanced_config\":\"\",\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false,\"nginx_online\":true,\"nginx_err\":null},\"allow_websocket_upgrade\":1,\"http2_support\":0,\"forward_scheme\":\"http\",\"enabled\":0,\"locations\":[],\"hsts_enabled\":0,\"hsts_subdomains\":0}'),(8,'2023-03-21 12:12:53','2023-03-21 12:12:53',1,'proxy-host',1,'deleted','{\"id\":1,\"created_on\":\"2023-03-21T11:38:39.000Z\",\"modified_on\":\"2023-03-21T12:01:15.000Z\",\"owner_user_id\":1,\"domain_names\":[\"localhost\"],\"forward_host\":\"frontend\",\"forward_port\":3000,\"access_list_id\":0,\"certificate_id\":0,\"ssl_forced\":0,\"caching_enabled\":0,\"block_exploits\":1,\"advanced_config\":\"\",\"meta\":{\"letsencrypt_agree\":false,\"dns_challenge\":false,\"nginx_online\":true,\"nginx_err\":null},\"allow_websocket_upgrade\":1,\"http2_support\":0,\"forward_scheme\":\"http\",\"enabled\":0,\"locations\":[],\"hsts_enabled\":0,\"hsts_subdomains\":0}');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `type` varchar(30) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'2023-03-21 11:36:00','2023-03-21 11:37:32',1,'password','$2b$13$hiSBn29ihj40xOEhJrEVVeeuMtX1lZ7ww7A.GwRjTPCMnoqX9Fe06','{}',0);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `provider` varchar(255) NOT NULL,
  `nice_name` varchar(255) NOT NULL DEFAULT '',
  `domain_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`domain_names`)),
  `expires_on` datetime NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dead_host`
--

DROP TABLE IF EXISTS `dead_host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dead_host` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `domain_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`domain_names`)),
  `certificate_id` int(10) unsigned NOT NULL DEFAULT 0,
  `ssl_forced` int(10) unsigned NOT NULL DEFAULT 0,
  `advanced_config` text NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `http2_support` int(10) unsigned NOT NULL DEFAULT 0,
  `enabled` int(10) unsigned NOT NULL DEFAULT 1,
  `hsts_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `hsts_subdomains` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dead_host`
--

LOCK TABLES `dead_host` WRITE;
/*!40000 ALTER TABLE `dead_host` DISABLE KEYS */;
/*!40000 ALTER TABLE `dead_host` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'20180618015850_initial.js',1,'2023-03-21 11:35:58'),(2,'20180929054513_websockets.js',1,'2023-03-21 11:35:58'),(3,'20181019052346_forward_host.js',1,'2023-03-21 11:35:58'),(4,'20181113041458_http2_support.js',1,'2023-03-21 11:35:58'),(5,'20181213013211_forward_scheme.js',1,'2023-03-21 11:35:58'),(6,'20190104035154_disabled.js',1,'2023-03-21 11:35:58'),(7,'20190215115310_customlocations.js',1,'2023-03-21 11:35:58'),(8,'20190218060101_hsts.js',1,'2023-03-21 11:35:58'),(9,'20190227065017_settings.js',1,'2023-03-21 11:35:58'),(10,'20200410143839_access_list_client.js',1,'2023-03-21 11:35:58'),(11,'20200410143840_access_list_client_fix.js',1,'2023-03-21 11:35:58'),(12,'20201014143841_pass_auth.js',1,'2023-03-21 11:35:58'),(13,'20210210154702_redirection_scheme.js',1,'2023-03-21 11:35:58'),(14,'20210210154703_redirection_status_code.js',1,'2023-03-21 11:35:58'),(15,'20210423103500_stream_domain.js',1,'2023-03-21 11:35:58'),(16,'20211108145214_regenerate_default_host.js',1,'2023-03-21 11:35:58');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations_lock`
--

DROP TABLE IF EXISTS `migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations_lock`
--

LOCK TABLES `migrations_lock` WRITE;
/*!40000 ALTER TABLE `migrations_lock` DISABLE KEYS */;
INSERT INTO `migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proxy_host`
--

DROP TABLE IF EXISTS `proxy_host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proxy_host` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `domain_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`domain_names`)),
  `forward_host` varchar(255) NOT NULL,
  `forward_port` int(10) unsigned NOT NULL,
  `access_list_id` int(10) unsigned NOT NULL DEFAULT 0,
  `certificate_id` int(10) unsigned NOT NULL DEFAULT 0,
  `ssl_forced` int(10) unsigned NOT NULL DEFAULT 0,
  `caching_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `block_exploits` int(10) unsigned NOT NULL DEFAULT 0,
  `advanced_config` text NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `allow_websocket_upgrade` int(10) unsigned NOT NULL DEFAULT 0,
  `http2_support` int(10) unsigned NOT NULL DEFAULT 0,
  `forward_scheme` varchar(255) NOT NULL DEFAULT 'http',
  `enabled` int(10) unsigned NOT NULL DEFAULT 1,
  `locations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`locations`)),
  `hsts_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `hsts_subdomains` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proxy_host`
--

LOCK TABLES `proxy_host` WRITE;
/*!40000 ALTER TABLE `proxy_host` DISABLE KEYS */;
INSERT INTO `proxy_host` VALUES (1,'2023-03-21 11:38:39','2023-03-21 12:12:53',1,1,'[\"localhost\"]','frontend',3000,0,0,0,0,1,'','{\"letsencrypt_agree\":false,\"dns_challenge\":false,\"nginx_online\":true,\"nginx_err\":null}',1,0,'http',0,'[]',0,0);
/*!40000 ALTER TABLE `proxy_host` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redirection_host`
--

DROP TABLE IF EXISTS `redirection_host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redirection_host` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `domain_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`domain_names`)),
  `forward_domain_name` varchar(255) NOT NULL,
  `preserve_path` int(10) unsigned NOT NULL DEFAULT 0,
  `certificate_id` int(10) unsigned NOT NULL DEFAULT 0,
  `ssl_forced` int(10) unsigned NOT NULL DEFAULT 0,
  `block_exploits` int(10) unsigned NOT NULL DEFAULT 0,
  `advanced_config` text NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `http2_support` int(10) unsigned NOT NULL DEFAULT 0,
  `enabled` int(10) unsigned NOT NULL DEFAULT 1,
  `hsts_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `hsts_subdomains` int(10) unsigned NOT NULL DEFAULT 0,
  `forward_scheme` varchar(255) NOT NULL DEFAULT '$scheme',
  `forward_http_code` int(10) unsigned NOT NULL DEFAULT 302,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redirection_host`
--

LOCK TABLES `redirection_host` WRITE;
/*!40000 ALTER TABLE `redirection_host` DISABLE KEYS */;
/*!40000 ALTER TABLE `redirection_host` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES ('default-site','Default Site','What to show when Nginx is hit with an unknown Host','congratulations','{\"redirect\":\"\",\"html\":\"\"}');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stream`
--

DROP TABLE IF EXISTS `stream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stream` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `incoming_port` int(10) unsigned NOT NULL,
  `forwarding_host` varchar(255) NOT NULL,
  `forwarding_port` int(10) unsigned NOT NULL,
  `tcp_forwarding` int(10) unsigned NOT NULL DEFAULT 0,
  `udp_forwarding` int(10) unsigned NOT NULL DEFAULT 0,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `enabled` int(10) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stream`
--

LOCK TABLES `stream` WRITE;
/*!40000 ALTER TABLE `stream` DISABLE KEYS */;
/*!40000 ALTER TABLE `stream` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `is_disabled` int(10) unsigned NOT NULL DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-03-21 11:36:00','2023-03-21 11:37:24',0,0,'studio-management-system-admin@notreal.dev','SmsAdministrator','SmsAdmin','//www.gravatar.com/avatar/50f6e4ee5dfe8e94490a842bdd1a804e?default=mm','[\"admin\"]');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `visibility` varchar(255) NOT NULL,
  `proxy_hosts` varchar(255) NOT NULL,
  `redirection_hosts` varchar(255) NOT NULL,
  `dead_hosts` varchar(255) NOT NULL,
  `streams` varchar(255) NOT NULL,
  `access_lists` varchar(255) NOT NULL,
  `certificates` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_permission_user_id_unique` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
INSERT INTO `user_permission` VALUES (1,'2023-03-21 11:36:00','2023-03-21 11:36:00',1,'all','manage','manage','manage','manage','manage','manage');
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2023-03-21 12:38:25
