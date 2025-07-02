// Ganti dengan URL Web App Google Apps Script Anda
const scriptURL = 'https://script.google.com/macros/s/AKfycbzQIH6WrrYa2y9sfxgw7_kujhmFgs9rCoSYbfTmmfSoJhr1aEvHmbvyjoTXPpvWXHxT/exec';

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === '12345') {
      showPage('dashboardPage');
    } else {
      document.getElementById('loginError').textContent = 'Login gagal';
    }
  });
}

function showPage(pageId) {
  document.querySelectorAll('body > div').forEach(el => el.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

function logout() {
  showPage('loginPage');
}

// Fetch Nama & Kelas
fetch(`${scriptURL}?action=getsiswa`)
  .then(res => res.json())
  .then(data => {
    const namaList = [document.getElementById('nama'), document.getElementById('namaNilai')];
    const kelasList = [document.getElementById('kelas'), document.getElementById('kelasNilai')];
    data.forEach(siswa => {
      namaList.forEach(namaSel => {
        if (namaSel) {
          const opt = document.createElement('option');
          opt.value = siswa.nama;
          opt.textContent = siswa.nama;
          namaSel.appendChild(opt);
        }
      });
      kelasList.forEach(kelasSel => {
        if (kelasSel && ![...kelasSel.options].some(o => o.value === siswa.kelas)) {
          const opt = document.createElement('option');
          opt.value = siswa.kelas;
          opt.textContent = siswa.kelas;
          kelasSel.appendChild(opt);
        }
      });
    });
  });

// Simpan Absensi
const absensiForm = document.getElementById('absensiForm');
if (absensiForm) {
  absensiForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      action: 'addAbsensi',
      bulan: document.getElementById('bulan').value,
      tanggal: document.getElementById('tanggal').value,
      nama: document.getElementById('nama').value,
      kelas: document.getElementById('kelas').value,
      mapel: document.getElementById('mapel').value,
      status: document.getElementById('status').value
    };
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.text()).then(alert);
  });
}

// Simpan Nilai
const nilaiForm = document.getElementById('nilaiForm');
if (nilaiForm) {
  nilaiForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      action: 'addNilai',
      bulan: document.getElementById('bulanNilai').value,
      nama: document.getElementById('namaNilai').value,
      kelas: document.getElementById('kelasNilai').value,
      mapel: document.getElementById('mapelNilai').value,
      jenis: document.getElementById('jenisNilai').value,
      ke: document.getElementById('keNilai').value,
      nilai: document.getElementById('nilai').value
    };
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.text()).then(alert);
  });
}
