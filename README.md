# SPKRT 2027 - Form Kuesioner Digital & Engine Validasi Otomatis (BPS)

Aplikasi Web-Entry Form Kuesioner Digital & Engine Validasi Otomatis untuk **Survei Pola Konsumsi Rumah Tangga 2027 (SPKRT 2027)** Badan Pusat Statistik.

## Fitur Lengkap Siap Pakai:
1. **Pemilih Wilayah Pencacahan Multi-Daerah**: Otomatis menyesuaikan acuan range harga wajar lokal (termasuk wilayah jaringan **Gas Alam / Gas Bumi Rumah Tangga (Jargas PGN)** seperti Kota Tarakan, Samarinda, Bulungan, Jabodetabek, serta Standar Nasional).
2. **Database Master Buku 5 Lengkap (40.998 Komoditas & Kualitas)**: Mendukung pencarian autocomplete multi-kata kunci termasuk alias *Gas Alam / Jargas / Gas Bumi*.
3. **Seluruh Form Kuesioner Interaktif & Dapat Diisi Penuh**:
   - **VPKRT27-P**: Pemutakhiran & validasi eligibilitas sampel + hitung otomatis alokasi set BLp/HRp.
   - **VPKRT27-BL & BLp**: Pengeluaran konsumsi bukan makanan (Tunai, Kredit, Produksi Sendiri) + cek range harga wilayah.
   - **VPKRT27-HR & HRp**: Form input harian aktif Hari ke-1 s.d. Hari ke-7 + tombol **Rekap Otomatis ke VPKRT27-LK**.
   - **VPKRT27-LK & KK**: Rekapitulasi mingguan makanan, konversi satuan lokal ke standar, dan cek outlier Buku 4.
   - **VPKRT27-S**: Pengeluaran pendidikan, estimasi sewa rumah, kesehatan tahunan, dan pajak/asuransi.
4. **Auto-Save Lokal & Ekspor JSON**: Tersimpan otomatis di `localStorage` browser dan dapat diunduh sebagai file `.json`.

## Cara Deploy ke GitHub Pages / Vercel / Netlify:
1. Ekstrak seluruh isi file ZIP ini ke dalam satu folder.
2. Pastikan keenam file (`index.html`, `style.css`, `app.js`, `master_komoditas.js`, `master_range_harga.js`, `README.md`) berada di root folder.
3. Unggah ke repository GitHub lalu aktifkan **Settings -> Pages -> Branch `main`**, atau seret (drag & drop) folder tersebut ke dashboard **Vercel** / **Netlify**.
