-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Nov 2024 pada 05.31
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `penilaian`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `akses_penilaian`
--

CREATE TABLE `akses_penilaian` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `akses_penilaian`
--

INSERT INTO `akses_penilaian` (`id`, `kode_mk`) VALUES
(7, 'MK01'),
(13, 'MK06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `no_telp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_admin`
--

INSERT INTO `tb_admin` (`id_admin`, `nama`, `alamat`, `no_telp`) VALUES
(1, 'Semmy', 'jl bahari', '088976060088');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_aturan_penilaian`
--

CREATE TABLE `tb_aturan_penilaian` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(50) NOT NULL,
  `absensi` int(11) NOT NULL,
  `tugas` int(11) NOT NULL,
  `uts` int(11) NOT NULL,
  `uas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_aturan_penilaian`
--

INSERT INTO `tb_aturan_penilaian` (`id`, `kode_mk`, `absensi`, `tugas`, `uts`, `uas`) VALUES
(3, 'MK01', 20, 10, 30, 40),
(4, 'MK02', 10, 10, 30, 50),
(5, 'MK03', 10, 20, 30, 40),
(6, 'MK04', 10, 20, 30, 40),
(7, 'MK05', 10, 20, 30, 40),
(8, 'MK06', 10, 20, 30, 40),
(9, 'MK07', 10, 20, 30, 40),
(10, 'MK08', 10, 20, 30, 40),
(11, 'MK09', 10, 20, 30, 40),
(12, 'MK10', 10, 20, 30, 40),
(13, 'MK11', 10, 20, 30, 40),
(14, 'MK12', 10, 20, 30, 40),
(15, 'MK13', 10, 20, 30, 40),
(16, 'MK14', 10, 20, 30, 40),
(17, 'MK15', 10, 20, 30, 40),
(18, 'MK16', 10, 20, 30, 40),
(19, 'MK17', 10, 20, 30, 40),
(20, 'MK18', 10, 20, 30, 40),
(21, 'MK19', 10, 20, 30, 40),
(22, 'MK20', 10, 20, 30, 40),
(23, 'MK21', 10, 20, 30, 40),
(24, 'MK22', 10, 20, 30, 40),
(25, 'MK23', 10, 20, 30, 40),
(26, 'MK24', 10, 20, 30, 40),
(27, 'MK25', 10, 20, 30, 40),
(28, 'MK26', 10, 20, 30, 40),
(29, 'MK27', 10, 20, 30, 40),
(30, 'MK28', 10, 20, 30, 40),
(31, 'MK29', 10, 20, 30, 40),
(32, 'MK30', 10, 20, 30, 40),
(33, 'MK31', 10, 20, 30, 40),
(34, 'MK32', 10, 20, 30, 40),
(35, 'MK33', 10, 20, 30, 40),
(36, 'MK34', 10, 20, 30, 40),
(37, 'MK35', 10, 20, 30, 40),
(38, 'MK36', 10, 20, 30, 40),
(39, 'MK37', 10, 20, 30, 40),
(40, 'MK38', 10, 20, 30, 40),
(41, 'MK39', 10, 20, 30, 40),
(42, 'MK40', 10, 20, 30, 40),
(43, 'MK41', 10, 20, 30, 40),
(44, 'MK42', 10, 20, 30, 40),
(45, 'MK43', 10, 20, 30, 40),
(46, 'MK44', 10, 20, 30, 40),
(47, 'MK45', 10, 20, 30, 40),
(48, 'MK46', 10, 20, 30, 40),
(49, 'MK47', 10, 20, 30, 40),
(69, '', 10, 10, 20, 60);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_bk`
--

CREATE TABLE `tb_bk` (
  `kode_bk` varchar(11) NOT NULL,
  `bahan_kajian` varchar(255) NOT NULL,
  `reference` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_bk`
--

INSERT INTO `tb_bk` (`kode_bk`, `bahan_kajian`, `reference`) VALUES
('BK01', 'Social Issues and Professional Practice (Masalah Sosial dan Praktek Profesional)', 'penciri utama Prodi Informatika/Ilmu Komputer'),
('BK02', 'Security Policy and Management (Kebijakan dan Manajemen Keamanan)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK03', 'Project Management (Manajemen proyek)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK04', 'User Experience Design (Desain Pengalaman Pengguna)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK05', 'Security Issues and Principles (Masalah dan Prinsip Keamanan)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK06', 'Data and Information Management (Manajemen Data dan Informasi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK07', 'Parallel and Distributed Computing (Komputasi Paralel dan Terdistribusi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK08', 'Computer Networks (Jaringan Komputer)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK09', 'Security Technology and Implementation (Teknologi dan Implementasi Keamanan)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK10', 'Software Design (Desain Perangkat Lunak)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK11', 'Operating Systems (Sistem operasi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK12', 'Data Structures, Algorithms and Complexity (Struktur Data, Algoritma dan Kompleksitas)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK13', 'Programming Languages (Bahasa Pemrograman)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK14', 'Programming Fundamentals (Dasar-dasar Pemrograman)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK15', 'Computing Systems Fundamentals (Dasar-dasar Sistem Komputasi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK16', 'Architecture and Organization (Arsitektur dan Organisasi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK17', 'Graphics and Visualization (Grafik dan Visualisasi)', 'penciri utama Prodi\r\nInformatika/Ilmu Komputer'),
('BK18', 'Intelligent Systems (Sistem Cerdas)', 'Penciri Pedukung Bidang Informatika/Ilmu Komputer'),
('BK19', 'Computational Science (Ilmu Komputasi)', 'Penciri Pedukung Bidang Informatika/Ilmu Komputer'),
('BK20', 'Discrete Structures (Struktur Diskrit)', 'Penciri Pedukung Bidang Informatika/Ilmu Komputer'),
('BK21', 'Artificial Intelligence /AI (Kecerdasan Buatan)', 'ACM DS 2021'),
('BK22', 'Big Data Systems (Sistem Data Besar)', 'ACM DS 2021'),
('BK23', 'Data Mining (Penambangan Data)', 'ACM DS 2021'),
('BK24', 'Data Privacy, Security, Integrity, and Analysis for Security (Privasi Data, Keamanan, Integritas, dan Analisis Keamanan)', 'ACM DS 2021'),
('BK25', 'Machine Learning (Pembelajaran  Mesin)', 'ACM DS 2021'),
('BK26', 'Mathematics and statistics (Matematika & Statistik)', ''),
('BK27', 'Pengembangan Diri', 'Penciri Utama SNDikti'),
('BK28', 'Metodologi Penelitian', 'Penciri Utama Umum'),
('BK29', 'FEFEFGRDRG', 'EFSEFESF');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_bk_cpl`
--

CREATE TABLE `tb_bk_cpl` (
  `id` int(11) NOT NULL,
  `kode_bk` varchar(11) NOT NULL,
  `kode_cpl` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_bk_cpl`
--

INSERT INTO `tb_bk_cpl` (`id`, `kode_bk`, `kode_cpl`) VALUES
(1, 'BK01', 'CPL01'),
(2, 'BK01', 'CPL02'),
(3, 'BK01', 'CPL08'),
(4, 'BK01', 'CPL10'),
(5, 'BK02', 'CPL04'),
(6, 'BK02', 'CPL06'),
(7, 'BK03', 'CPL05'),
(8, 'BK03', 'CPL08'),
(9, 'BK03', 'CPL09'),
(10, 'BK03', 'CPL10'),
(11, 'BK04', 'CPL03'),
(12, 'BK04', 'CPL06'),
(13, 'BK05', 'CPL04'),
(14, 'BK05', 'CPL05'),
(15, 'BK05', 'CPL06'),
(16, 'BK06', 'CPL04'),
(17, 'BK06', 'CPL06'),
(18, 'BK06', 'CPL07'),
(19, 'BK06', 'CPL08'),
(20, 'BK06', 'CPL09'),
(21, 'BK06', 'CPL10'),
(22, 'BK07', 'CPL03'),
(23, 'BK07', 'CPL05'),
(24, 'BK07', 'CPL06'),
(25, 'BK08', 'CPL07'),
(26, 'BK09', 'CPL04'),
(27, 'BK09', 'CPL06'),
(28, 'BK10', 'CPL07'),
(29, 'BK11', 'CPL07'),
(30, 'BK12', 'CPL06'),
(31, 'BK12', 'CPL09'),
(32, 'BK13', 'CPL06'),
(33, 'BK13', 'CPL07'),
(34, 'BK14', 'CPL06'),
(35, 'BK14', 'CPL07'),
(36, 'BK15', 'CPL03'),
(37, 'BK15', 'CPL05'),
(38, 'BK15', 'CPL06'),
(39, 'BK16', 'CPL06'),
(40, 'BK17', 'CPL03'),
(41, 'BK17', 'CPL06'),
(42, 'BK18', 'CPL03'),
(43, 'BK18', 'CPL07'),
(44, 'BK19', 'CPL06'),
(45, 'BK20', 'CPL06'),
(46, 'BK21', 'CPL03'),
(47, 'BK21', 'CPL06'),
(48, 'BK21', 'CPL07'),
(49, 'BK21', 'CPL09'),
(50, 'BK22', 'CPL03'),
(51, 'BK22', 'CPL06'),
(52, 'BK22', 'CPL09'),
(53, 'BK23', 'CPL03'),
(54, 'BK23', 'CPL06'),
(55, 'BK23', 'CPL07'),
(56, 'BK23', 'CPL09'),
(57, 'BK24', 'CPL04'),
(58, 'BK24', 'CPL06'),
(59, 'BK25', 'CPL04'),
(60, 'BK25', 'CPL06'),
(61, 'BK25', 'CPL07'),
(62, 'BK25', 'CPL09'),
(63, 'BK26', 'CPL03'),
(64, 'BK26', 'CPL06'),
(65, 'BK27', 'CPL01'),
(66, 'BK27', 'CPL02'),
(74, 'BK28', 'CPL04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_bk_mk`
--

CREATE TABLE `tb_bk_mk` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(50) NOT NULL,
  `kode_bk` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_bk_mk`
--

INSERT INTO `tb_bk_mk` (`id`, `kode_mk`, `kode_bk`) VALUES
(1, 'MK01', 'BK15'),
(3, 'MK02', 'BK04'),
(4, 'MK03', 'BK04'),
(5, 'MK03', 'BK14'),
(6, 'MK04', 'BK02'),
(7, 'MK04', 'BK04'),
(8, 'MK04', 'BK06'),
(9, 'MK04', 'BK19'),
(10, 'MK04', 'BK23'),
(11, 'MK05', 'BK19'),
(12, 'MK05', 'BK26'),
(13, 'MK06', 'BK27'),
(14, 'MK07', 'BK26'),
(15, 'MK08', 'BK12'),
(16, 'MK08', 'BK20'),
(17, 'MK09', 'BK12'),
(18, 'MK09', 'BK13'),
(19, 'MK09', 'BK14'),
(20, 'MK10', 'BK26'),
(21, 'MK10', 'BK19'),
(22, 'MK11', 'BK27'),
(23, 'MK12', 'BK27'),
(24, 'MK14', 'BK23'),
(25, 'MK14', 'BK22'),
(26, 'MK15', 'BK11'),
(27, 'MK16', 'BK04'),
(28, 'MK17', 'BK06'),
(29, 'MK18', 'BK06'),
(30, 'MK19', 'BK20'),
(31, 'MK20', 'BK23'),
(32, 'MK21', 'BK23'),
(33, 'MK21', 'BK22'),
(34, 'MK21', 'BK24'),
(35, 'MK22', 'BK25'),
(36, 'MK23', 'BK04'),
(37, 'MK24', 'BK17'),
(38, 'MK25', 'BK18'),
(39, 'MK25', 'BK21'),
(40, 'MK26', 'BK27'),
(41, 'MK27', 'BK27'),
(42, 'MK28', 'BK26'),
(43, 'MK29', 'BK01'),
(44, 'MK29', 'BK27'),
(45, 'MK30', 'BK02'),
(46, 'MK30', 'BK05'),
(47, 'MK30', 'BK08'),
(48, 'MK30', 'BK09'),
(49, 'MK30', 'BK24'),
(50, 'MK31', 'BK18'),
(51, 'MK31', 'BK21'),
(52, 'MK32', 'BK16'),
(53, 'MK33', 'BK28'),
(54, 'MK34', 'BK22'),
(55, 'MK34', 'BK23'),
(56, 'MK35', 'BK13'),
(57, 'MK36', 'BK10'),
(58, 'MK37', 'BK03'),
(59, 'MK38', 'BK03'),
(60, 'MK38', 'BK28'),
(61, 'MK39', 'BK13'),
(62, 'MK39', 'BK14'),
(63, 'MK40', 'BK03'),
(64, 'MK41', 'BK07'),
(65, 'MK41', 'BK19'),
(66, 'MK42', 'BK01'),
(67, 'MK43', 'BK03'),
(68, 'MK43', 'BK28'),
(69, 'MK44', 'BK02'),
(70, 'MK44', 'BK05'),
(71, 'MK44', 'BK09'),
(72, 'MK44', 'BK24'),
(73, 'MK45', 'BK24'),
(74, 'MK46', 'BK01'),
(75, 'MK47', 'BK18'),
(76, 'MK47', 'BK22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpl`
--

CREATE TABLE `tb_cpl` (
  `kode_cpl` varchar(15) NOT NULL,
  `deskripsi_cpl` varchar(300) NOT NULL,
  `keterangan` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpl`
--

INSERT INTO `tb_cpl` (`kode_cpl`, `deskripsi_cpl`, `keterangan`) VALUES
('CPL01', 'Bertakwa kepada Tuhan Yang Maha Esa, menunjukkan sikap religius, menjunjung tinggi nilai kemanusiaan, menghormati keanekaragaman budaya dan pandangan, serta menghargai pendapat dan temuan orisinal orang lain. Juga, menginternalisasi nilai, norma, dan etika akademik.', 'Penciri Pendukung, disusun berdasarkan pada unsur SIKAP yang ada di SN Dikti'),
('CPL02', 'Mampu memberikan kontribusi dalam peningkatan mutu kehidupan berdasarkan Pancasila, bertanggungjawab pada kinerja mandiri, bermutu, dan terukur, menginternalisasi semangat kemandirian, kejuangan, dan kewirausahaan, serta memiliki kepekaan sosial, kepedulian terhadap masyarakat dan lingkungan, taat h', 'Penciri Pendukung, disusun\r\nberdasarkan pada unsur SIKAP\r\nyang ada di SN Dikti dan Kompetensi Umum'),
('CPL03', 'Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam menganalisis data secara konseptual dan teknis.', 'Penciri Pendukung, disusun\r\nberdasarkan pada unsur\r\nKETERAMPILAN UMUM yang\r\nada di SN Dikti'),
('CPL04', 'Mampu menerapkan metode penelitian dalam menghasilkan karya ilmiah berbasis pengetahuan dan penalaran dalam bentuk skripsi atau tugas akhir, serta mempublikasikannya di laman perguruan tinggi. Juga mampu mengelola, menyimpan, menjaga keamanan data, dan mencegah plagiasi.', 'Penciri Utama, disusun\r\nberdasarkan pada unsur PENGETAHUAN, \r\nKETERAMPILAN UMUM yang\r\nada di SN Dikti'),
('CPL05', 'Mampu menjelaskan bisnis proses dan aset data untuk pengembangan pemikiran, inovasi bisnis, serta implementasi dan pengambilan keputusan yang tepat dalam menyelesaikan permasalahan bisnis dengan pendekatan sains data.', ''),
('CPL06', 'Mampu menguasai dasar matematika, statistika, algoritma, persiapan data, keamanan data, serta merancang algoritma, pemodelan data, dan interpretasi data untuk keperluan sains data.', ''),
('CPL07', 'Mampu mengelola aspek hardware dan software untuk menunjang proses sains data.', ''),
('CPL08', 'Mampu berkomunikasi efektif, melakukan evaluasi diri terhadap kelompok kerja yang ditangani, dan mengelola pembelajaran secara mandiri.', ''),
('CPL09', 'Mampu menerapkan prinsip, teknik, proses sains data, tanggung jawab profesional, hukum, dan etika analis data di bidang industri dan mengelola data pada setiap tahap pengembangan sistem berskala besar', ''),
('CPL10', 'Mampu mengembangkan jaringan kerja dan bertanggungjawab terhadap pencapaian hasil kerja kelompok.', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpl_mk`
--

CREATE TABLE `tb_cpl_mk` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(50) NOT NULL,
  `kode_cpl` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpl_mk`
--

INSERT INTO `tb_cpl_mk` (`id`, `kode_mk`, `kode_cpl`) VALUES
(3, 'MK02', 'CPL01'),
(4, 'MK03', 'CPL01'),
(5, 'MK03', 'CPL02'),
(6, 'MK03', 'CPL03'),
(7, 'MK01', 'CPL03'),
(8, 'MK04', 'CPL03'),
(9, 'MK04', 'CPL05'),
(10, 'MK05', 'CPL06'),
(11, 'MK06', 'CPL08'),
(12, 'MK07', 'CPL06'),
(13, 'MK08', 'CPL06'),
(14, 'MK09', 'CPL06'),
(15, 'MK09', 'CPL07'),
(16, 'MK10', 'CPL06'),
(17, 'MK11', 'CPL02'),
(18, 'MK12', 'CPL08'),
(19, 'MK13', 'CPL08'),
(21, 'MK14', 'CPL05'),
(22, 'MK15', 'CPL07'),
(23, 'MK16', 'CPL07'),
(24, 'MK17', 'CPL03'),
(25, 'MK18', 'CPL06'),
(26, 'MK19', 'CPL06'),
(27, 'MK20', 'CPL06'),
(28, 'MK21', 'CPL03'),
(29, 'MK21', 'CPL09'),
(30, 'MK22', 'CPL03'),
(31, 'MK22', 'CPL09'),
(32, 'MK23', 'CPL03'),
(33, 'MK23', 'CPL05'),
(34, 'MK24', 'CPL05'),
(35, 'MK25', 'CPL07'),
(36, 'MK25', 'CPL09'),
(37, 'MK26', 'CPL01'),
(38, 'MK26', 'CPL02'),
(39, 'MK27', 'CPL01'),
(40, 'MK28', 'CPL06'),
(41, 'MK29', 'CPL01'),
(42, 'MK29', 'CPL02'),
(43, 'MK30', 'CPL04'),
(44, 'MK31', 'CPL06'),
(45, 'MK32', 'CPL09'),
(46, 'MK33', 'CPL04'),
(47, 'MK34', 'CPL09'),
(48, 'MK35', 'CPL06'),
(49, 'MK35', 'CPL07'),
(50, 'MK36', 'CPL09'),
(51, 'MK36', 'CPL10'),
(52, 'MK37', 'CPL05'),
(53, 'MK38', 'CPL04'),
(54, 'MK39', 'CPL06'),
(55, 'MK39', 'CPL07'),
(56, 'MK40', 'CPL10'),
(57, 'MK40', 'CPL05'),
(58, 'MK41', 'CPL09'),
(59, 'MK42', 'CPL02'),
(60, 'MK42', 'CPL10'),
(61, 'MK43', 'CPL04'),
(62, 'MK44', 'CPL05'),
(63, 'MK44', 'CPL06'),
(64, 'MK45', 'CPL05'),
(65, 'MK45', 'CPL06'),
(66, 'MK46', 'CPL05'),
(67, 'MK46', 'CPL06'),
(68, 'MK47', 'CPL05'),
(69, 'MK47', 'CPL06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpl_pl`
--

CREATE TABLE `tb_cpl_pl` (
  `id` int(11) NOT NULL,
  `kode_cpl` varchar(25) NOT NULL,
  `kode_pl` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpl_pl`
--

INSERT INTO `tb_cpl_pl` (`id`, `kode_cpl`, `kode_pl`) VALUES
(2, 'CPL02', 'PL01'),
(3, 'CPL02', 'PL03'),
(4, 'CPL03', 'PL02'),
(5, 'CPL03', 'PL03'),
(6, 'CPL04', 'PL01'),
(7, 'CPL04', 'PL04'),
(8, 'CPL05', 'PL03'),
(9, 'CPL05', 'PL04'),
(10, 'CPL06', 'PL02'),
(11, 'CPL06', 'PL03'),
(12, 'CPL07', 'PL03'),
(13, 'CPL07', 'PL04'),
(14, 'CPL08', 'PL01'),
(15, 'CPL09', 'PL01'),
(16, 'CPL09', 'PL02'),
(17, 'CPL09', 'PL03'),
(18, 'CPL10', 'PL01'),
(19, 'CPL10', 'PL04'),
(21, 'CPL01', 'PL01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpmk`
--

CREATE TABLE `tb_cpmk` (
  `kode_cpmk` varchar(50) NOT NULL,
  `deskripsi_cpmk` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpmk`
--

INSERT INTO `tb_cpmk` (`kode_cpmk`, `deskripsi_cpmk`) VALUES
('CPMK01', 'Mahasiswa mampu menunjukkan sikap religius, menerapkan ajaran agama sebagai sumber nilai dalam pengembangan profesi dan kepribadian.'),
('CPMK02', 'Mahasiswa mampu menjunjung tinggi nilai kemanusiaan, menghormati keanekaragaman budaya dan pandangan, serta menghargai pendapat dan temuan orisinal orang lain'),
('CPMK03', 'Mahasiswa mampu menginternalisasi nilai, norma, dan etika akademik.'),
('CPMK04', 'Mahasiswa mampu memberikan kontribusi dalam peningkatan mutu kehidupan berdasarkan Pancasila'),
('CPMK05', 'Mahasiswa mampu bertanggungjawab pada kinerja mandiri, bermutu, dan terukur, '),
('CPMK06', 'Mahasiswa mampu menginternalisasi semangat kemandirian, kejuangan, dan kewirausahaan, serta memiliki kepekaan sosial, kepedulian terhadap masyarakat dan lingkungan, taat hukum dan disiplin dalam kehid'),
('CPMK07', 'Mahasiswa mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif.'),
('CPMK08', 'Mahasiswa mampu menganalisis data secara konseptual dan teknis.'),
('CPMK09', 'Mahasiswa mampu menerapkan metode penelitian dalam menghasilkan karya ilmiah berbasis pengetahuan dan penalaran dalam bentuk skripsi atau tugas akhir'),
('CPMK10', 'Mahasiswa mempublikasikan karya ilmiah di laman perguruan tinggi'),
('CPMK11', 'Mahasiswa mampu mengelola, menyimpan, menjaga keamanan data, dan mencegah plagiasi.'),
('CPMK12', 'Mahasiswa mampu menjelaskan bisnis proses dan aset data untuk pengembangan pemikiran, inovasi bisnis'),
('CPMK13', 'Mahasiswa mampu mengimplementasi dan mengambil keputusan yang tepat dalam menyelesaikan permasalahan bisnis dengan pendekatan sains data.'),
('CPMK14', 'Mahasiswa mampu menguasai dasar matematika, statistika, algoritma, persiapan data, keamanan data'),
('CPMK15', 'Mahasiswa mampu merancang algoritma, pemodelan data, dan interpretasi data untuk keperluan sains data'),
('CPMK16', 'Mahasiswa mampu mengelola aspek hardware untuk menunjang proses sains data.'),
('CPMK17', 'Mahasiswa mampu mengelola aspek software untuk menunjang proses sains data.'),
('CPMK18', 'Mahasiswa mampu berkomunikasi secara efektif'),
('CPMK19', 'Mahasiswa mampu melakukan evaluasi diri terhadap kelompok kerja yang ditangani'),
('CPMK20', 'Mahasiswa mampu mengelola pembelajaran secara mandiri.'),
('CPMK21', 'Mahasiswa mampu menerapkan prinsip, teknik, proses sains data, tanggung jawab profesional, hukum, dan etika analis data di bidang industri'),
('CPMK22', 'Mahasiswa mampu mengelola data pada setiap tahap pengembangan sistem berskala besar'),
('CPMK23', 'Mahasiswa mampu mengembangkan jaringan kerja'),
('CPMK24', 'Mahasiswa mampu bertanggungjawab terhadap pencapaian hasil kerja kelompok.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpmk_cpl`
--

CREATE TABLE `tb_cpmk_cpl` (
  `id` int(11) NOT NULL,
  `kode_cpmk` varchar(50) NOT NULL,
  `kode_cpl` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpmk_cpl`
--

INSERT INTO `tb_cpmk_cpl` (`id`, `kode_cpmk`, `kode_cpl`) VALUES
(1, 'CPMK01', 'CPL01'),
(2, 'CPMK02', 'CPL01'),
(3, 'CPMK03', 'CPL01'),
(5, 'CPMK04', 'CPL02'),
(6, 'CPMK05', 'CPL02'),
(7, 'CPMK06', 'CPL02'),
(8, 'CPMK07', 'CPL03'),
(9, 'CPMK08', 'CPL03'),
(10, 'CPMK09', 'CPL04'),
(11, 'CPMK10', 'CPL04'),
(12, 'CPMK12', 'CPL05'),
(13, 'CPMK13', 'CPL05'),
(14, 'CPMK14', 'CPL06'),
(15, 'CPMK15', 'CPL06'),
(16, 'CPMK16', 'CPL07'),
(17, 'CPMK17', 'CPL07'),
(18, 'CMPK18', 'CPL08'),
(19, 'CPMK19', 'CPL08'),
(20, 'CPMK20', 'CPL08'),
(21, 'CPMK21', 'CPL09'),
(22, 'CPMK22', 'CPL09'),
(23, 'CPMK23', 'CPL10'),
(24, 'CPMK24', 'CPL10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_cpmk_mk`
--

CREATE TABLE `tb_cpmk_mk` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(50) NOT NULL,
  `kode_cpmk` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_cpmk_mk`
--

INSERT INTO `tb_cpmk_mk` (`id`, `kode_mk`, `kode_cpmk`) VALUES
(1, 'MK27', 'CPMK01'),
(2, 'MK26', 'CPMK02'),
(3, 'MK11', 'CPMK03'),
(4, 'MK29', 'CPMK03'),
(5, 'MK02', 'CPMK04'),
(6, 'MK11', 'CPMK04'),
(7, 'MK11', 'CPMK05'),
(8, 'MK26', 'CPMK05'),
(9, 'MK40', 'CPMK05'),
(10, 'MK42', 'CPMK05'),
(11, 'MK11', 'CPMK06'),
(12, 'MK26', 'CPMK06'),
(13, 'MK40', 'CPMK06'),
(14, 'MK42', 'CPMK06'),
(15, 'MK17', 'CPMK07'),
(16, 'MK21', 'CPMK07'),
(17, 'MK22', 'CPMK07'),
(18, 'MK23', 'CPMK07'),
(19, 'MK01', 'CPMK08'),
(20, 'MK03', 'CPMK08'),
(21, 'MK04', 'CMPK08'),
(22, 'MK33', 'CPMK09'),
(23, 'MK38', 'CPMK09'),
(24, 'MK43', 'CPMK09'),
(25, 'MK43', 'CPMK10'),
(26, 'MK30', 'CPMK11'),
(27, 'MK04', 'CPMK12'),
(28, 'MK14', 'CPMK12'),
(29, 'MK24', 'CPMK12'),
(30, 'MK23', 'CPMK13'),
(31, 'MK44', 'CPMK13'),
(32, 'MK45', 'CPMK13'),
(33, 'MK37', 'CPMK13'),
(34, 'MK40', 'CPMK13'),
(35, 'MK46', 'CPMK13'),
(36, 'MK47', 'CPMK13'),
(37, 'MK05', 'CPMK14'),
(38, 'MK07', 'CPMK14'),
(39, 'MK09', 'CPMK14'),
(40, 'MK10', 'CPMK14'),
(41, 'MK18', 'CPMK14'),
(42, 'MK19', 'CPMK14'),
(43, 'MK20', 'CPMK14'),
(44, 'MK28', 'CPMK14'),
(45, 'MK08', 'CPMK15'),
(46, 'MK09', 'CPMK15'),
(47, 'MK18', 'CPMK15'),
(48, 'MK20', 'CPMK15'),
(49, 'MK44', 'CPMK15'),
(50, 'MK45', 'CPMK15'),
(51, 'MK31', 'CPMK15'),
(52, 'MK35', 'CPMK15'),
(53, 'MK39', 'CPMK15'),
(54, 'MK46', 'CPMK15'),
(55, 'MK47', 'CPMK15'),
(56, 'MK16', 'CPMK16'),
(57, 'MK09', 'CPMK17'),
(58, 'MK15', 'CPMK17'),
(59, 'MK25', 'CPMK17'),
(60, 'MK35', 'CPMK17'),
(61, 'MK06', 'CPMK18'),
(62, 'MK12', 'CPMK18'),
(63, 'MK13', 'CPMK18'),
(64, 'MK06', 'CPMK19'),
(65, 'MK12', 'CPMK19'),
(66, 'MK13', 'CPMK19'),
(67, 'MK06', 'CPMK20'),
(68, 'MK12', 'CPMK20'),
(69, 'MK13', 'CPMK20'),
(70, 'MK21', 'CPMK21'),
(71, 'MK25', 'CPMK21'),
(72, 'MK32', 'CPMK21'),
(73, 'MK36', 'CPMK21'),
(74, 'MK41', 'CPMK21'),
(75, 'MK21', 'CPMK22'),
(76, 'MK23', 'CPMK22'),
(77, 'MK25', 'CPMK22'),
(78, 'MK34', 'CPMK22'),
(79, 'MK36', 'CPMK22'),
(80, 'MK36', 'CPMK23'),
(81, 'MK40', 'CPMK23'),
(82, 'MK42', 'CPMK23'),
(83, 'MK36', 'CPMK24'),
(84, 'MK40', 'CPMK24'),
(85, 'MK42', 'CPMK24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_dosen`
--

CREATE TABLE `tb_dosen` (
  `nip` varchar(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `alamat` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_dosen`
--

INSERT INTO `tb_dosen` (`nip`, `nama`, `no_telp`, `alamat`) VALUES
('19820980', 'Seana', '555-555-0001', 'Jl. yah'),
('19820981', 'Haerin', '555-555-0314', 'JL. New Jeans'),
('19820983', 'Yurisa', '555-555-0314', 'Jl. dimana yah'),
('19820984', 'Irene', '555-555-0000', 'Jl. bruh'),
('19820987', 'Jung Yerin', '555-555-0000', 'Jl Kampung'),
('19820988', 'Sana', '555-555-0000', 'Jl. Kampung'),
('19820989', 'Jang Wonyoung', '555-555-0314', 'Jl. apa yah'),
('733743', 'Kim Dahyun', '555-555-0314', 'jl twice');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_krs`
--

CREATE TABLE `tb_krs` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(10) NOT NULL,
  `nim` varchar(25) NOT NULL,
  `status` enum('Lulus','Tidak Lulus') DEFAULT 'Tidak Lulus'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_krs`
--

INSERT INTO `tb_krs` (`id`, `kode_mk`, `nim`, `status`) VALUES
(6, 'MK05', '211211020', 'Tidak Lulus'),
(8, 'MK05', '211211006', 'Tidak Lulus'),
(9, 'MK05', '211211007', 'Tidak Lulus'),
(10, 'MK05', '211211008', 'Tidak Lulus'),
(11, 'MK05', '211211009', 'Tidak Lulus'),
(12, 'MK05', '211211010', 'Tidak Lulus'),
(13, 'MK05', '211211019', 'Tidak Lulus'),
(14, 'MK05', '211211022', 'Tidak Lulus'),
(15, 'MK05', '211211021', 'Tidak Lulus'),
(16, 'MK05', '211211001', 'Tidak Lulus'),
(17, 'MK07', '211211001', 'Lulus'),
(18, 'MK02', '211211001', 'Lulus'),
(19, 'MK02', '211211006', 'Tidak Lulus'),
(20, 'MK02', '211211007', 'Tidak Lulus'),
(21, 'MK02', '211211008', 'Tidak Lulus'),
(22, 'MK02', '211211009', 'Tidak Lulus'),
(23, 'MK02', '211211010', 'Tidak Lulus'),
(24, 'MK02', '211211019', 'Tidak Lulus'),
(25, 'MK02', '211211020', 'Tidak Lulus'),
(26, 'MK02', '211211021', 'Tidak Lulus'),
(27, 'MK02', '211211022', 'Tidak Lulus'),
(28, 'MK01', '211211006', 'Tidak Lulus'),
(29, 'MK01', '211211007', 'Tidak Lulus'),
(30, 'MK01', '211211008', 'Tidak Lulus'),
(31, 'MK01', '211211009', 'Tidak Lulus'),
(32, 'MK01', '211211010', 'Tidak Lulus'),
(33, 'MK01', '211211019', 'Tidak Lulus'),
(34, 'MK01', '211211020', 'Tidak Lulus'),
(35, 'MK01', '211211021', 'Tidak Lulus'),
(36, 'MK01', '211211001', 'Tidak Lulus'),
(37, 'MK04', '211211006', 'Tidak Lulus'),
(38, 'MK03', '211211001', 'Lulus'),
(39, 'MK06', '211211001', 'Lulus'),
(40, 'MK06', '211211006', 'Tidak Lulus'),
(41, 'MK06', '211211007', 'Tidak Lulus'),
(42, 'MK06', '211211008', 'Tidak Lulus'),
(43, 'MK06', '211211009', 'Tidak Lulus'),
(44, 'MK06', '211211010', 'Tidak Lulus'),
(45, 'MK06', '211211019', 'Tidak Lulus'),
(46, 'MK06', '211211020', 'Tidak Lulus'),
(47, 'MK06', '211211021', 'Tidak Lulus'),
(48, 'MK06', '211211022', 'Lulus'),
(49, 'MK04', '211211001', 'Tidak Lulus'),
(50, 'MK04', '211211007', 'Tidak Lulus'),
(51, 'MK04', '211211008', 'Tidak Lulus'),
(52, 'MK04', '211211009', 'Tidak Lulus'),
(53, 'MK04', '211211010', 'Tidak Lulus'),
(54, 'MK04', '211211019', 'Tidak Lulus'),
(55, 'MK04', '211211020', 'Tidak Lulus'),
(56, 'MK04', '211211021', 'Tidak Lulus'),
(57, 'MK04', '211211022', 'Tidak Lulus'),
(58, 'MK03', '211211006', 'Tidak Lulus'),
(59, 'MK03', '211211007', 'Tidak Lulus'),
(60, 'MK03', '211211008', 'Tidak Lulus'),
(61, 'MK03', '211211009', 'Tidak Lulus'),
(62, 'MK03', '211211010', 'Tidak Lulus'),
(63, 'MK03', '211211019', 'Tidak Lulus'),
(64, 'MK03', '211211020', 'Tidak Lulus'),
(65, 'MK03', '211211021', 'Tidak Lulus'),
(66, 'MK03', '211211022', 'Tidak Lulus'),
(67, 'MK07', '211211006', 'Tidak Lulus'),
(68, 'MK07', '211211007', 'Tidak Lulus'),
(69, 'MK07', '211211008', 'Tidak Lulus'),
(70, 'MK07', '211211009', 'Tidak Lulus'),
(71, 'MK07', '211211010', 'Tidak Lulus'),
(72, 'MK07', '211211019', 'Tidak Lulus'),
(73, 'MK07', '211211020', 'Tidak Lulus'),
(74, 'MK07', '211211021', 'Tidak Lulus'),
(75, 'MK07', '211211022', 'Tidak Lulus'),
(79, 'MK16', '191211001', 'Tidak Lulus'),
(80, 'MK15', '191211001', 'Tidak Lulus'),
(81, 'MK14', '191211001', 'Tidak Lulus'),
(82, 'MK15', '191211003', 'Tidak Lulus'),
(83, 'MK15', '191211004', 'Tidak Lulus'),
(84, 'MK15', '191211005', 'Tidak Lulus'),
(85, 'MK15', '191211006', 'Tidak Lulus'),
(86, 'MK15', '191211007', 'Tidak Lulus'),
(87, 'MK15', '191211013', 'Tidak Lulus'),
(88, 'MK15', '191211014', 'Tidak Lulus'),
(89, 'MK15', '191211015', 'Tidak Lulus'),
(90, 'MK15', '191211016', 'Tidak Lulus'),
(91, 'MK15', '191211021', 'Tidak Lulus'),
(92, 'MK15', '191211023', 'Tidak Lulus'),
(93, 'MK15', '191211024', 'Tidak Lulus'),
(94, 'MK15', '191211025', 'Tidak Lulus'),
(95, 'MK18', '191211001', 'Tidak Lulus'),
(96, 'MK17', '191211001', 'Tidak Lulus'),
(97, 'MK17', '191211003', 'Tidak Lulus'),
(98, 'MK17', '191211004', 'Tidak Lulus'),
(99, 'MK17', '191211005', 'Tidak Lulus'),
(100, 'MK17', '191211006', 'Tidak Lulus'),
(101, 'MK17', '191211007', 'Tidak Lulus'),
(102, 'MK17', '191211013', 'Tidak Lulus'),
(103, 'MK17', '191211014', 'Tidak Lulus'),
(104, 'MK17', '191211015', 'Tidak Lulus'),
(105, 'MK17', '191211016', 'Tidak Lulus'),
(106, 'MK17', '191211021', 'Tidak Lulus'),
(107, 'MK17', '191211023', 'Tidak Lulus'),
(108, 'MK17', '191211024', 'Tidak Lulus'),
(109, 'MK17', '191211025', 'Tidak Lulus'),
(110, 'MK18', '191211003', 'Tidak Lulus'),
(111, 'MK18', '191211004', 'Tidak Lulus'),
(112, 'MK18', '191211005', 'Tidak Lulus'),
(113, 'MK18', '191211006', 'Tidak Lulus'),
(114, 'MK18', '191211007', 'Tidak Lulus'),
(115, 'MK18', '191211013', 'Tidak Lulus'),
(116, 'MK18', '191211014', 'Tidak Lulus'),
(117, 'MK18', '191211015', 'Tidak Lulus'),
(118, 'MK18', '191211016', 'Tidak Lulus'),
(119, 'MK18', '191211021', 'Tidak Lulus'),
(120, 'MK18', '191211023', 'Tidak Lulus'),
(121, 'MK18', '191211024', 'Tidak Lulus'),
(122, 'MK18', '191211025', 'Tidak Lulus'),
(123, 'MK16', '191211003', 'Tidak Lulus'),
(124, 'MK16', '191211004', 'Tidak Lulus'),
(125, 'MK16', '191211005', 'Tidak Lulus'),
(126, 'MK16', '191211007', 'Tidak Lulus'),
(127, 'MK16', '191211013', 'Tidak Lulus'),
(128, 'MK16', '191211014', 'Tidak Lulus'),
(129, 'MK16', '191211006', 'Tidak Lulus'),
(130, 'MK16', '191211015', 'Tidak Lulus'),
(131, 'MK16', '191211016', 'Tidak Lulus'),
(132, 'MK16', '191211021', 'Tidak Lulus'),
(133, 'MK16', '191211023', 'Tidak Lulus'),
(134, 'MK16', '191211024', 'Tidak Lulus'),
(135, 'MK16', '191211025', 'Tidak Lulus'),
(136, 'MK14', '191211003', 'Tidak Lulus'),
(137, 'MK14', '191211004', 'Tidak Lulus'),
(138, 'MK14', '191211005', 'Tidak Lulus'),
(139, 'MK14', '191211006', 'Tidak Lulus'),
(140, 'MK14', '191211007', 'Tidak Lulus'),
(141, 'MK14', '191211013', 'Tidak Lulus'),
(142, 'MK14', '191211014', 'Tidak Lulus'),
(143, 'MK14', '191211015', 'Tidak Lulus'),
(144, 'MK14', '191211016', 'Tidak Lulus'),
(145, 'MK14', '191211021', 'Tidak Lulus'),
(146, 'MK14', '191211023', 'Tidak Lulus'),
(147, 'MK14', '191211024', 'Tidak Lulus'),
(148, 'MK14', '191211025', 'Tidak Lulus'),
(149, 'MK19', '191211001', 'Tidak Lulus'),
(150, 'MK19', '191211003', 'Tidak Lulus'),
(151, 'MK19', '191211004', 'Tidak Lulus'),
(152, 'MK19', '191211005', 'Tidak Lulus'),
(153, 'MK19', '191211006', 'Tidak Lulus'),
(154, 'MK19', '191211007', 'Tidak Lulus'),
(155, 'MK19', '191211013', 'Tidak Lulus'),
(156, 'MK19', '191211014', 'Tidak Lulus'),
(157, 'MK19', '191211015', 'Tidak Lulus'),
(158, 'MK19', '191211016', 'Tidak Lulus'),
(159, 'MK19', '191211021', 'Tidak Lulus'),
(160, 'MK19', '191211023', 'Tidak Lulus'),
(161, 'MK19', '191211024', 'Tidak Lulus'),
(162, 'MK19', '191211025', 'Tidak Lulus'),
(163, 'MK26', '171211008', 'Tidak Lulus'),
(164, 'MK31', '171211008', 'Tidak Lulus'),
(165, 'MK30', '171211008', 'Tidak Lulus'),
(166, 'MK29', '171211008', 'Tidak Lulus'),
(167, 'MK28', '171211008', 'Tidak Lulus'),
(168, 'MK27', '171211008', 'Tidak Lulus'),
(169, 'MK44', '171211008', 'Tidak Lulus'),
(170, 'MK45', '171211008', 'Tidak Lulus'),
(171, 'MK29', '171211009', 'Tidak Lulus'),
(172, 'MK26', '171211009', 'Tidak Lulus'),
(173, 'MK27', '171211009', 'Tidak Lulus'),
(174, 'MK30', '171211009', 'Tidak Lulus'),
(175, 'MK45', '171211009', 'Tidak Lulus'),
(176, 'MK28', '171211009', 'Tidak Lulus'),
(177, 'MK31', '171211009', 'Tidak Lulus'),
(178, 'MK44', '171211009', 'Tidak Lulus'),
(179, 'MK29', '171211010', 'Tidak Lulus'),
(180, 'MK26', '171211010', 'Tidak Lulus'),
(181, 'MK27', '171211010', 'Tidak Lulus'),
(182, 'MK30', '171211010', 'Tidak Lulus'),
(183, 'MK45', '171211010', 'Tidak Lulus'),
(184, 'MK28', '171211010', 'Tidak Lulus'),
(185, 'MK31', '171211010', 'Tidak Lulus'),
(186, 'MK44', '171211010', 'Tidak Lulus'),
(187, 'MK29', '171211011', 'Tidak Lulus'),
(188, 'MK26', '171211011', 'Tidak Lulus'),
(189, 'MK27', '171211011', 'Tidak Lulus'),
(190, 'MK30', '171211011', 'Tidak Lulus'),
(191, 'MK45', '171211011', 'Tidak Lulus'),
(192, 'MK28', '171211011', 'Tidak Lulus'),
(193, 'MK31', '171211011', 'Tidak Lulus'),
(194, 'MK44', '171211011', 'Tidak Lulus'),
(195, 'MK29', '171211012', 'Tidak Lulus'),
(196, 'MK26', '171211012', 'Tidak Lulus'),
(197, 'MK27', '171211012', 'Tidak Lulus'),
(198, 'MK30', '171211012', 'Tidak Lulus'),
(199, 'MK45', '171211012', 'Tidak Lulus'),
(200, 'MK28', '171211012', 'Tidak Lulus'),
(201, 'MK31', '171211012', 'Tidak Lulus'),
(202, 'MK44', '171211012', 'Tidak Lulus'),
(203, 'MK29', '171211013', 'Tidak Lulus'),
(204, 'MK26', '171211013', 'Tidak Lulus'),
(205, 'MK27', '171211013', 'Tidak Lulus'),
(206, 'MK30', '171211013', 'Tidak Lulus'),
(207, 'MK45', '171211013', 'Tidak Lulus'),
(208, 'MK28', '171211013', 'Tidak Lulus'),
(209, 'MK31', '171211013', 'Tidak Lulus'),
(210, 'MK44', '171211013', 'Tidak Lulus'),
(211, 'MK29', '171211017', 'Tidak Lulus'),
(212, 'MK26', '171211017', 'Tidak Lulus'),
(213, 'MK27', '171211017', 'Tidak Lulus'),
(214, 'MK30', '171211017', 'Tidak Lulus'),
(215, 'MK45', '171211017', 'Tidak Lulus'),
(216, 'MK28', '171211017', 'Tidak Lulus'),
(217, 'MK31', '171211017', 'Tidak Lulus'),
(218, 'MK44', '171211017', 'Tidak Lulus'),
(227, 'MK40', '151211006', 'Tidak Lulus'),
(228, 'MK39', '151211006', 'Tidak Lulus'),
(229, 'MK47', '151211006', 'Tidak Lulus'),
(230, 'MK46', '151211006', 'Tidak Lulus'),
(231, 'MK38', '151211006', 'Tidak Lulus'),
(232, 'MK41', '151211006', 'Tidak Lulus'),
(233, 'MK46', '151211007', 'Tidak Lulus'),
(234, 'MK40', '151211007', 'Tidak Lulus'),
(235, 'MK41', '151211007', 'Tidak Lulus'),
(236, 'MK47', '151211007', 'Tidak Lulus'),
(237, 'MK38', '151211007', 'Tidak Lulus'),
(238, 'MK39', '151211007', 'Tidak Lulus'),
(239, 'MK46', '151211008', 'Tidak Lulus'),
(240, 'MK40', '151211008', 'Tidak Lulus'),
(241, 'MK41', '151211008', 'Tidak Lulus'),
(242, 'MK47', '151211008', 'Tidak Lulus'),
(243, 'MK38', '151211008', 'Tidak Lulus'),
(244, 'MK39', '151211008', 'Tidak Lulus'),
(245, 'MK46', '151211009', 'Tidak Lulus'),
(246, 'MK40', '151211009', 'Tidak Lulus'),
(247, 'MK41', '151211009', 'Tidak Lulus'),
(248, 'MK47', '151211009', 'Tidak Lulus'),
(249, 'MK38', '151211009', 'Tidak Lulus'),
(250, 'MK39', '151211009', 'Tidak Lulus'),
(251, 'MK46', '151211010', 'Tidak Lulus'),
(252, 'MK40', '151211010', 'Tidak Lulus'),
(253, 'MK41', '151211010', 'Tidak Lulus'),
(254, 'MK47', '151211010', 'Tidak Lulus'),
(255, 'MK38', '151211010', 'Tidak Lulus'),
(256, 'MK39', '151211010', 'Tidak Lulus'),
(260, 'MK01', '211211022', 'Lulus'),
(261, 'MK04', '141211004', 'Tidak Lulus');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_krs_dosen`
--

CREATE TABLE `tb_krs_dosen` (
  `id` int(11) NOT NULL,
  `kode_mk` varchar(20) NOT NULL,
  `nip` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_krs_dosen`
--

INSERT INTO `tb_krs_dosen` (`id`, `kode_mk`, `nip`) VALUES
(16, 'MK06', '19820980'),
(17, 'MK01', '19820980'),
(19, 'MK46', '733743');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_mahasiswa`
--

CREATE TABLE `tb_mahasiswa` (
  `nim` varchar(9) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(20) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_tlp` varchar(50) NOT NULL,
  `prodi` varchar(50) NOT NULL,
  `smt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_mahasiswa`
--

INSERT INTO `tb_mahasiswa` (`nim`, `nama`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `alamat`, `email`, `no_tlp`, `prodi`, `smt`) VALUES
('141211002', 'Siti Rahmawati', 'Perempuan', 'Yogyakarta', '1994-02-18', 'Jl. Malioboro No. 456', 'siti.rahmawati@example.com', '08234567890', 'PR02', 8),
('141211004', 'Dewi Kusuma', 'Perempuan', 'Surabaya', '1992-04-06', 'Jl. Gajah Mada No. 012', 'dewi.kusuma@example.com', '08456789012', 'PR03', 8),
('141211005', 'Eko Prasetyo', 'Laki-laki', 'Yogyakarta', '1991-05-14', 'Jl. Malioboro No. 345', 'eko.prasetyo@example.com', '08567890123', 'PR01', 8),
('141211007', 'Gita Wijaya', 'Perempuan', 'Surabaya', '1989-07-29', 'Jl. Gajah Mada No. 901', 'gita.wijaya@example.com', '08789012345', 'PR03', 8),
('151211006', 'Yamada Hiroshi', 'Laki-laki', 'Nagoya', '1991-06-21', 'Jl. Pahlawan No. 678', 'yamada.hiroshi@example.com', '08678901234', 'PR03', 7),
('151211007', 'Choi Soo-min', 'Perempuan', 'Seoul', '1990-07-29', 'Jl. Gajah Mada No. 901', 'choi.soomin@example.com', '08789012345', 'PR03', 7),
('151211008', 'Kawasaki Yuki', 'Perempuan', 'Osaka', '1989-08-06', 'Jl. Malioboro No. 234', 'kawasaki.yuki@example.com', '08890123456', 'PR02', 7),
('151211009', 'Lee Min-ah', 'Perempuan', 'Seoul', '1988-09-12', 'Jl. Pahlawan No. 567', 'lee.minho@example.com', '08901234567', 'PR01', 7),
('151211010', 'Nishimura Haruka', 'Perempuan', 'Tokyo', '1987-10-21', 'Jl. Gajah Mada No. 890', 'nishimura.haruka@example.com', '09012345678', 'PR03', 7),
('161211001', 'Rudi Pratama', 'Laki-laki', 'Bandung', '1997-01-14', 'Jl. Merdeka No. 123', 'rudi.pratama@example.com', '08123456789', 'PR01', 6),
('161211002', 'Siti Azizah', 'Perempuan', 'Yogyakarta', '1996-02-20', 'Jl. Malioboro No. 456', 'siti.rahmawati@example.com', '08234567890', 'PR02', 6),
('161211004', 'Dewi Ayu', 'Perempuan', 'Surabaya', '1994-04-06', 'Jl. Gajah Mada No. 012', 'dewi.kusuma@example.com', '08456789012', 'PR01', 6),
('161211005', 'Eko Prasetyo', 'Laki-laki', 'Yogyakarta', '1993-05-15', 'Jl. Malioboro No. 345', 'eko.prasetyo@example.com', '08567890123', 'PR02', 6),
('161211006', 'Feri Susanto', 'Laki-laki', 'Semarang', '1992-06-22', 'Jl. Pahlawan No. 678', 'feri.susanto@example.com', '08678901234', 'PR03', 6),
('161211013', 'Mulyadi', 'Laki-laki', 'Bandung', '1985-01-15', 'Jl. Merdeka No. 567', 'mulyadi@example.com', '09345678901', 'PR04', 6),
('161211014', 'Nina Rahman', 'Perempuan', 'Yogyakarta', '1984-02-22', 'Jl. Malioboro No. 890', 'nina.rahman@example.com', '09456789012', 'PR01', 6),
('161211015', 'Oscar Sihombing', 'Laki-laki', 'Semarang', '1983-03-30', 'Jl. Pahlawan No. 123', 'oscar.sihombing@example.com', '09567890123', 'PR02', 6),
('171211008', 'Hadi Kusuma', 'Laki-laki', 'Yogyakarta', '1991-08-07', 'Jl. Malioboro No. 234', 'hadi.kusuma@example.com', '08890123456', 'PR03', 5),
('171211009', 'Ika Susanti', 'Perempuan', 'Semarang', '1990-09-15', 'Jl. Pahlawan No. 567', 'ika.susanti@example.com', '08901234567', 'PR04', 5),
('171211010', 'Joko Raharjo', 'Laki-laki', 'Surabaya', '1989-10-22', 'Jl. Gajah Mada No. 890', 'joko.raharjo@example.com', '09012345678', 'PR01', 5),
('171211011', 'Jang Wonyoung', 'Laki-laki', 'Yogyakarta', '1988-11-29', 'Jl. Malioboro No. 901', 'krisna.wijaya@example.com', '09123456789', 'PR01', 5),
('171211012', 'Lina Dewi', 'Perempuan', 'Semarang', '1987-12-07', 'Jl. Pahlawan No. 234', 'lina.dewi@example.com', '09234567890', 'PR02', 5),
('171211013', 'Mulyadi', 'Laki-laki', 'Bandung', '1986-01-15', 'Jl. Merdeka No. 567', 'mulyadi@example.com', '09345678901', 'PR03', 5),
('171211017', 'Rizky Hidayat', 'Laki-laki', 'Yogyakarta', '1982-05-15', 'Jl. Malioboro No. 789', 'rizky.hidayat@example.com', '09789012345', 'PR04', 5),
('181211001', 'Rina Setiawan', 'Perempuan', 'Jakarta', '1999-01-15', 'Jl. Sudirman No. 123', 'rina.setiawan@example.com', '08123456789', 'PR01', 4),
('181211002', 'Ahmad Riyadi', 'Laki-laki', 'Surabaya', '1998-02-22', 'Jl. Gajah Mada No. 456', 'ahmad.riyadi@example.com', '08234567890', 'PR02', 4),
('181211007', 'Adi Nugraha', 'Laki-laki', 'Surabaya', '1993-07-30', 'Jl. Gajah Mada No. 456', 'adi.nugraha@example.com', '08789012345', 'PR03', 4),
('181211008', 'Citra Lestari', 'Perempuan', 'Yogyakarta', '1992-08-07', 'Jl. Malioboro No. 789', 'citra.lestari@example.com', '08890123456', 'PR01', 4),
('181211009', 'Eko Prasetyo', 'Laki-laki', 'Semarang', '1991-09-15', 'Jl. Pahlawan No. 012', 'eko.prasetyo@example.com', '08901234567', 'PR02', 4),
('181211015', 'Joko Raharjo', 'Laki-laki', 'Bandung', '1985-03-30', 'Jl. Asia Afrika No. 345', 'joko.raharjo@example.com', '09567890123', 'PR03', 4),
('181211016', 'Krisna Wijaya', 'Laki-laki', 'Jakarta', '1984-04-07', 'Jl. Sudirman No. 123', 'krisna.wijaya@example.com', '09678901234', 'PR04', 4),
('181211017', 'Lina Ayu', 'Perempuan', 'Surabaya', '1983-05-14', 'Jl. Gajah Mada No. 456', 'lina.dewi@example.com', '09789012345', 'PR01', 4),
('191211001', 'Aldi Pratama', 'Laki-laki', 'Jakarta', '2000-01-01', 'Jalan ABC No. 123', 'aldi@example.com', '08123456789', 'PR02', 3),
('191211003', 'Rizky Febrian', 'Laki-laki', 'Surabaya', '1998-03-03', 'Jalan MNO No. 789', 'rizky@example.com', '08345678901', 'PR02', 3),
('191211004', 'Siti Hidayah', 'Perempuan', 'Semarang', '1997-04-04', 'Jalan PQR No. 012', 'siti@example.com', '08456789012', 'PR03', 3),
('191211005', 'Ahmad Fauzi', 'Laki-laki', 'Makassar', '1996-05-05', 'Jalan STU No. 345', 'ahmad@example.com', '08567890123', 'PR04', 3),
('191211006', 'Dewi Sari', 'Perempuan', 'Yogyakarta', '1995-06-05', 'Jalan DEF No. 789', 'dewi@example.com', '08678901234', 'PR01', 3),
('191211007', 'Kim Jong Un', 'Laki-laki', 'Pyongyang', '1994-07-07', 'Jalan UVW No. 012', 'kimjongun@example.com', '08789012345', 'PR02', 3),
('191211013', 'Choi Min Ho', 'Laki-laki', 'Seoul', '1988-01-01', 'Jalan UVW No. 890', 'choiminho@example.com', '09345678901', 'PR03', 3),
('191211014', 'Kenji Fujita', 'Laki-laki', 'Hiroshima', '1987-02-02', 'Jalan GHI No. 123', 'kenji@example.com', '09456789012', 'PR04', 3),
('191211015', 'Haruka Tanaka', 'Perempuan', 'Osaka', '1986-03-03', 'Jalan XYZ No. 456', 'haruka@example.com', '09567890123', 'PR01', 3),
('191211016', 'Park Jin Young', 'Laki-laki', 'Seoul', '1985-04-04', 'Jalan MNO No. 789', 'parkjinyoung@example.com', '09678901234', 'PR02', 3),
('191211021', 'Nadia Putri', 'Perempuan', 'Bandung', '1980-09-09', 'Jalan XYZ No. 234', 'nadiaputri@example.com', '00123456789', 'PR02', 3),
('191211023', 'Nao Suzuki', 'Perempuan', 'Nagoya', '1978-11-11', 'Jalan MNO No. 890', 'nao@example.com', '00345678901', 'PR03', 3),
('191211024', 'Hiroshi Nakamura', 'Laki-laki', 'Tokyo', '1977-12-12', 'Jalan PQR No. 123', 'hiroshi@example.com', '00456789012', 'PR04', 3),
('191211025', 'Mi Young Kim', 'Perempuan', 'Seoul', '1976-01-01', 'Jalan UVW No. 456', 'miyoung@example.com', '00567890123', 'PR01', 3),
('201211001', 'Rizki Kim', 'Laki-laki', 'Seoul', '2000-01-01', 'Jalan ABC No. 123', 'rizki@example.com', '08123456789', 'PR02', 2),
('201211008', 'Rika Yoon', 'Perempuan', 'Tokyo', '1993-08-08', 'Jalan GHI No. 345', 'rika@example.com', '08890123456', 'PR03', 2),
('201211013', 'Jung Min Lee', 'Laki-laki', 'Seoul', '1988-01-01', 'Jalan UVW No. 890', 'jungmin@example.com', '09345678901', 'PR02', 2),
('201211014', 'Masao Sato', 'Laki-laki', 'Hiroshima', '1987-02-02', 'Jalan GHI No. 123', 'masao@example.com', '09456789012', 'PR03', 2),
('201211017', 'Tomoya Nakamura', 'Laki-laki', 'Nagoya', '1984-05-05', 'Jalan PQR No. 012', 'tomoya@example.com', '09789012345', 'PR04', 2),
('201211019', 'Ryuichi Taniguchi', 'Laki-laki', 'Tokyo', '1982-07-07', 'Jalan UVW No. 678', 'ryuichi@example.com', '09901234567', 'PR01', 2),
('211211001', 'Taro Tanaka', 'Laki-laki', 'Tokyo', '1999-12-31', 'Jalan ABC No. 123', 'taro@example.com', '08123456789', 'PR02', 1),
('211211006', 'Sung Hyun', 'Perempuan', 'Seoul', '1999-06-22', 'Jl Seoul', 'SungHyun@gmail.com', '555-555-0000', 'PR03', 1),
('211211007', 'Siti Nurhayati', 'Perempuan', 'Jakarta', '2000-10-16', '678 Jakarta Street', 'siti@example.com', '555-555-5555', 'PR01', 1),
('211211008', 'Hiroshi Suzuki', 'Laki-laki', 'Tokyo', '1999-01-22', '901 Tokyo Street', 'hiroshi@example.com', '555-555-5555', 'PR01', 1),
('211211009', 'Park Ji-Won', 'Perempuan', 'Seoul', '2000-07-05', '234 Seoul Street', 'jiwon@example.com', '555-555-5555', 'PR03', 1),
('211211010', 'Adi Kusuma', 'Laki-laki', 'Jakarta', '1999-09-28', '567 Jakarta Street', 'adi@example.com', '555-555-5555', 'PR02', 1),
('211211019', 'Ichiro Suzuki', 'Laki-laki', 'Tokyo', '1998-05-12', '123 Tokyo Street', 'ichiro@example.com', '555-555-5555', 'PR03', 1),
('211211020', 'Sakura Kato', 'Perempuan', 'Tokyo', '1999-09-30', '456 Tokyo Street', 'sakura@example.com', '555-555-5555', 'PR04', 1),
('211211021', 'Kaori Miyazono', 'Perempuan', 'Tokyo', '2002-06-30', 'Jl Tokyo', 'kaori@gmail.com', '210-313-123', 'PR03', 1),
('211211022', 'Yerin Jung', 'Perempuan', 'Busan', '1996-08-19', 'Jl busan pokoknya', 'yerin@gmail.com', '555-555-0001', 'PR04', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_mk`
--

CREATE TABLE `tb_mk` (
  `kode_mk` varchar(11) NOT NULL,
  `nama_matkul` varchar(100) NOT NULL,
  `sks` int(11) NOT NULL,
  `smt` int(11) NOT NULL,
  `jadwal` varchar(50) NOT NULL,
  `mbkm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_mk`
--

INSERT INTO `tb_mk` (`kode_mk`, `nama_matkul`, `sks`, `smt`, `jadwal`, `mbkm`) VALUES
('MK01', 'Konseptual Sains Data / Conceptual Data Science', 4, 1, 'senin_07.30-09.30', 86),
('MK02', 'Ilmu Kehidupan / Life Science', 2, 1, 'senin_13.00-14.30', 88),
('MK03', 'Berpikir Kritis / Critical Thinking', 4, 1, 'selasa_08.00-12.00', 70),
('MK04', 'Pengantar Bisnis Sains Data / Introduction to Data Science Business', 4, 1, 'rabu_13.00-17.00', 0),
('MK05', 'Aljabar Linier / Linear Algebra', 2, 1, 'kamis_15.00-17.00', 0),
('MK06', 'Bahasa Inggris Komunikatif untuk Sains Data / Communicative English for Data Science', 2, 1, 'jumat_07.30-09.30', 0),
('MK07', 'Pengantar Statistik Sains Data / Introduction to Data Science Statistics', 2, 1, 'jumat_10.30-12.30', 0),
('MK08', 'Struktur Data / Data Structure', 4, 2, 'senin_08.00-12.00', 0),
('MK09', 'Algoritma dan Pemrograman / Algorithms and Programming', 4, 2, 'senin_13.00-17.00', 0),
('MK10', 'Statistika Sains Data / Data Science Statistics', 4, 2, 'rabu_13.00-17.00', 0),
('MK11', 'Pendidikan Pancasila / Pancasila Education', 2, 2, 'selasa_13.00-14.30', 0),
('MK12', 'Bahasa Indonesia / Indonesian', 2, 2, 'selasa_15.00-17.00', 0),
('MK13', 'Bercerita / Story Telling', 4, 2, 'jumat_13.00-17.00', 0),
('MK14', 'Inovasi Bisnis Sains Data / Data Science Business Innovation', 2, 3, 'senin_07.30-09.30', 0),
('MK15', 'Sistem Operasi / Operating System', 4, 3, 'senin_13.00-17.00', 0),
('MK16', 'Interaksi Manusia dan Komputer / Human and Computer Interaction', 2, 3, 'selasa_10.30-12.30', 0),
('MK17', 'Basis Data / Database', 4, 3, 'rabu_08.00-12.00', 0),
('MK18', 'Persiapan Data / Data Preparation', 4, 3, 'kamis_08.00-12.00', 0),
('MK19', 'Matematika Diskrit / Discrete Mathematics', 4, 3, 'jumat_13.00-17.00', 0),
('MK20', 'Penambangan Data / Data Mining', 4, 4, 'senin_08.00-14.30', 0),
('MK21', 'Analisis Multivariat Terapan / Applied Multivariate Analysis', 4, 4, 'selasa_08.00-12.00', 0),
('MK22', 'Pembelajaran Mesin / Machine Learning', 2, 4, 'rabu_13.00-14.30', 0),
('MK23', 'Rancangan Pemikiran / Design Thinking', 4, 4, 'rabu_08.00-12.00', 0),
('MK24', 'Pemrosesan Gambar Digital / Digital Image Processing', 2, 4, 'kamis_10.00-12.30', 0),
('MK25', 'Kecerdasan Buatan / Artificial Intelligence', 4, 4, 'jumat_13.00-17.00', 0),
('MK26', 'Pendidikan Kewarganegaraan / Civic Education', 2, 5, 'senin_07.30-09.30', 0),
('MK27', 'Agama / Religion', 2, 5, 'senin_13.00-14.30', 0),
('MK28', 'Metode Numerik / Numerical Method', 2, 5, 'selasa_10.30-12.30', 0),
('MK29', 'Etika Profesi dan Pendidikan Anti Korupsi / Professional Ethics and Anti-Corruption Education', 2, 5, 'rabu_10.30-12.30', 0),
('MK30', 'Keamanan dan Jaminan Informasi / Information Security and Assurance', 4, 5, 'kamis_08.00-12.00', 0),
('MK31', 'Kecerdasan Pengambilan Informasi / Information Retrieval Intelligence', 4, 5, 'jumat_13.00-17.00', 0),
('MK32', 'Arsitektur dan Organisasi Komputer / Computer Architecture and Organization', 4, 6, 'senin_08.00-12.00', 0),
('MK33', 'Metodologi Penelitian dan Publikasi Ilmiah / Research Methodology and Scientific Publications', 2, 6, 'senin_13.00-14.30', 0),
('MK34', 'Analitik Data Besar / Big Data Analytic', 4, 6, 'selasa_08.00-12.00', 0),
('MK35', 'Pemrograman Web / Web Programming', 4, 6, 'rabu_08.00-12.00', 0),
('MK36', 'Rekayasa Perangkat Lunak / Software Engineering', 4, 6, 'kamis_08.00-12.00', 0),
('MK37', 'Riset Operasi / Operations Research', 2, 6, 'jumat_13.00-14.30', 0),
('MK38', 'Kerja Praktik / Practical Work', 2, 7, 'senin_13.00-14.30', 0),
('MK39', 'Pemrograman Mobile / Mobile Programming', 4, 7, 'senin_08.00-12.00', 0),
('MK40', 'Manajemen Proyek / Project Management', 4, 7, 'selasa_08.00-12.00', 0),
('MK41', 'Komputasi Awan / Cloud Computing', 2, 7, 'selasa_13.00-14.30', 0),
('MK42', 'Teknopreneurship / Technopreneurship', 2, 8, 'senin_13.00-14.30', 0),
('MK43', 'Skripsi / Thesis', 6, 8, '', 0),
('MK44', 'Keamanan Data / Data Security', 4, 5, 'kamis_13.00-17.00', 0),
('MK45', 'Sistem Penunjang Keputusan / Decision Support System', 4, 5, 'rabu_13.00-17.00', 0),
('MK46', 'Bisnis Elektronik / E-Business', 4, 7, 'rabu_08.00-12.00', 0),
('MK47', 'Sistem Pakar / Expert System', 4, 7, 'kamis_08.00-12.00', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_nilai`
--

CREATE TABLE `tb_nilai` (
  `id` int(11) NOT NULL,
  `nim` varchar(50) NOT NULL,
  `kode_mk` varchar(50) NOT NULL,
  `absensi` int(11) NOT NULL,
  `tugas` int(11) NOT NULL,
  `uts` int(11) NOT NULL,
  `uas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_nilai`
--

INSERT INTO `tb_nilai` (`id`, `nim`, `kode_mk`, `absensi`, `tugas`, `uts`, `uas`) VALUES
(8, '211211022', 'MK01', 16, 100, 100, 70),
(9, '211211001', 'MK07', 16, 100, 100, 100),
(10, '211211001', 'MK03', 16, 100, 100, 100),
(11, '211211001', 'MK02', 16, 100, 100, 100),
(12, '211211022', 'MK06', 16, 100, 100, 100),
(13, '211211001', 'MK06', 16, 100, 100, 100);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_pl`
--

CREATE TABLE `tb_pl` (
  `kode_pl` varchar(4) NOT NULL,
  `profil_lulus` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_pl`
--

INSERT INTO `tb_pl` (`kode_pl`, `profil_lulus`) VALUES
('PL01', 'Lulusan memiliki kemampuan berkomunikasi interpersonal secara lisan maupun tulisan serta memilki sikap toleran dan bertanggung jawab dalam tim multidisplin\r\n'),
('PL02', 'Lulusan memiliki keahlian menganalisa data, pemodelan data dan interpretasi data baik secara konseptual maupun teknis;\r\n'),
('PL03', 'Lulusan memiliki kemampuan mendesain, mengimplementasi dan mengevaluasi solusi atas pemodelan data berbasis computing yang memenuhi kebutuhan pengguna dengan pendekatan yang sesuai dan mampu berjiwa technoprenurship'),
('PL04', 'Lulusan memiliki kemampuan menyelesaikan permasalahan bisnis dengan mengimplementasikan data dan ilmu pengetahuan (memanfaatkan data sebagai aset) dan membangun infrastruktur data, mengatur dan mengelola proses arsitektur data, meliputi pipeline, database, dan data warehouse.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_prodi`
--

CREATE TABLE `tb_prodi` (
  `kode_prodi` varchar(10) NOT NULL,
  `nama_prodi` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_prodi`
--

INSERT INTO `tb_prodi` (`kode_prodi`, `nama_prodi`) VALUES
('PR01', 'Ilmu Komputer'),
('PR02', 'Sains Data'),
('PR03', 'Teknologi Informasi'),
('PR04', 'Sistem Informasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `idUser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`, `type`, `idUser`) VALUES
(1, 'semmy3134', '985a586ada7068c61e9ce50bb95d442e', 'admin', '1'),
(3, '141211002', 'c3ee2f651da51bae92ded62b3768e4ae', 'mahasiswa', '141211002'),
(4, '141211004', '0dfb687748c4247aef9f374ad6eaee70', 'mahasiswa', '141211004'),
(5, '141211005', '4cbbe1159cba213a6d50ed0939d414e0', 'mahasiswa', '141211005'),
(6, '141211007', '24015655a7a68ed022d665d5789b45cb', 'mahasiswa', '141211007'),
(7, '151211006', 'fd48cafbda4b544cc5aa962aa6f20a34', 'mahasiswa', '151211006'),
(8, '151211007', '9256fc5248676562b162acf6ed71071b', 'mahasiswa', '151211007'),
(9, '151211008', '2f8f17776c6638ded8ea290bf67f4282', 'mahasiswa', '151211008'),
(10, '151211009', '4614dbfb3a49793a017ea57273faada6', 'mahasiswa', '151211009'),
(11, '151211010', 'ae8a15e1d4dcd32c94e958af1d1f9150', 'mahasiswa', '151211010'),
(12, '161211001', 'aa4702932b6576305ab20abe92401c59', 'mahasiswa', '161211001'),
(13, '161211002', 'fc569b65731b98a8d707522945de2f30', 'mahasiswa', '161211002'),
(14, '161211004', '59be0d7c09fa2253f372d428b6069186', 'mahasiswa', '161211004'),
(15, '161211005', '49c5f1da8c84f6bfd34f97598b019d61', 'mahasiswa', '161211005'),
(16, '161211006', '1595ffac89a2e8cac8dad7392dd1ae21', 'mahasiswa', '161211006'),
(17, '161211013', '83fd9fe0fec2b2ece443b5bf50e62d76', 'mahasiswa', '161211013'),
(18, '161211014', '86eae011c2dde1a0cbc5a33e640eb0c3', 'mahasiswa', '161211014'),
(19, '161211015', '2e0a1889b074542e4650808b39fe84de', 'mahasiswa', '161211015'),
(20, '171211008', '5455f5d1cf58f0e101e181ec46748134', 'mahasiswa', '171211008'),
(21, '171211009', '0270e11755e8ef74c4f5a34fbc6193e7', 'mahasiswa', '171211009'),
(22, '171211010', 'df59bde51cceaea4627caffe60d2d1fb', 'mahasiswa', '171211010'),
(23, '171211011', 'cda622cb4d7fe653789782db426eed91', 'mahasiswa', '171211011'),
(24, '171211012', 'f432a54eec7e0ba9067c48977985ec54', 'mahasiswa', '171211012'),
(25, '171211013', '7b0e88eaf9753f698d952b956fbbe965', 'mahasiswa', '171211013'),
(26, '171211017', 'f9eb81a992c745ce3c98068474a78c13', 'mahasiswa', '171211017'),
(27, '181211001', 'eeb75378865e388f344f0acee8479809', 'mahasiswa', '181211001'),
(28, '181211002', '56c0b3a8c447fda538fb4a2abba7591f', 'mahasiswa', '181211002'),
(29, '181211007', '6a290e7d3d50674adc604c626c50a162', 'mahasiswa', '181211007'),
(30, '181211008', '4d7a4c968e3664e37d0bb313662c8fff', 'mahasiswa', '181211008'),
(31, '181211009', 'de2ceb922a808b61c3281aa92b341aec', 'mahasiswa', '181211009'),
(32, '181211015', '14c87aa31daac2fce4ab0c25fa769915', 'mahasiswa', '181211015'),
(33, '181211016', '8cc9e8ed84a71daa83c6077e60648f80', 'mahasiswa', '181211016'),
(34, '181211017', '9117e2a68a0cc177fb8840b50e7e760b', 'mahasiswa', '181211017'),
(35, '191211001', 'd625f2b5322bac5d94416e6d2edb479a', 'mahasiswa', '191211001'),
(36, '191211003', '199db9c60fcfce7a56e48894883bba3c', 'mahasiswa', '191211003'),
(37, '191211004', '254448a4e840ff3cf7e297a92be8867f', 'mahasiswa', '191211004'),
(38, '191211005', 'f0ddb76f1ab8ce09efbe16414e288a92', 'mahasiswa', '191211005'),
(39, '191211006', '117c600289878dfd71eb66ae63c45a57', 'mahasiswa', '191211006'),
(40, '191211007', '810638d9be8ab46de344b8131018234b', 'mahasiswa', '191211007'),
(41, '191211013', '8e79282c36a65ce9f477d62442d602ab', 'mahasiswa', '191211013'),
(42, '191211014', '1b9491106e4c95582b0ddd0a1f6481ab', 'mahasiswa', '191211014'),
(43, '191211015', '256476c633fe09719a60f7ec36ae0dfc', 'mahasiswa', '191211015'),
(44, '191211016', '8b8ff11a768eb82b1a2712224a6e2f1e', 'mahasiswa', '191211016'),
(45, '191211021', '0cb12dd0010f6463160fc140d71b7783', 'mahasiswa', '191211021'),
(46, '191211023', '28c224ff817b1faf5e75e0dae03ba3eb', 'mahasiswa', '191211023'),
(47, '191211024', '9367c8a3e65d5aa9cb376942d0eba852', 'mahasiswa', '191211024'),
(48, '191211025', '069c79964b804fc74b93adce918ca37b', 'mahasiswa', '191211025'),
(49, '201211001', 'adcc728f0539b2691c360a1e56635642', 'mahasiswa', '201211001'),
(50, '201211008', '58ff9c86e664ffffc494006d55b89449', 'mahasiswa', '201211008'),
(51, '201211013', 'ecc2f062ae9b843005be9bd459ced0a4', 'mahasiswa', '201211013'),
(52, '201211014', '3bc2f195d137420ea2bab21926abaf79', 'mahasiswa', '201211014'),
(53, '201211017', '1d21f4bd9dde39542f696c62d7ff5b36', 'mahasiswa', '201211017'),
(54, '201211019', '88b7be88499886aa419f63e939a77829', 'mahasiswa', '201211019'),
(55, '211211001', '651d4c2739f12a70f482eef74da63ab6', 'mahasiswa', '211211001'),
(56, '211211006', 'a156224b6140d2a2588e4cb36284af62', 'mahasiswa', '211211006'),
(57, '211211007', '346d10f729118977cf2992f96161cb3c', 'mahasiswa', '211211007'),
(58, '211211008', 'cc6af946f3f8c72482bcb8f03aa41c59', 'mahasiswa', '211211008'),
(59, '211211009', 'c19d41df544fc07f7a9ae96cf8162996', 'mahasiswa', '211211009'),
(60, '211211010', 'b7d6bb192cacfd55c0888d72444f4e38', 'mahasiswa', '211211010'),
(61, '211211019', '9bb3fddb2b21edb2ef1c9dd4060241ae', 'mahasiswa', '211211019'),
(62, '211211020', '189540ff379b211f379994d96f8762a0', 'mahasiswa', '211211020'),
(63, '211211021', '55a485a30a6cebb6cb196f948576c11b', 'mahasiswa', '211211021'),
(64, '211211022', 'e15ec2e660fef2a1be7c33b06ffd573c', 'mahasiswa', '211211022'),
(65, '19820980', 'c5e6dbdd4b5f2494135a94f9801433d7', 'dosen', '19820980'),
(66, '19820981', '215ee6f253b5c1ddc509307e5fc6a3ea', 'dosen', '19820981'),
(67, '19820983', 'd7585c1b465b71274df24184ebb7a3fe', 'dosen', '19820983'),
(68, '19820984', 'c909b8a2b8d226d6a8db97c9384fda8b', 'dosen', '19820984'),
(69, '19820987', '728d95983699b77eeebc76d786d98416', 'dosen', '19820987'),
(70, '19820988', 'd347db587ea582b9cea428b52bc1b0d6', 'dosen', '19820988'),
(71, '19820989', '8d3ddd112b57426211043818bf2bfb99', 'dosen', '19820989'),
(77, '21421421421412', '0b47cfa71bbbf41f1cc55c9442a13df3', 'mahasiswa', '21421421421412');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `akses_penilaian`
--
ALTER TABLE `akses_penilaian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `tb_aturan_penilaian`
--
ALTER TABLE `tb_aturan_penilaian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_bk`
--
ALTER TABLE `tb_bk`
  ADD PRIMARY KEY (`kode_bk`);

--
-- Indeks untuk tabel `tb_bk_cpl`
--
ALTER TABLE `tb_bk_cpl`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_bk_mk`
--
ALTER TABLE `tb_bk_mk`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_cpl`
--
ALTER TABLE `tb_cpl`
  ADD PRIMARY KEY (`kode_cpl`);

--
-- Indeks untuk tabel `tb_cpl_mk`
--
ALTER TABLE `tb_cpl_mk`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_cpl_pl`
--
ALTER TABLE `tb_cpl_pl`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_cpmk`
--
ALTER TABLE `tb_cpmk`
  ADD PRIMARY KEY (`kode_cpmk`);

--
-- Indeks untuk tabel `tb_cpmk_cpl`
--
ALTER TABLE `tb_cpmk_cpl`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_cpmk_mk`
--
ALTER TABLE `tb_cpmk_mk`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_dosen`
--
ALTER TABLE `tb_dosen`
  ADD PRIMARY KEY (`nip`);

--
-- Indeks untuk tabel `tb_krs`
--
ALTER TABLE `tb_krs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_krs_dosen`
--
ALTER TABLE `tb_krs_dosen`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_mahasiswa`
--
ALTER TABLE `tb_mahasiswa`
  ADD PRIMARY KEY (`nim`);

--
-- Indeks untuk tabel `tb_mk`
--
ALTER TABLE `tb_mk`
  ADD PRIMARY KEY (`kode_mk`);

--
-- Indeks untuk tabel `tb_nilai`
--
ALTER TABLE `tb_nilai`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_pl`
--
ALTER TABLE `tb_pl`
  ADD PRIMARY KEY (`kode_pl`);

--
-- Indeks untuk tabel `tb_prodi`
--
ALTER TABLE `tb_prodi`
  ADD PRIMARY KEY (`kode_prodi`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `akses_penilaian`
--
ALTER TABLE `akses_penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tb_admin`
--
ALTER TABLE `tb_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `tb_aturan_penilaian`
--
ALTER TABLE `tb_aturan_penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT untuk tabel `tb_bk_cpl`
--
ALTER TABLE `tb_bk_cpl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT untuk tabel `tb_bk_mk`
--
ALTER TABLE `tb_bk_mk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT untuk tabel `tb_cpl_mk`
--
ALTER TABLE `tb_cpl_mk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT untuk tabel `tb_cpl_pl`
--
ALTER TABLE `tb_cpl_pl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `tb_cpmk_cpl`
--
ALTER TABLE `tb_cpmk_cpl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `tb_cpmk_mk`
--
ALTER TABLE `tb_cpmk_mk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT untuk tabel `tb_krs`
--
ALTER TABLE `tb_krs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT untuk tabel `tb_krs_dosen`
--
ALTER TABLE `tb_krs_dosen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `tb_nilai`
--
ALTER TABLE `tb_nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
