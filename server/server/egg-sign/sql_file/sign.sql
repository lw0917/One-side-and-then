-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-03-20 15:32:37
-- 服务器版本： 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sign`
--

-- --------------------------------------------------------

--
-- 表的结构 `form_id`
--

CREATE TABLE `form_id` (
  `id` int(11) NOT NULL,
  `openid` varchar(32) NOT NULL,
  `form_id` varchar(32) NOT NULL,
  `status` int(11) DEFAULT '-1' COMMENT '-1表示未使用，0表示已使用',
  `create_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sign`
--

CREATE TABLE `sign` (
  `id` int(11) NOT NULL,
  `openid` varchar(32) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `status` int(11) DEFAULT '-1' COMMENT '-1未开始，0已打卡，1已放弃',
  `remind` int(11) NOT NULL DEFAULT '-1' COMMENT '-1表示未提醒，0表示已提醒',
  `description` varchar(255) NOT NULL,
  `create_time` varchar(32) NOT NULL,
  `start_time` varchar(32) NOT NULL,
  `sign_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sign`
--

INSERT INTO `sign` (`id`, `openid`, `phone`, `company`, `address`, `latitude`, `longitude`, `status`, `remind`, `description`, `create_time`, `start_time`, `sign_time`) VALUES
(1, 'oUy9p5PTxwYaLmwBn41pn0HzNM1U', '', '北京八维研修集团', '北京市海淀区软件园南路57号', 12.33, 13.33, 0, -1, '', '1552979972299', '122321', ''),
(2, 'oUy9p5PTxwYaLmwBn41pn0HzNM1U', '', '北京八维研修集团', '北京市海淀区软件园南路57号', 12.33, 13.33, -1, -1, '', '1553089185886', '122321', ''),
(3, '', '', '北京八维研修集团', '北京市海淀区软件园南路57号', 12.33, 13.33, -1, -1, '', '1553089272968', '122321', ''),
(4, '', '', '北京八维研修集团', '北京市海淀区软件园南路57号', 12.33, 13.33, -1, -1, '', '1553090463538', '122321', '');

-- --------------------------------------------------------

--
-- 表的结构 `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_in` int(11) NOT NULL,
  `create_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `token`
--

INSERT INTO `token` (`id`, `token`, `expires_in`, `create_time`) VALUES
(1, '19_k9hG-fyDxYzno6gY0Ck7PGSZfwjMAgVWWXjxHqN6inCN6LQcNfIELvnmub44YrHqbmWsqUSr0utL2pjJL1zdB4FLcyoZrQJBx7tO36u6DtacB4wLjO-NFwC8slxHR_5A0T0Nwg-QaJUmfXfeZZZhAJAVVV', 7200, '2147483647'),
(2, '19_7Lk6KmgC3huQnCbNRdNrbO5Mjp6CuDN2pIBRAU1l--ujJmnKFwjplnv7tvdBjLSvp7eDQVm97XqKezZT6hTb-xptMQCr5CZt2ynPzqEIRaJXSXoDGAXNH9jWo59Omo2Tv4ZvmX4Ur9oFGfALUYKhACAJNZ', 7200, '2147483647'),
(3, '19_5bhf68OCBT_K20XdRdNrbO5Mjp6CuDN2pIBRAU1l--ujJmnKFwjplnv7tvfnTws40bgGP-w6CHezqwZ7_Mn7RJLng_5G4YEuyz0JQkLpemwN3hz_8-5vCEK0-rYDsHpDvtW1XWJCJ_XIuds3VZMhACADHU', 7200, '2147483647'),
(4, '19_uzlEh7ao1fhJFeg-vgfAEjtE0cMWoqEF9b6x9gZNO4TxjUovFIqZLe5dnfBSUYjueHD2H8B_stbRuZ2zzugcUBM-l_ITbkn7lbGh1PwINeyOifWIB2MJwYZ6u19391da-VzQVSiMmtMys94qHMAeAHAUZN', 7200, '2147483647'),
(5, '19_d97WhPQuKZUKSFzEvgfAEjtE0cMWoqEF9b6x9gZNO4TxjUovFIqZLe5dnfB_UrSZrKbUqbFlHDTw5UsvEjjX1Wn2_Xzj5ttrSr5DiwPLEBuojFrmmCL8IyL2CnOJMh2Qo3fZqiCqsAIdRSEzYXVeAHAHGE', 7196, '2147483647'),
(6, '19_3l-2DTimfVYEviTCGBpis-ll9A96QCttRr-uu8s78jqfL6UVm7VBJ2_g9pJ4ievY7_y54128-M1SdS7UhLwB21UOKstlf0ZiCF6biR_tOVxOMq55eGAZd2I2AhClbojB7pR5AagIg7wkBHciUELaAJALVC', 7200, '1552918427151');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `openid` varchar(32) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `session_key` varchar(64) NOT NULL,
  `create_time` varchar(32) NOT NULL,
  `update_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `openid`, `phone`, `nickname`, `session_key`, `create_time`, `update_time`) VALUES
(1, 'oUy9p5PTxwYaLmwBn41pn0HzNM1U', '', '', 'f/RkFMlqefrhEnU3GjZrRg==', '2147483647', '1553070370295'),
(2, 'oUy9p5HiY1kAzuKu6AttTz7JRfZM', '', '', 'gK0Nxc0/IiYJsDZvClDgdg==', '1552986251129', '1553054966163'),
(3, 'oUy9p5J8Ts0wTtBJKR-bvUKsC3YY', '', '', 'NaVx2zfhVTuFtyNtXc7n3A==', '1552993011037', '1553066587699'),
(4, 'oUy9p5DSmbJHMIhpdF7GtHAUNOEo', '', '', 'TLnJ699KcVGthSJ68qHxsg==', '1553052449054', '1553066594431'),
(5, 'oUy9p5JUhL9k19X3ANCvblFqxaCU', '', '', '5fdEtG79ARG0+Xu3gm++TQ==', '1553052608645', '1553054324833'),
(6, 'oUy9p5GWiiFs5vQ8odWC_YsoRUvU', '', '', 'Gn4jw2FK5wq/o1kCdWQBIA==', '1553053641662', '1553066572806'),
(7, 'oUy9p5D15nNRcSIzQaBz_cGqZ8Bs', '', '', '/a5pkLcfSf6iWRpy9zM94Q==', '1553053795342', '1553066555647'),
(8, 'oUy9p5EcrQcRSmxfHCotPCnoDXc4', '', '', '7T61R81oFXESdV5Au23HQQ==', '1553053805192', '1553066542915'),
(9, 'oUy9p5PnfANx6nY6tJplTjd7oWTw', '', '', 'mXakbHQzzQDQV+OWBnBCFg==', '1553053815717', '1553055200624'),
(10, 'oUy9p5Mp6c7aWypM9_fXbK8UE2lQ', '', '', 'B4Unxf99DLPgENdt900YmQ==', '1553053838544', '1553077849778'),
(11, 'oUy9p5EGt82BxoNEL0Hh-P1BNVyE', '', '', 'X7KaVC2LLP+TbB/fo6p+Jg==', '1553053991896', '1553053991896'),
(12, 'oUy9p5LjG0deagHwVobGnufwCe-4', '', '', 'dBHm6TInwhLXy4KfDT1lTg==', '1553054123626', '1553054589365'),
(13, 'oUy9p5D8w6aabZRKlzJKtR08qb1U', '', '', 'INYSc3aVuzItGcbeMfpApQ==', '1553054488657', '1553054550484'),
(14, 'oUy9p5LeaeQBx7AmUtxCLlDUB2-s', '', '', 'tOCpV7q2HTHUbF+NMHI+AA==', '1553054767146', '1553055293263'),
(15, 'oUy9p5EFq3nxyZRiAdei9GuyCjKQ', '', '', 'kK/g001WKT+peFoGIHW/QA==', '1553066572614', '1553066572614');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_id`
--
ALTER TABLE `form_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sign`
--
ALTER TABLE `sign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `form_id`
--
ALTER TABLE `form_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sign`
--
ALTER TABLE `sign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
