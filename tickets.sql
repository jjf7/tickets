-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-07-2020 a las 01:26:09
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tickets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `ticket_pedido` text NOT NULL,
  `realizado` enum('no','si') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`id`, `id_user`, `ticket_pedido`, `realizado`) VALUES
(4, 6, 'TEST', 'no'),
(11, 8, 'Validar React JS', 'no'),
(17, 2, 'Crear  una tienda virtual', 'si'),
(15, 2, 'Programar ....', 'si'),
(16, 8, 'Hacer la comida para la cena', 'no'),
(19, 2, 'Jugar play', 'no'),
(20, 2, 'Programar', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipouser` int(11) NOT NULL,
  `nombre` varchar(220) NOT NULL,
  `mail` varchar(120) NOT NULL,
  `pass` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_tipouser`, `nombre`, `mail`, `pass`) VALUES
(2, 2, 'Jose Fuentes', '7jfuentes@gmail.com', '$2b$10$y.kKnWujgwSU4mDyEvlAyOYlLsaa9LVkAqEkzduV5bDaG0U0vInwe'),
(5, 1, 'Jose Fuentes', 'jfsistemas.contacto@gmail.com', '$2b$10$hfOTevGpbBuJxWp2kbAdz.pt9Ox8PtgUSNoC6HLhnTBQ5d/nJ9Pgy'),
(7, 1, 'Gloria', 'w@w.com', '$2b$10$0bYSGHFJWC6opuTBuCw8ruL2SfLclIymLcjo4ZC8QlNVyHO.ma9Vq'),
(8, 2, 'Petra', 'empleado@empleado.com', '$2b$10$heQcxsROI0SFme7Yh0Rm6uj7YIOf6Oe7h1dkFijEA0JeIXOPX1qxu');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
