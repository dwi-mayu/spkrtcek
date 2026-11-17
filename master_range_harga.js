// Master Acuan Range Harga Wajar Wilayah SPKRT 2027 (Multi-Wilayah + Gas Alam / Jargas)
const MASTER_WILAYAH_HARGA = {
  "6571": {
    nama: "Kota Tarakan - Kalimantan Utara (Jargas PGN & Wilayah Kepulauan)",
    catatan: "Wilayah Jaringan Gas Alam Rumah Tangga (Jargas PGN RT-1/RT-2) & harga kepulauan Kaltara.",
    range: {
      "0111001": { nama: "Beras", satuan: "Kg", min: 13000, max: 20000, wajar: 16000 },
      "0112001": { nama: "Daging Sapi", satuan: "Kg", min: 130000, max: 175000, wajar: 150000 },
      "0112004": { nama: "Daging Ayam Ras", satuan: "Kg", min: 35000, max: 52000, wajar: 42000 },
      "0114007": { nama: "Telur Ayam Ras", satuan: "Kg", min: 28000, max: 38000, wajar: 32000 },
      "0113001": { nama: "Ikan Segar", satuan: "Kg", min: 30000, max: 65000, wajar: 45000 },
      "0117014": { nama: "Cabai Rawit", satuan: "Kg", min: 40000, max: 130000, wajar: 75000 },
      "0117015": { nama: "Cabai Merah", satuan: "Kg", min: 35000, max: 110000, wajar: 60000 },
      "0117016": { nama: "Bawang Merah", satuan: "Kg", min: 28000, max: 65000, wajar: 42000 },
      "0115002": { nama: "Minyak Goreng", satuan: "Liter", min: 15000, max: 24000, wajar: 18500 },
      "0118001": { nama: "Gula Pasir", satuan: "Kg", min: 16500, max: 22000, wajar: 19000 },
      "0341001": { nama: "Listrik (PLN Tarakan)", satuan: "Unit/Paket", min: 50000, max: 1500000, wajar: 350000 },
      "0342001": { nama: "Gas Bumi / Gas Alam Rumah Tangga (Jargas PGN)", satuan: "m3 / Bulan", min: 25000, max: 250000, wajar: 65000 },
      "0342002": { nama: "Elpiji / Bahan Bakar Rumah Tangga", satuan: "Tabung/Liter", min: 20000, max: 240000, wajar: 25000 }
    }
  },
  "6472": {
    nama: "Kota Samarinda - Kalimantan Timur",
    catatan: "Acuan harga konsumen perkotaan Kalimantan Timur.",
    range: {
      "0111001": { nama: "Beras", satuan: "Kg", min: 12500, max: 19500, wajar: 15500 },
      "0112001": { nama: "Daging Sapi", satuan: "Kg", min: 125000, max: 170000, wajar: 145000 },
      "0112004": { nama: "Daging Ayam Ras", satuan: "Kg", min: 32000, max: 48000, wajar: 39000 },
      "0114007": { nama: "Telur Ayam Ras", satuan: "Kg", min: 26000, max: 36000, wajar: 30000 },
      "0117014": { nama: "Cabai Rawit", satuan: "Kg", min: 35000, max: 120000, wajar: 65000 },
      "0115002": { nama: "Minyak Goreng", satuan: "Liter", min: 14500, max: 23000, wajar: 18000 },
      "0118001": { nama: "Gula Pasir", satuan: "Kg", min: 16000, max: 21500, wajar: 18500 },
      "0341001": { nama: "Listrik PLN", satuan: "Unit/Paket", min: 50000, max: 1500000, wajar: 350000 },
      "0342001": { nama: "Gas Bumi / Gas Alam Rumah Tangga", satuan: "m3 / Bulan", min: 25000, max: 250000, wajar: 60000 },
      "0342002": { nama: "Elpiji / Bahan Bakar Rumah Tangga", satuan: "Tabung/Liter", min: 20000, max: 235000, wajar: 24000 }
    }
  },
  "6501": {
    nama: "Kab. Bulungan / Tanjung Selor - Kalimantan Utara",
    catatan: "Acuan harga ibukota provinsi Kalimantan Utara.",
    range: {
      "0111001": { nama: "Beras", satuan: "Kg", min: 13000, max: 20000, wajar: 16000 },
      "0112004": { nama: "Daging Ayam Ras", satuan: "Kg", min: 36000, max: 54000, wajar: 44000 },
      "0114007": { nama: "Telur Ayam Ras", satuan: "Kg", min: 28000, max: 39000, wajar: 33000 },
      "0342001": { nama: "Gas Bumi / Gas Alam Rumah Tangga", satuan: "m3 / Bulan", min: 25000, max: 250000, wajar: 65000 },
      "0342002": { nama: "Elpiji / Bahan Bakar Rumah Tangga", satuan: "Tabung/Liter", min: 22000, max: 250000, wajar: 28000 }
    }
  },
  "3100": {
    nama: "DKI Jakarta & Jabodetabek (Jargas & Perkotaan)",
    catatan: "Acuan harga wilayah Jabodetabek & pelanggan Jargas.",
    range: {
      "0111001": { nama: "Beras", satuan: "Kg", min: 12000, max: 19000, wajar: 15000 },
      "0112001": { nama: "Daging Sapi", satuan: "Kg", min: 120000, max: 165000, wajar: 140000 },
      "0112004": { nama: "Daging Ayam Ras", satuan: "Kg", min: 30000, max: 46000, wajar: 38000 },
      "0114007": { nama: "Telur Ayam Ras", satuan: "Kg", min: 25000, max: 35000, wajar: 29000 },
      "0342001": { nama: "Gas Bumi / Gas Alam Rumah Tangga (Jargas)", satuan: "m3 / Bulan", min: 25000, max: 250000, wajar: 60000 },
      "0342002": { nama: "Elpiji / Bahan Bakar Rumah Tangga", satuan: "Tabung/Liter", min: 19000, max: 220000, wajar: 22000 }
    }
  },
  "0000": {
    nama: "Standar Nasional BPS (Rata-rata Umum)",
    catatan: "Acuan standar nasional umum SPKRT 2027.",
    range: {
      "0111001": { nama: "Beras", satuan: "Kg", min: 11500, max: 20000, wajar: 15000 },
      "0112001": { nama: "Daging Sapi", satuan: "Kg", min: 110000, max: 170000, wajar: 140000 },
      "0112004": { nama: "Daging Ayam Ras", satuan: "Kg", min: 28000, max: 50000, wajar: 38000 },
      "0114007": { nama: "Telur Ayam Ras", satuan: "Kg", min: 24000, max: 36000, wajar: 29000 },
      "0117014": { nama: "Cabai Rawit", satuan: "Kg", min: 25000, max: 120000, wajar: 55000 },
      "0117015": { nama: "Cabai Merah", satuan: "Kg", min: 25000, max: 100000, wajar: 48000 },
      "0117016": { nama: "Bawang Merah", satuan: "Kg", min: 22000, max: 60000, wajar: 36000 },
      "0115002": { nama: "Minyak Goreng", satuan: "Liter", min: 14000, max: 24000, wajar: 17500 },
      "0118001": { nama: "Gula Pasir", satuan: "Kg", min: 15000, max: 22000, wajar: 18000 },
      "0341001": { nama: "Listrik PLN", satuan: "Unit/Paket", min: 40000, max: 2000000, wajar: 300000 },
      "0342001": { nama: "Gas Bumi / Gas Alam Rumah Tangga", satuan: "m3 / Bulan", min: 20000, max: 250000, wajar: 60000 },
      "0342002": { nama: "Elpiji / Bahan Bakar Rumah Tangga", satuan: "Tabung/Liter", min: 18000, max: 240000, wajar: 22000 }
    }
  }
};
