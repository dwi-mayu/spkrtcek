# SPKRT 2027 - Form Kuesioner Digital & Engine Validasi Otomatis (BPS)

Aplikasi Web-Entry Form Kuesioner Digital & Engine Validasi Otomatis untuk Survei Pola Konsumsi Rumah Tangga 2027 (SPKRT 2027) Badan Pusat Statistik.

## Fitur Utama:
- **Typeable Master Buku 5 Search**: Kolom input pencarian komoditas ketik dengan rekomendasi otomatis (autocomplete).
- **Validasi Eligibilitas Sampel (VPKRT27-P)**.
- **Form Kuesioner VPKRT27-BL, VPKRT27-HR, VPKRT27-LK/KK, dan VPKRT27-S**.
- **Otomasi Konversi Satuan & Pemeriksaan Outlier Harga (Buku 4)**.
- **Dashboard Log Error & Temuan PML**.

## Cara Deploy ke GitHub Pages:
1. Ekstrak paket berkas zip ini ke dalam folder komputer.
2. Buat repository public baru di GitHub dengan nama `kalkulator-spkrt2027`.
3. Unggah seluruh 6 berkas (`index.html`, `style.css`, `master_komoditas.js`, `master_range_harga.js`, `app.js`, `README.md`).
4. Masuk ke **Settings** -> **Pages** -> Pilih Branch **`main`** -> Klik **Save**.

## Catatan Penggunaan
- Isian **tersimpan otomatis di browser** (localStorage) perangkat yang dipakai dan tidak dikirim ke server. Gunakan tombol **Hapus Semua Isian** bila memakai perangkat bersama.
- Tombol **Isi Contoh** memuat data contoh untuk mencoba fitur validasi.
- Cek outlier memakai `master_range_harga.js`; cek batas per kapita memakai `batas_max_perkapita` di `master_komoditas.js` (dibandingkan dengan konsumsi per kapita dalam satu minggu).
- Tab **VPKRT27-HR** saat ini berupa contoh format, belum form isian.
- Setelah deploy, aplikasi dapat dibuka di `https://<username>.github.io/<nama-repo>/`.

## Pembaruan Validasi Blok Komoditas (Buku 5)
- **Filter Autocomplete Ketik Per Blok**: Pencarian pada tab **VPKRT27-BL** hanya memunculkan komoditas `VPKRT27-BL` (Bukan Makanan), dan pencarian pada tab **VPKRT27-LK** hanya memunculkan komoditas `VPKRT27-LK` (Makanan, Minuman, & Rokok).
- **Deteksi & Pemblokiran Salah Blok (Exact & Fuzzy Typo)**: Jika petugas mengetik manual komoditas makanan/rokok di tab Bukan Makanan (atau sebaliknya, termasuk salah ketik), status baris otomatis berubah merah (**Salah Blok**) dan tercatat sebagai `ERROR` di tab **Log Validasi**.
