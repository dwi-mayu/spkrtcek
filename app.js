// App.js Engine Validasi & Autocomplete Digital SPKRT 2027 (Buku 5 Lengkap 40.998 Item)

let blRows = [];
let lkRows = [];
let validationLogs = [];

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rp = n => 'Rp ' + (Math.round(n) || 0).toLocaleString('id-ID');
const STORE_KEY = 'spkrt2027-v3';
const FORM_IDS = ['p_nks','p_krt','p_art_total','p_art_bekerja','p_arte_13','p_rencana_pindah','s_pendidikan','s_art_sekolah','s_status_rumah','s_nilai_sewa'];
let loading = true;

function saveState() {
    if (loading) return;
    try {
        const form = {}; FORM_IDS.forEach(id => form[id] = document.getElementById(id).value);
        localStorage.setItem(STORE_KEY, JSON.stringify({ blRows, lkRows, form }));
    } catch (e) {}
}

function loadState() {
    try {
        const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
        if (!s) return false;
        blRows = s.blRows || []; lkRows = s.lkRows || [];
        FORM_IDS.forEach(id => { if (s.form && id in s.form) document.getElementById(id).value = s.form[id]; });
        return true;
    } catch (e) { return false; }
}

function resetAll() {
    if (!confirm('Hapus semua isian di perangkat ini? Tindakan ini tidak bisa dibatalkan.')) return;
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    location.reload();
}

function loadDemo() {
    if ((blRows.length || lkRows.length) && !confirm('Isian BL & LK saat ini akan diganti data contoh. Lanjutkan?')) return;
    const set = (id, v) => document.getElementById(id).value = v;
    set('p_nks','0012B'); set('p_krt','Contoh KRT'); set('p_art_total',4); set('p_art_bekerja',2); set('p_arte_13',3);
    set('s_pendidikan',1500000); set('s_art_sekolah',1); set('s_nilai_sewa',800000);
    blRows = [
        { kode:"0341001001", nama:"LISTRIK - PASCA BAYAR", metode:"KAS", pasar:"5", cash:250000, dp:0 },
        { kode:"0431004001", nama:"MESIN CUCI", metode:"KREDIT", pasar:"5", cash:3600000, dp:1000000 }
    ];
    lkRows = [
        { kode:"0111001057", nama:"BERAS - BULOG MEDIUM", totalHarian:3.5, satuanLokal:"Kg", konversi:1, satuan:"Kg", nilai:49000 },
        { kode:"0112004001", nama:"DAGING AYAM RAS", totalHarian:1.5, satuanLokal:"Kg", konversi:1, satuan:"Kg", nilai:57000 }
    ];
    runValidationP(); runValidationS(); renderBL(); renderLK();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!loadState()) { blRows = [newBL()]; lkRows = [newLK()]; }
    loading = false;
    runValidationP(); runValidationS(); renderBL(); renderLK(); renderCatalog();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideDropdown(); });
window.addEventListener('scroll', () => hideDropdown(), true);
window.addEventListener('resize', () => hideDropdown());
function hideDropdown() { const d = document.getElementById('autocompleteDropdown'); if (d) d.style.display = 'none'; }

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));

    const activeContent = document.getElementById(`tab-${tabId}`);
    if (activeContent) activeContent.classList.add('active');

    const activeNav = document.querySelector(`.nav-tab[onclick="switchTab('${tabId}')"]`);
    if (activeNav) activeNav.classList.add('active');
}

// -------------------------------------------------------------
// TAB 1: VPKRT27-P Validasi Eligibilitas
// -------------------------------------------------------------
function runValidationP() {
    const artTotal = parseInt(document.getElementById('p_art_total').value) || 0;
    const artBekerja = parseInt(document.getElementById('p_art_bekerja').value) || 0;
    const arte13 = parseInt(document.getElementById('p_arte_13').value) || 0;
    const rencanaPindah = document.getElementById('p_rencana_pindah').value;

    let isEligible = true;
    let reasons = [];
    const resDiv = document.getElementById('resultEligibilityP');
    if (document.getElementById('p_art_total').value === '') {
        resDiv.className = "alert alert-info mt-3";
        resDiv.innerHTML = `<i class="fa-solid fa-circle-info"></i> Isi jumlah ART untuk melihat hasil eligibilitas.`;
        updateValidationDashboard();
        return;
    }
    const dataWarn = [];
    if (artBekerja > artTotal) dataWarn.push("Jumlah ART bekerja melebihi jumlah ART total.");
    if (arte13 > artTotal) dataWarn.push("Jumlah ARTE >= 13 tahun melebihi jumlah ART total.");

    if (artTotal < 2 || artTotal > 10) {
        isEligible = false;
        reasons.push(`Jumlah ART Total (${artTotal} org) di luar kriteria 2 s.d. 10 ART.`);
    }
    if (artBekerja < 1) {
        isEligible = false;
        reasons.push("Tidak ada ART yang bekerja/berusaha (minimal 1 ART).");
    }
    if (rencanaPindah === "YA") {
        isEligible = false;
        reasons.push("Rumah tangga berencana pindah tempat tinggal dalam <= 4 bulan.");
    }

    if (isEligible) {
        resDiv.className = "alert alert-success mt-3";
        resDiv.innerHTML = `
            <h4><i class="fa-solid fa-circle-check"></i> RUMAH TANGGA ELIGIBLE (MEMENUHI SYARAT SAMPEL)</h4>
            <p><strong>Alokasi Kuesioner Mandiri:</strong> Bagikan <strong>${arte13} set</strong> kuesioner VPKRT27-BLp & VPKRT27-HRp untuk ARTE berusia &ge; 13 tahun.</p>
            ${dataWarn.length ? `<ul>${dataWarn.map(w => `<li>⚠ ${w}</li>`).join('')}</ul>` : ''}
        `;
    } else {
        resDiv.className = "alert alert-danger mt-3";
        resDiv.innerHTML = `
            <h4><i class="fa-solid fa-circle-xmark"></i> RUMAH TANGGA TIDAK ELIGIBLE (TIDAK MEMENUHI SYARAT)</h4>
            <ul>${reasons.map(r => `<li>${r}</li>`).join('')}</ul>
            <p><em>Prosedur PPL: Ganti sampel menggunakan Form FPPS ke BPS Kabupaten/Kota.</em></p>
        `;
    }
    updateValidationDashboard();
}

// -------------------------------------------------------------
// AUTOCOMPLETE ENGINE MASTER BUKU 5 (OPTIMASI 40.998 ITEM)
// -------------------------------------------------------------
let activeInputTarget = null;
let activeRowIndex = null;
let activeTargetType = null;

function searchMaster(query, limit = 15) {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    const results = [];
    for (let i = 0; i < MASTER_KOMODITAS.length; i++) {
        const item = MASTER_KOMODITAS[i];
        let match = true;
        for (let t = 0; t < tokens.length; t++) {
            if (!item._search.includes(tokens[t])) {
                match = false;
                break;
            }
        }
        if (match) {
            results.push(item);
            if (results.length >= limit) break;
        }
    }
    return results;
}

function showCommoditySearch(event, inputElem, type, rowIndex) {
    activeInputTarget = inputElem;
    activeRowIndex = rowIndex;
    activeTargetType = type;
    const row = (type === 'BL' ? blRows : lkRows)[rowIndex];
    if (row) {
        row.nama = inputElem.value;
        row.kode = '';
        const k = inputElem.closest('tr').querySelector('.c-kode');
        if (k) k.value = '';
        saveState();
    }

    const query = inputElem.value.trim();
    const dropdown = document.getElementById('autocompleteDropdown');

    if (query.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    const filtered = searchMaster(query, 15);

    if (filtered.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    const rect = inputElem.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.width = `${Math.max(rect.width, 360)}px`;
    dropdown.style.display = 'block';

    dropdown.innerHTML = filtered.map(item => `
        <div class="autocomplete-item" onclick="selectCommodityById(${item.id})">
            <div class="autocomplete-title">${esc(item.nama)} <span style="font-weight:400;color:#475569;">(${esc(item.kualitas)})</span></div>
            <div class="autocomplete-sub">
                <span>Kode: ${item.kode} | Satuan: ${esc(item.satuan)}</span>
                <span class="badge badge-info">${item.kuesioner}</span>
            </div>
        </div>
    `).join('');
}

function selectCommodityById(id) {
    const item = MASTER_KOMODITAS[id];
    if (!item) return;
    const labelLengkap = item.kualitas && item.kualitas !== 'GABUNGAN' && item.kualitas !== '…'
        ? `${item.nama} - ${item.kualitas}`
        : item.nama;

    if (activeTargetType === 'BL') {
        blRows[activeRowIndex].kode = item.kode;
        blRows[activeRowIndex].nama = labelLengkap;
        renderBL();
    } else if (activeTargetType === 'LK') {
        lkRows[activeRowIndex].kode = item.kode;
        lkRows[activeRowIndex].nama = labelLengkap;
        lkRows[activeRowIndex].satuan = item.satuan;
        renderLK();
    }
    hideDropdown();
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#autocompleteDropdown') && !e.target.closest('input')) {
        document.getElementById('autocompleteDropdown').style.display = 'none';
    }
});

// -------------------------------------------------------------
// TAB 2: VPKRT27-BL ENGINE
// -------------------------------------------------------------
const newBL = () => ({ kode: "", nama: "", metode: "KAS", pasar: "1", cash: "", dp: "" });
const newLK = () => ({ kode: "", nama: "", totalHarian: "", satuanLokal: "Kg", konversi: 1, satuan: "Kg", nilai: "" });
const sel = (v, cur) => v === cur ? 'selected' : '';

function addRowBL() { blRows.push(newBL()); renderBL(); }
function removeRowBL(idx) { blRows.splice(idx, 1); renderBL(); }

function calcBL(row) {
    const cash = parseFloat(row.cash) || 0, dp = parseFloat(row.dp) || 0;
    if (!row.nama && !cash && !dp) return ['badge-info', 'Baris kosong'];
    if (!row.kode) return ['badge-warning', 'Pilih komoditas dari daftar'];
    if (row.metode === 'KREDIT' && !dp) return ['badge-warning', 'Kredit: DP/cicilan kosong'];
    if (row.metode === 'KAS' && dp) return ['badge-warning', 'Tunai tapi ada DP/cicilan'];
    if (!cash) return ['badge-warning', 'Harga belum diisi'];
    return ['badge-success', 'Valid'];
}

function setBL(idx, field, val) {
    blRows[idx][field] = val;
    const [cls, txt] = calcBL(blRows[idx]);
    const st = document.querySelector(`#tbodyBL tr[data-i="${idx}"] .c-status`);
    if (st) st.innerHTML = `<span class="badge ${cls}">${txt}</span>`;
    updateTotalsBL();
}

function updateTotalsBL() {
    const tc = blRows.reduce((s, r) => s + (parseFloat(r.cash) || 0), 0);
    const td = blRows.reduce((s, r) => s + (parseFloat(r.dp) || 0), 0);
    document.getElementById('totalKonsumsiBL').innerText = rp(tc);
    document.getElementById('totalNonKonsumsiBL').innerText = rp(td);
    updateValidationDashboard();
}

function renderBL() {
    document.getElementById('tbodyBL').innerHTML = blRows.map((row, idx) => {
        const [cls, txt] = calcBL(row);
        return `<tr data-i="${idx}">
            <td>${idx + 1}</td>
            <td><input type="text" value="${esc(row.nama)}" placeholder="Ketik nama komoditas..." autocomplete="off" aria-label="Komoditas baris ${idx + 1}" oninput="showCommoditySearch(event, this, 'BL', ${idx})"></td>
            <td><input type="text" value="${esc(row.kode)}" readonly tabindex="-1" class="bg-gray c-kode" aria-label="Kode"></td>
            <td><select onchange="setBL(${idx},'metode',this.value)"><option value="KAS" ${sel('KAS', row.metode)}>Beli Tunai (Kas)</option><option value="KREDIT" ${sel('KREDIT', row.metode)}>Kredit / Cicilan</option></select></td>
            <td><select onchange="setBL(${idx},'pasar',this.value)">
                <option value="1" ${sel('1', row.pasar)}>1. Pasar Tradisional</option>
                <option value="2" ${sel('2', row.pasar)}>2. Supermarket</option>
                <option value="3" ${sel('3', row.pasar)}>3. Toko Khusus</option>
                <option value="5" ${sel('5', row.pasar)}>5. Online/Marketplace</option></select></td>
            <td><input type="number" min="0" inputmode="numeric" value="${esc(row.cash)}" oninput="setBL(${idx},'cash',this.value)"></td>
            <td><input type="number" min="0" inputmode="numeric" value="${esc(row.dp)}" oninput="setBL(${idx},'dp',this.value)"></td>
            <td class="c-status"><span class="badge ${cls}">${txt}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="removeRowBL(${idx})" aria-label="Hapus baris ${idx + 1}"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }).join('');
    updateTotalsBL();
}

// -------------------------------------------------------------
// TAB 4: VPKRT27-LK ENGINE (MAKANAN)
// -------------------------------------------------------------
function addRowLK() { lkRows.push(newLK()); renderLK(); }
function removeRowLK(idx) { lkRows.splice(idx, 1); renderLK(); }

function calcLK(row) {
    const stdQty = (parseFloat(row.totalHarian) || 0) * (parseFloat(row.konversi) || 1);
    const nilai = parseFloat(row.nilai) || 0;
    const harga = stdQty > 0 ? Math.round(nilai / stdQty) : 0;
    const artTotal = parseInt(document.getElementById('p_art_total').value) || 0;
    const range = MASTER_RANGE_HARGA.range[row.kode] || (row.kode ? MASTER_RANGE_HARGA.range[row.kode.slice(0, 7)] : null);
    const master = MASTER_KOMODITAS.find(k => k.kode === row.kode);
    const issues = [];
    if (range && stdQty > 0) {
        if (harga < range.min) issues.push({ lv: 'danger', t: `Terlalu murah (min ${rp(range.min)})`, msg: `Harga implisit ${rp(harga)} di bawah range wajar (${rp(range.min)} - ${rp(range.max)}).`, aksi: "PML re-cek kuantitas harian atau angka konversi satuan." });
        else if (harga > range.max) issues.push({ lv: 'warning', t: `Terlalu mahal (maks ${rp(range.max)})`, msg: `Harga implisit ${rp(harga)} di atas range wajar (${rp(range.min)} - ${rp(range.max)}).`, aksi: "PML re-cek kuantitas harian atau angka konversi satuan." });
    }
    if (master && artTotal > 0 && stdQty / artTotal > master.batas_max_perkapita) {
        const pk = (stdQty / artTotal).toFixed(2);
        issues.push({ lv: 'warning', t: `Per kapita ${pk} > batas ${master.batas_max_perkapita} ${master.satuan}`, msg: `Konsumsi per kapita ${pk} ${master.satuan} melebihi batas ${master.batas_max_perkapita} ${master.satuan}.`, aksi: "Konfirmasi ulang jumlah konsumsi dan jumlah ART ke responden." });
    }
    return { stdQty, nilai, harga, issues };
}

function lkStatusHTML(c, row) {
    if (!row.kode && (row.nama || c.nilai)) return '<span class="badge badge-warning">Pilih komoditas dari daftar</span>';
    if (!c.issues.length) return c.stdQty > 0 ? '<span class="badge badge-success">Wajar</span>' : '<span class="badge badge-info">Belum lengkap</span>';
    return c.issues.map(i => `<span class="badge badge-${i.lv}">${i.t}</span>`).join(' ');
}

function setLK(idx, field, val) {
    const row = lkRows[idx]; row[field] = val;
    const c = calcLK(row);
    const tr = document.querySelector(`#tbodyLK tr[data-i="${idx}"]`);
    if (tr) {
        tr.querySelector('.c-std').innerText = `${c.stdQty.toFixed(2)} ${row.satuan}`;
        tr.querySelector('.c-harga').innerText = rp(c.harga);
        tr.querySelector('.c-status').innerHTML = lkStatusHTML(c, row);
    }
    updateTotalsLK();
}

function updateTotalsLK() {
    const total = lkRows.reduce((s, r) => s + (parseFloat(r.nilai) || 0), 0);
    const art = parseInt(document.getElementById('p_art_total').value) || 0;
    document.getElementById('totalNilaiLK').innerText = rp(total);
    document.getElementById('perKapitaLK').innerText = art ? `${rp(total / art)} / Orang / Minggu` : 'Isi jumlah ART di VPKRT27-P';
    updateValidationDashboard();
}

function renderLK() {
    document.getElementById('tbodyLK').innerHTML = lkRows.map((row, idx) => {
        const c = calcLK(row);
        return `<tr data-i="${idx}">
            <td>${idx + 1}</td>
            <td><input type="text" value="${esc(row.nama)}" placeholder="Ketik komoditas makanan..." autocomplete="off" aria-label="Komoditas baris ${idx + 1}" oninput="showCommoditySearch(event, this, 'LK', ${idx})"></td>
            <td><input type="text" value="${esc(row.kode)}" readonly tabindex="-1" class="bg-gray c-kode" aria-label="Kode"></td>
            <td><input type="number" min="0" step="any" inputmode="decimal" value="${esc(row.totalHarian)}" oninput="setLK(${idx},'totalHarian',this.value)"></td>
            <td><input type="text" value="${esc(row.satuanLokal)}" oninput="setLK(${idx},'satuanLokal',this.value)"></td>
            <td><input type="number" min="0" step="any" inputmode="decimal" value="${esc(row.konversi)}" oninput="setLK(${idx},'konversi',this.value)"></td>
            <td><strong class="c-std">${c.stdQty.toFixed(2)} ${esc(row.satuan)}</strong></td>
            <td><input type="number" min="0" inputmode="numeric" value="${esc(row.nilai)}" oninput="setLK(${idx},'nilai',this.value)"></td>
            <td class="c-harga">${rp(c.harga)}</td>
            <td class="c-status">${lkStatusHTML(c, row)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeRowLK(${idx})" aria-label="Hapus baris ${idx + 1}"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }).join('');
    updateTotalsLK();
}

// -------------------------------------------------------------
// TAB 5: VPKRT27-S VALIDATION
// -------------------------------------------------------------
function runValidationS() {
    const pend = parseInt(document.getElementById('s_pendidikan').value) || 0;
    const artSekolah = parseInt(document.getElementById('s_art_sekolah').value) || 0;
    const resDiv = document.getElementById('resultValidationS');

    if (artSekolah > 0 && pend === 0) {
        resDiv.className = "alert alert-warning";
        resDiv.innerHTML = `<h4><i class="fa-solid fa-triangle-exclamation"></i> PERINGATAN KONSISTENSI BUKU 4</h4>
        <p>Terdapat ${artSekolah} ART bersekolah tetapi pengeluaran pendidikan Rp 0. PPL/PML wajib memberikan catatan pendukung jika beasiswa penuh.</p>`;
    } else {
        resDiv.className = "alert alert-success";
        resDiv.innerHTML = `<h4><i class="fa-solid fa-circle-check"></i> ISIAN VPKRT27-S KONSISTEN LOGIS</h4>`;
    }
    updateValidationDashboard();
}

// -------------------------------------------------------------
// DASHBOARD LOG VALIDASI TERPADU
// -------------------------------------------------------------
function updateValidationDashboard() {
    validationLogs = [];

    // Check P
    const artTotal = parseInt(document.getElementById('p_art_total').value) || 0;
    if (document.getElementById('p_art_total').value !== '' && (artTotal < 2 || artTotal > 10)) {
        validationLogs.push({ kuesioner: "VPKRT27-P", rincian: "Jumlah ART Total", level: "ERROR", pesan: `Jumlah ART (${artTotal}) di luar batas 2-10 orang.`, aksi: "Konfirmasi ulang keberadaan ART atau lakukan penggantian sampel." });
    }

    // Check LK (outlier harga & batas per kapita)
    lkRows.forEach(row => {
        calcLK(row).issues.forEach(i => validationLogs.push({ kuesioner: "VPKRT27-LK", rincian: row.nama, level: "WARNING", pesan: i.msg, aksi: i.aksi }));
    });

    const tbody = document.getElementById('tbodyLog');
    const badgeCount = document.getElementById('logErrorCount');
    const banner = document.getElementById('validationSummaryBanner');

    badgeCount.innerText = validationLogs.length;
    saveState();

    if (validationLogs.length === 0) {
        banner.className = "alert alert-success";
        banner.innerHTML = `<h3><i class="fa-solid fa-circle-check"></i> DOKUMEN CLEAN / VALID (TIDAK ADA ANOMALI HITUNGAN)</h3>`;
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">Tidak ada kesalahan atau peringatan isian. Dokumen siap di-entry ke FASIH.</td></tr>`;
    } else {
        banner.className = "alert alert-warning";
        banner.innerHTML = `<h3><i class="fa-solid fa-triangle-exclamation"></i> TERDAPAT ${validationLogs.length} TEMUAN / PERINGATAN ISIAN DOKUMEN</h3>`;
        tbody.innerHTML = validationLogs.map((log, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td><span class="badge badge-info">${log.kuesioner}</span></td>
                <td><strong>${esc(log.rincian)}</strong></td>
                <td><span class="badge ${log.level==='ERROR'?'badge-danger':'badge-warning'}">${log.level}</span></td>
                <td>${esc(log.pesan)}</td>
                <td><em>${log.aksi}</em></td>
            </tr>
        `).join('');
    }
}

// -------------------------------------------------------------
// TAB 7: MASTER BUKU 5 CATALOG FILTER (PAGINASI 100 BARIS)
// -------------------------------------------------------------
function renderCatalog() {
    filterCatalog();
}

function filterCatalog() {
    const q = (document.getElementById('catalogSearchInput').value || "").toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    const tbody = document.getElementById('tbodyCatalog');

    const matched = [];
    for (let i = 0; i < MASTER_KOMODITAS.length; i++) {
        const item = MASTER_KOMODITAS[i];
        let ok = true;
        for (let t = 0; t < tokens.length; t++) {
            if (!item._search.includes(tokens[t])) {
                ok = false;
                break;
            }
        }
        if (ok) matched.push(item);
    }

    const preview = matched.slice(0, 100);
    const infoRow = matched.length > 100
        ? `<tr><td colspan="6" class="text-center" style="background:#f8fafc;color:#475569;">Menampilkan <strong>100</strong> dari <strong>${matched.length.toLocaleString('id-ID')}</strong> komoditas yang cocok. Ketik kata kunci lebih spesifik (misal: <code>beras pandan</code> atau <code>0111001</code>) untuk menyaring hasil.</td></tr>`
        : `<tr><td colspan="6" class="text-center" style="background:#f8fafc;color:#475569;">Total ditemukan: <strong>${matched.length.toLocaleString('id-ID')}</strong> komoditas/kualitas.</td></tr>`;

    tbody.innerHTML = infoRow + preview.map(item => `
        <tr>
            <td><code>${item.kode}</code></td>
            <td><strong>${esc(item.nama)}</strong></td>
            <td>${esc(item.kualitas)}</td>
            <td><span class="badge badge-bps">${esc(item.satuan)}</span></td>
            <td>${item.batas_max_perkapita} ${esc(item.satuan)}</td>
            <td><span class="badge badge-info">${item.kuesioner}</span></td>
        </tr>
    `).join('');
}
