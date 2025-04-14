-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 14. 09:36
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szallas`
--
CREATE DATABASE IF NOT EXISTS `szallas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `szallas`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `felhasználó_id` int(11) NOT NULL,
  `név` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszó_hash` varchar(255) NOT NULL,
  `telefonszám` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglalás`
--

CREATE TABLE `foglalás` (
  `foglalás_id` int(11) NOT NULL,
  `felhasználó_id` int(11) DEFAULT NULL,
  `szállás_id` int(11) DEFAULT NULL,
  `érkezés_dátuma` date DEFAULT NULL,
  `távozás_dátuma` date DEFAULT NULL,
  `foglalás_dátuma` timestamp NOT NULL DEFAULT current_timestamp(),
  `státusz` enum('függőben','elfogadva','elutasítva') DEFAULT 'függőben'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szállás`
--

CREATE TABLE `szállás` (
  `szállás_id` int(11) NOT NULL,
  `név` varchar(100) NOT NULL,
  `cím` varchar(255) NOT NULL,
  `város` varchar(100) DEFAULT NULL,
  `ország` varchar(100) DEFAULT NULL,
  `leírás` text DEFAULT NULL,
  `ár_éjszakánként` decimal(10,2) NOT NULL,
  `max_fő` int(11) DEFAULT NULL,
  `tulajdonos_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vélemény`
--

CREATE TABLE `vélemény` (
  `vélemény_id` int(11) NOT NULL,
  `felhasználó_id` int(11) DEFAULT NULL,
  `szállás_id` int(11) DEFAULT NULL,
  `értékelés` int(11) DEFAULT NULL CHECK (`értékelés` between 1 and 5),
  `szöveg` text DEFAULT NULL,
  `dátum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD PRIMARY KEY (`felhasználó_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `foglalás`
--
ALTER TABLE `foglalás`
  ADD PRIMARY KEY (`foglalás_id`),
  ADD KEY `felhasználó_id` (`felhasználó_id`),
  ADD KEY `szállás_id` (`szállás_id`);

--
-- A tábla indexei `szállás`
--
ALTER TABLE `szállás`
  ADD PRIMARY KEY (`szállás_id`),
  ADD KEY `tulajdonos_id` (`tulajdonos_id`);

--
-- A tábla indexei `vélemény`
--
ALTER TABLE `vélemény`
  ADD PRIMARY KEY (`vélemény_id`),
  ADD KEY `felhasználó_id` (`felhasználó_id`),
  ADD KEY `szállás_id` (`szállás_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  MODIFY `felhasználó_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `foglalás`
--
ALTER TABLE `foglalás`
  MODIFY `foglalás_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szállás`
--
ALTER TABLE `szállás`
  MODIFY `szállás_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `vélemény`
--
ALTER TABLE `vélemény`
  MODIFY `vélemény_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `foglalás`
--
ALTER TABLE `foglalás`
  ADD CONSTRAINT `foglalás_ibfk_1` FOREIGN KEY (`felhasználó_id`) REFERENCES `felhasználó` (`felhasználó_id`),
  ADD CONSTRAINT `foglalás_ibfk_2` FOREIGN KEY (`szállás_id`) REFERENCES `szállás` (`szállás_id`);

--
-- Megkötések a táblához `szállás`
--
ALTER TABLE `szállás`
  ADD CONSTRAINT `szállás_ibfk_1` FOREIGN KEY (`tulajdonos_id`) REFERENCES `felhasználó` (`felhasználó_id`);

--
-- Megkötések a táblához `vélemény`
--
ALTER TABLE `vélemény`
  ADD CONSTRAINT `vélemény_ibfk_1` FOREIGN KEY (`felhasználó_id`) REFERENCES `felhasználó` (`felhasználó_id`),
  ADD CONSTRAINT `vélemény_ibfk_2` FOREIGN KEY (`szállás_id`) REFERENCES `szállás` (`szállás_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
