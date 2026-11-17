# SPKRT 2027 - Form Kuesioner Digital & Engine Validasi Otomatis (BPS)

Aplikasi Web-Entry Form Kuesioner Digital & Engine Validasi Otomatis untuk Survei Pola Konsumsi Rumah Tangga 2027 (SPKRT 2027) Badan Pusat Statistik.

## Pembaruan Data Master Buku 5:
- Memuat **seluruh 40.998 komoditas & varian kualitas** (3.213 jenis komoditas) dari *Buku 5 Master Komoditas Kualitas SPKRT 2027 (Revisi Innas 16102026)*.
- Mendukung pencarian multi-kata kunci secara instan (misal: `beras bulog`, `listrik pasca`, atau kode 10-digit).
- Katalog Buku 5 dilengkapi pembatasan tampilan 100 baris teratas per pencarian agar browser tetap ringan dan responsif.

## Cara Deploy ke GitHub Pages / Vercel:
1. Ekstrak seluruh isi arsip ZIP ini ke dalam satu folder.
2. Buat repository baru di GitHub (misalnya `kalkulator-spkrt2027`) dan unggah seluruh 6 berkas (`index.html`, `style.css`, `master_komoditas.js`, `master_range_harga.js`, `app.js`, `README.md`).
3. Masuk ke **Settings** -> **Pages** -> Pilih Branch **`main`** -> Klik **Save**.
