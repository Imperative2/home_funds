-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 06 Sie 2020, 15:07
-- Wersja serwera: 10.4.13-MariaDB
-- Wersja PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `home_funds`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `household`
--

CREATE TABLE `household` (
  `household_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `image` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `household`
--

INSERT INTO `household` (`household_id`, `owner_id`, `name`, `description`, `image`) VALUES
(1, 1, 'Kuropatwia', 'Kuropatwia squad', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `household_product`
--

CREATE TABLE `household_product` (
  `product_id` int(11) NOT NULL,
  `household_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `household_product`
--

INSERT INTO `household_product` (`product_id`, `household_id`, `name`) VALUES
(1, 1, 'Mleko'),
(2, 1, 'Woda');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `household_users`
--

CREATE TABLE `household_users` (
  `id` int(11) NOT NULL,
  `household_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `household_users`
--

INSERT INTO `household_users` (`id`, `household_id`, `user_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `household_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` text COLLATE utf8mb4_polish_ci NOT NULL,
  `short_description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `long_description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `date` date NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `news_type`
--

CREATE TABLE `news_type` (
  `type_id` int(11) NOT NULL,
  `value` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `news_type`
--

INSERT INTO `news_type` (`type_id`, `value`) VALUES
(1, 'warning'),
(2, 'error'),
(3, 'information'),
(4, 'success');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL,
  `surname` text COLLATE utf8mb4_polish_ci NOT NULL,
  `nickname` text COLLATE utf8mb4_polish_ci NOT NULL,
  `email` text COLLATE utf8mb4_polish_ci NOT NULL,
  `password` text COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL DEFAULT '',
  `color` text COLLATE utf8mb4_polish_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`user_id`, `name`, `surname`, `nickname`, `email`, `password`, `description`, `color`, `avatar`) VALUES
(1, 'Karol', 'Maśluch', 'Imperative2', 'imperative@imperative.com', '1234', '', '#666666', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_household_products`
--

CREATE TABLE `user_household_products` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL,
  `image` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `user_household_products`
--

INSERT INTO `user_household_products` (`id`, `product_id`, `user_id`, `date`, `description`, `image`) VALUES
(1, 1, 1, '0000-00-00', 'onun', '');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`household_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indeksy dla tabeli `household_product`
--
ALTER TABLE `household_product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `household_id` (`household_id`);

--
-- Indeksy dla tabeli `household_users`
--
ALTER TABLE `household_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `household_id` (`household_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `household_id` (`household_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indeksy dla tabeli `news_type`
--
ALTER TABLE `news_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_household_products`
--
ALTER TABLE `user_household_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `household`
--
ALTER TABLE `household`
  MODIFY `household_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `household_product`
--
ALTER TABLE `household_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `household_users`
--
ALTER TABLE `household_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `news_type`
--
ALTER TABLE `news_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `user_household_products`
--
ALTER TABLE `user_household_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `household`
--
ALTER TABLE `household`
  ADD CONSTRAINT `household_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`);

--
-- Ograniczenia dla tabeli `household_product`
--
ALTER TABLE `household_product`
  ADD CONSTRAINT `household_product_ibfk_1` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Ograniczenia dla tabeli `household_users`
--
ALTER TABLE `household_users`
  ADD CONSTRAINT `household_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `household_users_ibfk_2` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Ograniczenia dla tabeli `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `news_type` (`type_id`),
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `news_ibfk_3` FOREIGN KEY (`household_id`) REFERENCES `household` (`household_id`);

--
-- Ograniczenia dla tabeli `user_household_products`
--
ALTER TABLE `user_household_products`
  ADD CONSTRAINT `user_household_products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_household_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `household_product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
