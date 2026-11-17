# Aplikasi Form Kuesioner Digital & Engine Validasi SPKRT 2027 (Final v2)

Paket aplikasi web statis siap pakai (zero-backend, offline-ready dengan `localStorage`) untuk pencacahan dan pemeriksaan **Survei Pola Konsumsi Rumah Tangga (SPKRT) 2027** Badan Pusat Statistik (BPS).

## Pembaruan & Perbaikan Utama
1. **Validasi Range Harga Lengkap (40.998 Komoditas / 131 Kelas COICOP):**
   - Menambahkan acuan range harga seluruh **131 kelas komoditas** pada `master_range_harga.js` dengan penyesuaian otomatis indeks harga wilayah (Tarakan +8%, Bulungan +10%, Samarinda +4%, Jakarta, dan Nasional).
   - Validasi berjalan menyeluruh pada **VPKRT27-BL**, **VPKRT27-HR/HRp**, dan **VPKRT27-LK**, serta menampilkan rentang harga wajar langsung pada kolom status.
2. **Perbaikan Scroll & Navigasi Dropdown Pencarian:**
   - Memperbaiki listener *scroll* global agar menggulir daftar pilihan `#autocompleteDropdown` tidak lagi menutup panel dropdown.
   - Mendukung navigasi keyboard (`Panah Atas/Bawah`, `Enter`, `Esc`) dan menampilkan hingga 50 hasil kecocokan sekaligus.

## Cara Deploy
- **GitHub Pages / Vercel / Netlify:** Unggah seluruh isi folder ini ke repositori atau langsung *drag-and-drop* folder ke Vercel/Netlify.
- **Lokal / Offline Laptop Petugas:** Ekstrak ZIP lalu buka `index.html` menggunakan Google Chrome atau Microsoft Edge.
