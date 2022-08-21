-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2021 at 06:15 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkkbn`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota_kk_periode_sensus`
--

CREATE TABLE `anggota_kk_periode_sensus` (
  `KK_id` int(11) NOT NULL,
  `anggota_kk_id` bigint(20) NOT NULL,
  `periode_sensus` int(11) NOT NULL,
  `NIK` int(11) NOT NULL,
  `jenis_kelamin` int(11) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `agama` int(11) NOT NULL,
  `pendidikan` int(11) NOT NULL,
  `jenis_pekerjaan` int(11) NOT NULL,
  `status_nikah` int(11) NOT NULL,
  `tanggal_pernikahan` date NOT NULL,
  `status_dalam_keluarga` int(11) NOT NULL,
  `kewarganegaraan` int(11) NOT NULL,
  `no_paspor` varchar(25) NOT NULL,
  `no_katas` varchar(25) NOT NULL,
  `nama_ayah` varchar(50) NOT NULL,
  `nama_ibu` varchar(50) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `create_by` varchar(50) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anggota_kk_periode_sensus`
--

INSERT INTO `anggota_kk_periode_sensus` (`KK_id`, `anggota_kk_id`, `periode_sensus`, `NIK`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `agama`, `pendidikan`, `jenis_pekerjaan`, `status_nikah`, `tanggal_pernikahan`, `status_dalam_keluarga`, `kewarganegaraan`, `no_paspor`, `no_katas`, `nama_ayah`, `nama_ibu`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
(1, 1, 2021, 32121, 0, 'Jakarta', '2003-02-12', 0, 2, 2, 0, '0007-01-01', 2, 1, '32323', '213331', 'AW', 'WEwe', '2021-09-22 07:41:43', 'Nizar', '2021-09-22 07:41:43', 'Nizar');

-- --------------------------------------------------------

--
-- Table structure for table `data_kb`
--

CREATE TABLE `data_kb` (
  `KK_id` int(11) NOT NULL,
  `data_kb` int(11) NOT NULL,
  `NIK` int(11) NOT NULL,
  `alat_kontrasepsi` int(11) NOT NULL,
  `tahun_pemakaian` int(11) NOT NULL,
  `alasan` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kabupaten`
--

CREATE TABLE `kabupaten` (
  `id_kabupaten` int(11) NOT NULL,
  `nama_kabupaten` varchar(50) NOT NULL,
  `KodeDepdagri` char(2) DEFAULT NULL,
  `id_provinsi` int(11) NOT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `OriginalID` int(11) DEFAULT NULL,
  `OriginalNama` varchar(50) DEFAULT NULL,
  `OriginalKode` char(2) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `id_kabupaten_old` int(11) DEFAULT NULL,
  `nama_kabupaten_old` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kabupaten`
--

INSERT INTO `kabupaten` (`id_kabupaten`, `nama_kabupaten`, `KodeDepdagri`, `id_provinsi`, `IsActive`, `OriginalID`, `OriginalNama`, `OriginalKode`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `id_kabupaten_old`, `nama_kabupaten_old`) VALUES
(5, 'Jakarta Utara', '12', 146, 1, NULL, NULL, NULL, '2021-08-04 16:24:06', NULL, '2021-08-04 16:24:06', NULL, NULL, NULL),
(9, 'Jakarta Selatan', '23', 146, 1, NULL, NULL, NULL, '2021-08-05 09:54:20', NULL, '2021-08-05 09:54:20', NULL, NULL, NULL),
(10, 'Jakarta Timur', '43', 146, 1, NULL, NULL, NULL, '2021-08-06 07:04:59', NULL, '2021-08-06 07:04:59', NULL, NULL, NULL),
(11, 'Bandung', '32', 147, 1, NULL, NULL, NULL, '2021-08-10 09:35:48', NULL, '2021-08-10 09:35:48', 'Nizar', NULL, NULL),
(12, 'Tanggerang', '23', 148, 1, NULL, NULL, NULL, '2021-08-16 07:05:01', 'Nizar', '2021-08-16 07:05:01', 'Nizar', NULL, NULL),
(13, 'Bekasi', '23', 147, 1, NULL, NULL, NULL, '2021-09-21 13:36:39', 'Nizar', '2021-09-21 13:36:39', 'Nizar', NULL, NULL),
(14, 'Palembang', '12', 150, 1, NULL, NULL, NULL, '2021-09-22 03:12:39', 'Nizar', '2021-09-22 03:12:39', 'Nizar', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kecamatan`
--

CREATE TABLE `kecamatan` (
  `id_kecamatan` int(11) NOT NULL,
  `nama_kecamatan` varchar(50) NOT NULL,
  `KodeDepdagri` char(2) DEFAULT NULL,
  `id_kabupaten` int(11) NOT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `OriginalID` int(11) DEFAULT NULL,
  `OriginalNama` varchar(50) DEFAULT NULL,
  `OriginalKode` char(2) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `id_kecamatan_old` int(11) DEFAULT NULL,
  `nama_kecamatan_old` varchar(50) DEFAULT NULL,
  `kode_depdagri_old` char(2) DEFAULT NULL,
  `flag_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kecamatan`
--

INSERT INTO `kecamatan` (`id_kecamatan`, `nama_kecamatan`, `KodeDepdagri`, `id_kabupaten`, `IsActive`, `OriginalID`, `OriginalNama`, `OriginalKode`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `id_kecamatan_old`, `nama_kecamatan_old`, `kode_depdagri_old`, `flag_status`) VALUES
(6, 'Cilincing', '32', 5, 0, NULL, NULL, NULL, '2021-08-04 16:26:08', NULL, '2021-08-04 16:26:08', NULL, NULL, NULL, NULL, NULL),
(7, 'Koja', '32', 5, 1, NULL, NULL, NULL, '2021-08-05 05:53:05', NULL, '2021-08-05 05:53:05', NULL, NULL, NULL, NULL, NULL),
(9, 'Mampang', '43', 9, 1, NULL, NULL, NULL, '2021-08-05 09:57:17', NULL, '2021-08-05 09:57:17', NULL, NULL, NULL, NULL, NULL),
(10, 'Jati', '33', 10, 1, NULL, NULL, NULL, '2021-08-06 12:01:03', NULL, '2021-08-06 12:01:03', NULL, NULL, NULL, NULL, NULL),
(11, 'Gadog', '23', 11, 1, NULL, NULL, NULL, '2021-08-11 08:18:50', NULL, '2021-08-11 08:18:50', NULL, NULL, NULL, NULL, NULL),
(12, 'Lembang', '21', 11, 1, NULL, NULL, NULL, '2021-08-11 08:20:04', NULL, '2021-08-11 08:20:04', NULL, NULL, NULL, NULL, NULL),
(13, 'Karang Tengah', '21', 12, 1, NULL, NULL, NULL, '2021-08-16 07:08:47', NULL, '2021-08-16 07:08:47', NULL, NULL, NULL, NULL, NULL),
(14, 'Prabumulih', '9', 14, 1, NULL, NULL, NULL, '2021-09-22 03:13:11', 'Nizar', '2021-09-22 03:13:11', 'Nizar', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kelompok_data`
--

CREATE TABLE `kelompok_data` (
  `Id_kelompok_data` int(11) NOT NULL,
  `nama_kelompok_data` varchar(250) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) NOT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelompok_data`
--

INSERT INTO `kelompok_data` (`Id_kelompok_data`, `nama_kelompok_data`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
(1, 'Jenis Kelamin', '2021-08-16 06:03:56', 'Administrator', '2021-08-16 06:03:56', 'Administrator'),
(2, 'Periode Sensus', '2021-08-16 08:15:01', 'Nizar', '2021-08-16 08:15:01', 'Nizar'),
(3, 'Status', '2021-08-16 10:12:17', 'Nizar', '2021-08-16 10:12:17', 'Nizar'),
(4, 'Agama', '2021-08-17 03:54:46', 'Nizar', '2021-08-17 03:54:46', 'Nizar'),
(8, 'Label Setting', '2021-08-28 08:34:24', '', '2021-08-28 08:34:24', ''),
(9, 'Label Email', '2021-08-31 13:33:42', 'Iman', '2021-08-31 13:33:42', 'Iman'),
(10, 'Kewarganegaraan', '2021-09-21 10:18:14', 'Nizar', '2021-09-21 10:18:14', 'Nizar'),
(11, 'Pendidikan', '2021-09-21 10:19:01', 'Nizar', '2021-09-21 10:19:01', 'Nizar'),
(12, 'Status Dalam Keluarga', '2021-09-21 10:26:11', 'Nizar', '2021-09-21 10:26:11', 'Nizar'),
(13, 'Pekerjaan', '2021-09-21 13:16:20', 'Nizar', '2021-09-21 13:16:20', 'Nizar');

-- --------------------------------------------------------

--
-- Table structure for table `kelurahan`
--

CREATE TABLE `kelurahan` (
  `id_kelurahan` int(11) NOT NULL,
  `nama_kelurahan` varchar(50) DEFAULT NULL,
  `KodeDepdagri` char(1) DEFAULT NULL,
  `id_kecamatan` int(11) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `OriginalID` int(11) DEFAULT NULL,
  `OriginalNama` varchar(50) DEFAULT NULL,
  `OriginalKode` char(2) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `id_kelurahan_old` int(11) DEFAULT NULL,
  `nama_kelurahan_old` varchar(50) DEFAULT NULL,
  `kode_depdagri_old` char(2) DEFAULT NULL,
  `flag_status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelurahan`
--

INSERT INTO `kelurahan` (`id_kelurahan`, `nama_kelurahan`, `KodeDepdagri`, `id_kecamatan`, `IsActive`, `OriginalID`, `OriginalNama`, `OriginalKode`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `id_kelurahan_old`, `nama_kelurahan_old`, `kode_depdagri_old`, `flag_status`) VALUES
(31, 'Marunda', '2', 6, 1, NULL, NULL, NULL, '2021-08-04 16:26:27', NULL, '2021-08-04 16:26:27', NULL, NULL, NULL, NULL, NULL),
(32, 'Bangka', '5', 9, 1, NULL, NULL, NULL, '2021-08-05 09:58:08', NULL, '2021-08-05 09:58:08', NULL, NULL, NULL, NULL, NULL),
(33, 'Agung', '3', 12, 1, NULL, NULL, NULL, '2021-08-11 09:55:52', NULL, '2021-08-11 09:55:52', NULL, NULL, NULL, NULL, NULL),
(34, 'Rorotan', '4', 6, 1, NULL, NULL, NULL, '2021-08-12 06:21:00', NULL, '2021-08-12 06:21:00', NULL, NULL, NULL, NULL, NULL),
(35, 'Jati', '1', 9, 1, NULL, NULL, NULL, '2021-08-12 06:22:13', NULL, '2021-08-12 06:22:13', NULL, NULL, NULL, NULL, NULL),
(36, 'Malaka', '6', 6, 1, NULL, NULL, NULL, '2021-08-12 15:33:28', NULL, '2021-08-12 15:33:28', NULL, NULL, NULL, NULL, NULL),
(37, 'Keramat', '5', 10, 1, NULL, NULL, NULL, '2021-08-14 08:19:44', NULL, '2021-08-14 08:19:44', NULL, NULL, NULL, NULL, NULL),
(38, 'Yateng', '9', 13, 1, NULL, NULL, NULL, '2021-08-16 07:09:27', 'Nizar', '2021-08-16 07:09:27', 'Nizar', NULL, NULL, NULL, NULL),
(39, 'Ulur', '9', 11, 1, NULL, NULL, NULL, '2021-09-10 15:00:20', 'Azhar', '2021-09-10 15:00:20', 'Azhar', NULL, NULL, NULL, NULL),
(40, 'Prabumulih Selatan', '7', 14, 1, NULL, NULL, NULL, '2021-09-22 03:13:40', 'Nizar', '2021-09-22 03:13:40', 'Nizar', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinsi`
--

CREATE TABLE `provinsi` (
  `id_provinsi` int(11) NOT NULL,
  `nama_provinsi` varchar(50) NOT NULL,
  `KodeDepdagri` varchar(2) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `RegionalID` int(11) DEFAULT NULL,
  `OriginalID` int(11) DEFAULT NULL,
  `OriginalNama` varchar(50) DEFAULT NULL,
  `OriginalKode` varchar(2) DEFAULT NULL,
  `Created` timestamp NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `id_provinsi_old` int(11) DEFAULT NULL,
  `nama_provinsi_old` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provinsi`
--

INSERT INTO `provinsi` (`id_provinsi`, `nama_provinsi`, `KodeDepdagri`, `IsActive`, `RegionalID`, `OriginalID`, `OriginalNama`, `OriginalKode`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `id_provinsi_old`, `nama_provinsi_old`) VALUES
(146, 'DKI Jakarta', '32', 1, NULL, NULL, NULL, NULL, '2021-08-04 16:23:40', NULL, '2021-08-24 09:21:54', 'Nizar', NULL, NULL),
(147, 'Jawa Barat', '2', 1, NULL, NULL, NULL, NULL, '2021-08-05 06:31:58', NULL, '2021-08-24 09:20:04', 'Nizar', NULL, NULL),
(148, 'Banten', '32', 1, NULL, NULL, NULL, NULL, '2021-08-16 07:04:42', 'Nizar', '2021-08-16 07:04:42', 'Nizar', NULL, NULL),
(149, 'Kalimantan Timur', '12', 1, NULL, NULL, NULL, NULL, '2021-08-24 09:22:52', 'Nizar', '2021-08-24 09:22:52', 'Nizar', NULL, NULL),
(150, 'Sumatera Selatan', '56', 1, NULL, NULL, NULL, NULL, '2021-09-22 03:12:10', 'Nizar', '2021-09-22 03:12:10', 'Nizar', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID` smallint(6) NOT NULL,
  `RoleName` varchar(50) DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModifiedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `Level` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rt`
--

CREATE TABLE `rt` (
  `id_rt` int(11) NOT NULL,
  `RTID` int(11) DEFAULT NULL,
  `KodeRT` varchar(100) DEFAULT NULL,
  `nama_rt` varchar(50) DEFAULT NULL,
  `id_rw` int(11) DEFAULT NULL,
  `KodeRW` char(5) DEFAULT NULL,
  `NamaRW` varchar(100) DEFAULT NULL,
  `KelurahanID` int(11) DEFAULT NULL,
  `KodeKelurahan` char(4) DEFAULT NULL,
  `NamaKelurahan` varchar(50) DEFAULT NULL,
  `KecamatanID` int(11) DEFAULT NULL,
  `KodeKecamatan` char(2) DEFAULT NULL,
  `NamaKecamatan` varchar(50) DEFAULT NULL,
  `KabupatenID` int(11) DEFAULT NULL,
  `KodeKabupaten` varchar(2) DEFAULT NULL,
  `NamaKabupaten` varchar(50) DEFAULT NULL,
  `ProvinsiID` int(11) DEFAULT NULL,
  `KodePropinsi` char(2) DEFAULT NULL,
  `NamaProvinsi` varchar(50) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `TargetKK` bigint(20) DEFAULT NULL,
  `id_rt_old` int(11) DEFAULT NULL,
  `nama_rt_old` varchar(255) DEFAULT NULL,
  `RTID_old` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rt`
--

INSERT INTO `rt` (`id_rt`, `RTID`, `KodeRT`, `nama_rt`, `id_rw`, `KodeRW`, `NamaRW`, `KelurahanID`, `KodeKelurahan`, `NamaKelurahan`, `KecamatanID`, `KodeKecamatan`, `NamaKecamatan`, `KabupatenID`, `KodeKabupaten`, `NamaKabupaten`, `ProvinsiID`, `KodePropinsi`, `NamaProvinsi`, `IsActive`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `flag`, `TargetKK`, `id_rt_old`, `nama_rt_old`, `RTID_old`) VALUES
(1, NULL, '9', '23', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2021-08-04 16:33:47', NULL, '2021-08-04 16:33:47', NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, '03', '04', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2021-08-05 09:59:04', NULL, '2021-08-05 09:59:04', NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, '43', '21', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2021-08-14 08:16:52', NULL, '2021-08-14 08:16:52', NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, '2', '02', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-09-06 12:58:57', 'Nizar', '2021-09-06 12:58:57', 'Nizar', NULL, NULL, NULL, NULL, NULL),
(5, NULL, '04', '03', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-09-08 14:28:01', 'Nizar', '2021-09-08 14:28:01', 'Nizar', NULL, NULL, NULL, NULL, NULL),
(6, NULL, '8', '20', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-09-10 15:01:19', 'Azhar', '2021-09-10 15:01:19', 'Azhar', NULL, NULL, NULL, NULL, NULL),
(7, NULL, '32', '23', 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-09-22 03:14:30', 'Nizar', '2021-09-22 03:14:30', 'Nizar', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rw`
--

CREATE TABLE `rw` (
  `id_rw` int(11) NOT NULL,
  `nama_rw` varchar(50) DEFAULT NULL,
  `KodeDepdagri` char(5) DEFAULT NULL,
  `id_kelurahan` int(11) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `OriginalID` int(11) DEFAULT NULL,
  `OriginalNama` varchar(50) DEFAULT NULL,
  `OriginalKode` char(2) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `id_rw_old` int(11) DEFAULT NULL,
  `nama_rw_old` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rw`
--

INSERT INTO `rw` (`id_rw`, `nama_rw`, `KodeDepdagri`, `id_kelurahan`, `IsActive`, `OriginalID`, `OriginalNama`, `OriginalKode`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `id_rw_old`, `nama_rw_old`) VALUES
(2, '03', '1', 31, 1, NULL, NULL, NULL, '2021-08-04 16:26:49', NULL, '2021-08-04 16:26:49', NULL, NULL, NULL),
(3, '07', '3', 32, 1, NULL, NULL, NULL, '2021-08-05 09:58:36', NULL, '2021-08-05 09:58:36', NULL, NULL, NULL),
(4, '10', '3', 38, 1, NULL, NULL, NULL, '2021-08-17 10:00:40', NULL, '2021-08-17 10:00:40', NULL, NULL, NULL),
(5, '08', '2', 39, 1, NULL, NULL, NULL, '2021-09-10 15:00:47', 'Azhar', '2021-09-10 15:00:47', 'Azhar', NULL, NULL),
(6, '09', '6', 40, 1, NULL, NULL, NULL, '2021-09-22 03:14:06', 'Nizar', '2021-09-22 03:14:06', 'Nizar', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id_setting` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `value_setting` varchar(300) NOT NULL,
  `Id_kelompok_data` int(200) NOT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id_setting`, `nama`, `value_setting`, `Id_kelompok_data`, `LastModified`, `LastModifiedBy`, `Created`, `CreatedBy`) VALUES
(4, 'Tahun Sensus', '2021', 2, '2021-08-16 13:25:13', 'Nizar', '2021-08-16 13:25:13', 'Nizar'),
(5, 'Perempuan', '0', 1, '2021-08-16 15:08:20', 'Nizar', '2021-08-16 15:08:20', 'Nizar'),
(6, 'Laki-laki', '1', 1, '2021-08-16 15:08:36', 'Nizar', '2021-08-16 15:08:36', 'Nizar'),
(7, 'Menikah', '1', 3, '2021-08-16 15:08:52', 'Nizar', '2021-08-16 15:08:52', 'Nizar'),
(25, 'Welcome', 'Selamat Datang [username]', 8, '2021-08-28 08:33:17', '', '2021-08-28 08:33:17', ''),
(26, 'Title Email', 'Info Akun anda Di bkkbn Laporan Sensus', 9, '2021-08-31 13:35:18', 'Iman', '2021-08-31 13:35:18', 'Iman'),
(27, 'body', 'username anda : [UserName] <br/> password anda : [Password] <br/> Silahkan anda Login Di <a href=\"[url]\">web BKKBN</a>', 9, '2021-08-31 13:42:04', 'Iman', '2021-08-31 13:42:04', 'Iman'),
(28, 'url', 'http:localhost:81', 9, '2021-08-31 14:17:57', 'Iman', '2021-08-31 14:17:57', 'Iman'),
(29, 'Belum Menikah', '0', 3, '2021-09-21 10:12:50', 'Nizar', '2021-09-21 10:12:50', 'Nizar'),
(30, 'Islam', '0', 4, '2021-09-21 10:13:06', 'Nizar', '2021-09-21 10:13:06', 'Nizar'),
(31, 'Kristen', '1', 4, '2021-09-21 10:13:21', 'Nizar', '2021-09-21 10:13:21', 'Nizar'),
(32, 'Hindu', '2', 4, '2021-09-21 10:13:30', 'Nizar', '2021-09-21 10:13:30', 'Nizar'),
(33, 'Budha', '3', 4, '2021-09-21 10:13:42', 'Nizar', '2021-09-21 10:13:42', 'Nizar'),
(34, 'Hindu', '4', 4, '2021-09-21 10:13:51', 'Nizar', '2021-09-21 10:13:51', 'Nizar'),
(35, 'Konghuchu', '5', 4, '2021-09-21 10:14:19', 'Nizar', '2021-09-21 10:14:19', 'Nizar'),
(36, 'Katolik', '6', 4, '2021-09-21 10:14:31', 'Nizar', '2021-09-21 10:14:31', 'Nizar'),
(37, 'WNI', '0', 10, '2021-09-21 10:18:30', 'Nizar', '2021-09-21 10:18:30', 'Nizar'),
(38, 'WNA', '1', 10, '2021-09-21 10:18:40', 'Nizar', '2021-09-21 10:18:40', 'Nizar'),
(39, 'SD/Sederajat', '0', 11, '2021-09-21 10:21:54', 'Nizar', '2021-09-21 10:21:54', 'Nizar'),
(40, 'SMP/Sederajat', '1', 11, '2021-09-21 10:22:06', 'Nizar', '2021-09-21 10:22:06', 'Nizar'),
(41, 'SMA/SMK/Sederajat', '2', 11, '2021-09-21 10:23:17', 'Nizar', '2021-09-21 10:23:17', 'Nizar'),
(42, 'D1', '3', 11, '2021-09-21 10:23:44', 'Nizar', '2021-09-21 10:23:44', 'Nizar'),
(43, 'D2', '4', 11, '2021-09-21 10:23:51', 'Nizar', '2021-09-21 10:23:51', 'Nizar'),
(44, 'D3', '5', 11, '2021-09-21 10:24:07', 'Nizar', '2021-09-21 10:24:07', 'Nizar'),
(45, 'S1', '6', 11, '2021-09-21 10:24:18', 'Nizar', '2021-09-21 10:24:18', 'Nizar'),
(46, 'S2', '7', 11, '2021-09-21 10:24:32', 'Nizar', '2021-09-21 10:24:32', 'Nizar'),
(47, 'S3', '8', 11, '2021-09-21 10:24:41', 'Nizar', '2021-09-21 10:24:41', 'Nizar'),
(48, 'Kepala Keluarga', '0', 12, '2021-09-21 10:26:41', 'Nizar', '2021-09-21 10:26:41', 'Nizar'),
(49, 'Istri', '1', 12, '2021-09-21 10:27:06', 'Nizar', '2021-09-21 10:27:06', 'Nizar'),
(50, 'Anak', '2', 12, '2021-09-21 10:27:20', 'Nizar', '2021-09-21 10:27:20', 'Nizar'),
(51, 'Ibu', '3', 12, '2021-09-21 10:28:46', 'Nizar', '2021-09-21 10:28:46', 'Nizar'),
(52, 'Belum/Tidak Bekerja', '0', 13, '2021-09-21 13:16:40', 'Nizar', '2021-09-21 13:16:40', 'Nizar'),
(53, 'Pelajar/Mahasiswa', '1', 13, '2021-09-21 13:16:54', 'Nizar', '2021-09-21 13:16:54', 'Nizar'),
(54, 'Pegawai Swasta', '2', 13, '2021-09-21 13:17:15', 'Nizar', '2021-09-21 13:17:15', 'Nizar'),
(55, 'Wirausaha', '3', 13, '2021-09-21 13:17:50', 'Nizar', '2021-09-21 13:17:50', 'Nizar'),
(56, 'Guru', '4', 13, '2021-09-21 13:17:58', 'Nizar', '2021-09-21 13:17:58', 'Nizar'),
(57, 'Lainnya', '5', 13, '2021-09-21 13:18:19', 'Nizar', '2021-09-21 13:18:19', 'Nizar');

-- --------------------------------------------------------

--
-- Table structure for table `table_kk_periode_sensus`
--

CREATE TABLE `table_kk_periode_sensus` (
  `KK_id` bigint(20) NOT NULL,
  `periode_sensus` int(11) NOT NULL,
  `NoKK` int(11) NOT NULL,
  `NIK_KK` int(11) NOT NULL,
  `nama_kk` varchar(50) NOT NULL,
  `alamat_kk` varchar(100) NOT NULL,
  `id_provinsi` int(11) NOT NULL,
  `id_kab` int(11) NOT NULL,
  `id_kec` int(11) NOT NULL,
  `id_kel` int(11) NOT NULL,
  `id_rw` int(11) NOT NULL,
  `id_rt` int(11) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `create_by` varchar(50) NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_kk_periode_sensus`
--

INSERT INTO `table_kk_periode_sensus` (`KK_id`, `periode_sensus`, `NoKK`, `NIK_KK`, `nama_kk`, `alamat_kk`, `id_provinsi`, `id_kab`, `id_kec`, `id_kel`, `id_rw`, `id_rt`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
(1, 2021, 2133, 1232314, 'Luber', 'jl.airud', 146, 5, 6, 31, 2, 1, '2021-09-22 12:45:00', 'Nizar', '2021-09-22 12:45:00', 'Nizar');

-- --------------------------------------------------------

--
-- Table structure for table `target_kk`
--

CREATE TABLE `target_kk` (
  `Periode_Sensus` int(11) NOT NULL,
  `id_provinsi` int(11) NOT NULL,
  `id_kabupaten` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `id_rw` int(11) NOT NULL,
  `id_rt` int(11) NOT NULL,
  `Target_KK` bigint(20) DEFAULT NULL,
  `CreatedBy` varchar(100) NOT NULL,
  `LastModifiedBy` varchar(100) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `target_kk`
--

INSERT INTO `target_kk` (`Periode_Sensus`, `id_provinsi`, `id_kabupaten`, `id_kecamatan`, `id_kelurahan`, `id_rw`, `id_rt`, `Target_KK`, `CreatedBy`, `LastModifiedBy`, `Created`, `LastModified`) VALUES
(2021, 146, 5, 6, 31, 2, 2, 1000, 'Nizar', 'Nizar', '2021-08-17 14:54:45', '2021-08-17 14:54:45'),
(2021, 146, 5, 6, 31, 2, 3, 430, 'Nizar', 'Nizar', '2021-08-24 09:13:17', '2021-08-24 09:13:17');

-- --------------------------------------------------------

--
-- Table structure for table `tingkatwilayah`
--

CREATE TABLE `tingkatwilayah` (
  `ID` smallint(6) NOT NULL,
  `TingkatWilayah` varchar(25) DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModifiedDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_access_survey`
--

CREATE TABLE `user_access_survey` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_provinsi` int(11) NOT NULL,
  `id_kabupaten` int(11) NOT NULL,
  `id_kecamatan` int(11) NOT NULL,
  `id_kelurahan` int(11) NOT NULL,
  `id_rw` int(11) NOT NULL,
  `id_rt` int(11) NOT NULL,
  `Periode_Sensus` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) NOT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `LastModifiedBy` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_access_survey`
--

INSERT INTO `user_access_survey` (`id`, `id_user`, `id_provinsi`, `id_kabupaten`, `id_kecamatan`, `id_kelurahan`, `id_rw`, `id_rt`, `Periode_Sensus`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
(8, 4, 20, 21, 14, 18, 12, 7, 2019, '2021-08-26 15:38:05', 'tmfadhli12', '2021-08-26 15:38:05', 'tmfadhli12'),
(9, 5, 20, 21, 14, 18, 12, 7, 2021, '2021-08-26 15:51:03', 'tmfadhli12', '2021-08-26 15:54:56', 'tmfadhli12'),
(10, 30, 146, 5, 6, 31, 2, 1, 2021, '2021-09-02 14:52:37', 'Nizar', '2021-09-02 14:52:37', 'Nizar'),
(11, 6, 146, 9, 9, 32, 3, 2, 2021, '2021-09-03 06:56:52', 'Nizar', '2021-09-03 06:56:52', 'Nizar'),
(12, 31, 148, 12, 13, 38, 4, 4, 2021, '2021-09-06 12:59:28', 'Nizar', '2021-09-06 12:59:28', 'Nizar'),
(13, 32, 148, 12, 13, 38, 4, 5, 2021, '2021-09-08 14:29:17', 'Nizar', '2021-09-17 13:17:24', 'Nizar'),
(14, 33, 146, 5, 6, 31, 2, 1, 2018, '2021-09-09 08:41:46', 'Nizar', '2021-09-09 08:41:46', 'Nizar'),
(15, 5, 146, 5, 6, 31, 2, 3, 2018, '2021-09-10 14:49:09', 'Nizar', '2021-09-10 14:50:19', 'Nizar');

-- --------------------------------------------------------

--
-- Table structure for table `v_user`
--

CREATE TABLE `v_user` (
  `id` int(11) NOT NULL,
  `PeriodeSensus` int(11) DEFAULT NULL,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `NamaLengkap` varchar(100) DEFAULT NULL,
  `NIK` varchar(50) DEFAULT NULL,
  `Jabatan` varchar(200) DEFAULT NULL,
  `Foto` varchar(200) DEFAULT NULL,
  `Alamat` varchar(200) DEFAULT NULL,
  `KabupatenKotaID` int(11) DEFAULT NULL,
  `NoTelepon` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `NIP` varchar(50) DEFAULT NULL,
  `IsTemporary` tinyint(1) DEFAULT NULL,
  `RoleID` smallint(6) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreatedBy` varchar(50) DEFAULT NULL,
  `LastModified` timestamp NOT NULL DEFAULT current_timestamp(),
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  `Smartphone` tinyint(1) DEFAULT NULL,
  `EmailSent` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `v_user`
--

INSERT INTO `v_user` (`id`, `PeriodeSensus`, `UserName`, `Password`, `NamaLengkap`, `NIK`, `Jabatan`, `Foto`, `Alamat`, `KabupatenKotaID`, `NoTelepon`, `Email`, `NIP`, `IsTemporary`, `RoleID`, `IsActive`, `CreatedDate`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `Smartphone`, `EmailSent`) VALUES
(5, NULL, 'Jason', 'bb752403063ccbd7476385cd7e6e3904', 'Jason Mraz', '291304', 'PKL', NULL, 'Toronto', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-08-24 14:03:08', NULL, '2021-08-24 14:03:08', NULL, NULL, NULL),
(6, NULL, 'Toriq', 'c3284d0f94606de1fd2af172aba15bf3', 'Alaskan Malamute', '12345678', 'PKL', NULL, 'Torontos', NULL, NULL, 'thoriqtmf@gmail.com', NULL, NULL, NULL, NULL, '2021-08-24 14:20:53', NULL, '2021-08-24 14:20:53', NULL, NULL, NULL),
(30, NULL, 'Nizar', '21232f297a57a5a743894a0e4a801fc3', 'Nizar Rasyiid Al Nazario ', '4221345', 'Pkl', NULL, 'jl marunda baru xiv', NULL, NULL, 'nizarrasyiid1221@gmail.com', NULL, NULL, NULL, NULL, '2021-08-31 13:32:11', NULL, '2021-08-31 13:32:11', NULL, NULL, NULL),
(31, NULL, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Administrator', '12345678', 'Administrator', NULL, 'Quadra Solution', NULL, NULL, 'administrator@yahoo.com', NULL, NULL, NULL, NULL, '2021-09-06 12:54:11', NULL, '2021-09-06 12:54:11', NULL, NULL, NULL),
(32, NULL, 'Azhar', '21232f297a57a5a743894a0e4a801fc3', 'Azhar Sander', '2321422', 'Pkl', NULL, 'jl marunda baru xi', NULL, NULL, 'nizarrasyiid1204@gmail.com', NULL, NULL, NULL, NULL, '2021-09-08 14:28:47', NULL, '2021-09-08 14:28:47', NULL, NULL, NULL),
(33, NULL, 'Zande', '21232f297a57a5a743894a0e4a801fc3', 'Zande', '4323212', 'Pkl', NULL, 'Jl.Nusa Indah', NULL, NULL, 'nizarrasyiid@gmail.com', NULL, NULL, NULL, NULL, '2021-09-09 08:11:58', NULL, '2021-09-09 08:11:58', NULL, NULL, NULL),
(39, NULL, 'Fox', '21232f297a57a5a743894a0e4a801fc3', 'Foxy', '214433', 'Pet', NULL, 'Jungle', NULL, NULL, 'pet@gmail.com', NULL, NULL, NULL, NULL, '2021-09-10 23:55:56', NULL, '2021-09-10 23:55:56', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota_kk_periode_sensus`
--
ALTER TABLE `anggota_kk_periode_sensus`
  ADD PRIMARY KEY (`anggota_kk_id`);

--
-- Indexes for table `data_kb`
--
ALTER TABLE `data_kb`
  ADD PRIMARY KEY (`data_kb`);

--
-- Indexes for table `kabupaten`
--
ALTER TABLE `kabupaten`
  ADD PRIMARY KEY (`id_kabupaten`,`nama_kabupaten`),
  ADD KEY `fk_KabupatenProvinsi` (`id_provinsi`);

--
-- Indexes for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD PRIMARY KEY (`id_kecamatan`),
  ADD KEY `kecamatan_pk` (`id_kabupaten`);

--
-- Indexes for table `kelompok_data`
--
ALTER TABLE `kelompok_data`
  ADD PRIMARY KEY (`Id_kelompok_data`);

--
-- Indexes for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD PRIMARY KEY (`id_kelurahan`),
  ADD KEY `fk_KelurahanKecamatan` (`id_kecamatan`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provinsi`
--
ALTER TABLE `provinsi`
  ADD PRIMARY KEY (`id_provinsi`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rt`
--
ALTER TABLE `rt`
  ADD PRIMARY KEY (`id_rt`);

--
-- Indexes for table `rw`
--
ALTER TABLE `rw`
  ADD PRIMARY KEY (`id_rw`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id_setting`);

--
-- Indexes for table `table_kk_periode_sensus`
--
ALTER TABLE `table_kk_periode_sensus`
  ADD PRIMARY KEY (`KK_id`);

--
-- Indexes for table `target_kk`
--
ALTER TABLE `target_kk`
  ADD PRIMARY KEY (`Periode_Sensus`,`id_rt`);

--
-- Indexes for table `tingkatwilayah`
--
ALTER TABLE `tingkatwilayah`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_access_survey`
--
ALTER TABLE `user_access_survey`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `v_user`
--
ALTER TABLE `v_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota_kk_periode_sensus`
--
ALTER TABLE `anggota_kk_periode_sensus`
  MODIFY `anggota_kk_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_kb`
--
ALTER TABLE `data_kb`
  MODIFY `data_kb` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kabupaten`
--
ALTER TABLE `kabupaten`
  MODIFY `id_kabupaten` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `kecamatan`
--
ALTER TABLE `kecamatan`
  MODIFY `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `kelompok_data`
--
ALTER TABLE `kelompok_data`
  MODIFY `Id_kelompok_data` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `kelurahan`
--
ALTER TABLE `kelurahan`
  MODIFY `id_kelurahan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinsi`
--
ALTER TABLE `provinsi`
  MODIFY `id_provinsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `ID` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rt`
--
ALTER TABLE `rt`
  MODIFY `id_rt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rw`
--
ALTER TABLE `rw`
  MODIFY `id_rw` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id_setting` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `table_kk_periode_sensus`
--
ALTER TABLE `table_kk_periode_sensus`
  MODIFY `KK_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tingkatwilayah`
--
ALTER TABLE `tingkatwilayah`
  MODIFY `ID` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_access_survey`
--
ALTER TABLE `user_access_survey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `v_user`
--
ALTER TABLE `v_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kabupaten`
--
ALTER TABLE `kabupaten`
  ADD CONSTRAINT `fk_KabupatenProvinsi` FOREIGN KEY (`id_provinsi`) REFERENCES `provinsi` (`id_provinsi`);

--
-- Constraints for table `kecamatan`
--
ALTER TABLE `kecamatan`
  ADD CONSTRAINT `kecamatan_pk` FOREIGN KEY (`id_kabupaten`) REFERENCES `kabupaten` (`id_kabupaten`);

--
-- Constraints for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD CONSTRAINT `fk_KelurahanKecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan` (`id_kecamatan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
