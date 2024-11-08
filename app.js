// module
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const session = require('express-session'); // Import express-session
const multer = require('multer'); // Import Multer
const flash = require('express-flash');
const crypto = require('crypto');

const app = express();
app.use(session({
    secret: '1975bee3274df4f786c4c60fe54fcfa3', // Change this to a secret key
    resave: true,
    saveUninitialized: true
}));
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penilaian" 
});

db.connect(function(err) {
    if (err) throw err;
});


// APP GET & POST
app.get('/', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
queryUser = 'SELECT * FROM tb_user WHERE id = ?';
db.query(queryUser,[idUser], (err, resultsUser) => {
  if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
  }
  let userId = resultsUser[0].idUser;
  let typeUser = resultsUser[0].type;
  let queryidUser = '';
  if(typeUser=='admin'){
    queryidUser = 'SELECT * FROM tb_admin WHERE id_admin = ?'
  }else if(typeUser=='dosen'){
    queryidUser = 'SELECT * FROM tb_dosen WHERE nip = ?'
  }else if(typeUser=='mahasiswa'){
    queryidUser = 'SELECT * FROM tb_mahasiswa WHERE nim = ?'
  }
  db.query(queryidUser,[userId], (err, resultsIdUser) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    let nameUser = resultsIdUser[0].nama;
    req.session.nameUser = nameUser;
  req.session.userId = userId;
  req.session.typeUser = typeUser;
  const queryMahasiswa = 'SELECT COUNT(*) AS total FROM tb_mahasiswa';
  const queryDosen = 'SELECT COUNT(*) AS total FROM tb_dosen';
  const queryMk = 'SELECT COUNT(*) AS total FROM tb_mk';
  const queryUser = 'SELECT COUNT(*) AS total FROM tb_user';
  const queryMahasiswaSmt = 'SELECT smt FROM tb_mahasiswa';
  const queryMahasiswaProdi = 'SELECT prodi FROM tb_mahasiswa';
  const queryJadwal = "SELECT * FROM tb_mk ORDER BY SUBSTRING_INDEX(jadwal, '_', -1)";
  const querySksJadwal = `SELECT tb_mk.*, tb_krs.*
  FROM tb_mk
  JOIN tb_krs ON tb_mk.kode_mk = tb_krs.kode_mk
  WHERE tb_krs.nim = ? AND tb_krs.status = ?
  ORDER BY SUBSTRING_INDEX(tb_mk.jadwal, '_', -1);
  `;
  const queryDosenJadwal = `SELECT tb_mk.*, tb_krs_dosen.*
  FROM tb_mk
  JOIN tb_krs_dosen ON tb_mk.kode_mk = tb_krs_dosen.kode_mk
  WHERE tb_krs_dosen.nip = ?
  ORDER BY SUBSTRING_INDEX(tb_mk.jadwal, '_', -1);
  `;
  const querySksTotal = 'SELECT COUNT(*) AS total FROM tb_krs WHERE nim = ? AND status = ?';
  const querySksProgram = 'SELECT COUNT(*) AS total FROM tb_krs WHERE nim = ? AND status = ?';
  const queryDosenKrs = 'SELECT COUNT(*) AS total FROM tb_krs_dosen WHERE nip = ?';
  db.query(queryMahasiswa, (err, resultsMahasiswa) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }
      db.query(queryDosen, (err, resultsDosen) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(queryMk, (err, resultsMk) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }
          db.query(queryUser, (err, resultsUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            db.query(queryMahasiswaSmt, (err, resultsMahasiswaSmt) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                  return;
              }
              db.query(queryJadwal, (err, resultsJadwal) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                resultsJadwal.forEach(item => {
                  const [hari, waktu] = item.jadwal.split('_');
                  item.hari = hari;
                  item.waktu = waktu;
              });
      const totalMahasiswa = resultsMahasiswa[0].total;
      const totalDosen = resultsDosen[0].total;
      const totalMk = resultsMk[0].total;
      const totalUser = resultsUser[0].total;
      // Assuming results adalah array yang berisi objek-objek seperti yang Anda tunjukkan di atas

const semesterCounts = {};
resultsMahasiswaSmt.forEach(row => {
  const semester = row.smt;
  if (semesterCounts[semester]) {
    semesterCounts[semester]++;
  } else {
    semesterCounts[semester] = 1;
  }
});


let dataArray = Object.entries(semesterCounts);
let semesterArray = dataArray.map(item => item[1]);
db.query(querySksTotal,[userId,'Lulus'], (err, resultsSksTotal) => {
  if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
  }
  db.query(querySksProgram,[userId,'Tidak Lulus'], (err, resultsSksProgram) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    const SksTotal = resultsSksTotal[0].total;
  const SksProgram = resultsSksProgram[0].total;
  db.query(querySksJadwal,[userId,'Tidak Lulus'], (err, resultsSksJadwal) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    resultsSksJadwal.forEach(item => {
      const [hari, waktu] = item.jadwal.split('_');
      item.hari = hari;
      item.waktu = waktu;
  });
  db.query(queryDosenKrs,[userId], (err, resultsDosenKrs) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    const totalDosenKrs = resultsDosenKrs[0].total;
    db.query(queryDosenJadwal,[userId], (err, resultsDosenJadwal) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }
      resultsDosenJadwal.forEach(item => {
        const [hari, waktu] = item.jadwal.split('_');
        item.hari = hari;
        item.waktu = waktu;
    });
      res.render('index', { SksProgram, SksTotal,nameUser,userId,typeUser,totalMahasiswa,totalDosen,totalMk,totalUser, semesterArray, resultsJadwal,resultsSksJadwal,totalDosenKrs, resultsDosenJadwal  });
              });
            });
            });
            });
          });
        });
        });
          });
        });
          });
        });
      });
  });
});



// login system

app.get('/login', (req, res) => {
  const error = req.session.errLogin;
  req.session.errLogin = false; // Reset nilai error setelah itu digunakan
  res.render('login', { message: error });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Hash the provided password using MD5
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  // Query the database to check username and hashed password
  const query = "SELECT * FROM tb_user WHERE username = ? AND password = ?";
  db.query(query, [username, hashedPassword], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
          // Pengguna berhasil login, alihkan ke halaman lain
          req.session.idUser = results[0].id;
          req.session.errLogin = false;
          res.redirect('/'); // Ganti dengan rute dashboard atau halaman lainnya
         
      } else {
          // Login gagal, kembali ke halaman login dengan pesan kesalahan
          req.session.errLogin = true;
          res.redirect('login');
      }
  });
});

// login system



app.get('/logout', (req, res) => {
    // Lakukan proses logout di sini
    req.session.destroy(err => {
      if (err) {
        console.error('Gagal logout:', err);
      } else {
        res.redirect('/'); // Redirect pengguna ke halaman utama setelah logout
      }
    });
  });



  app.get('/mahasiswa', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_mahasiswa';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        let kode_prodi = results.map(mhs => mhs.prodi).join("','");

        if (!kode_prodi) {
            return res.render('mahasiswa', { nameUser,userId,typeUser,data: [] });
        }

        const prodiQuery = `SELECT kode_prodi, nama_prodi FROM tb_prodi WHERE kode_prodi IN ('${kode_prodi}')`;

        db.query(prodiQuery, (err, prodiResults) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            // Buat objek untuk memetakan kode_prodi ke nama_prodi
            const prodiMap = {};
            prodiResults.forEach(prodi => {
                prodiMap[prodi.kode_prodi] = prodi.nama_prodi;
            });

            // Gabungkan data dari tb_mahasiswa dan tb_prodi
            const data = results.map(mhs => {
                return {
                    ...mhs,
                    nama_prodi: prodiMap[mhs.prodi]
                };
            });

            res.render('mahasiswa', { nameUser,userId,typeUser,data: data }); // Render dengan data hasil gabungan
        });
    });
});



app.get('/biodata', (req, res) => {
  const idUser = req.session.idUser;
   if (!idUser) {
       return res.redirect('/login');
   }
   const nameUser = req.session.nameUser;
   const userId = req.session.userId;
   const typeUser = req.session.typeUser;
   let query = ``;
   console.log(userId)
   if(typeUser=='dosen'){
    query = `SELECT * FROM tb_dosen WHERE tb_dosen.nip = ?`
   }else if(typeUser=='mahasiswa'){
    query = `SELECT tb_mahasiswa.*, tb_prodi.nama_prodi
    FROM tb_mahasiswa
    JOIN tb_prodi ON tb_mahasiswa.prodi = tb_prodi.kode_prodi
    WHERE nim = ?;
    `
   }
 
   db.query(query,[userId], (err, results) => {
     if (err) throw err;
     const resultsBio = results[0];
     res.render('biodata', { nameUser,userId,typeUser,data: resultsBio });
   });
 });
app.get('/krs', (req, res) => {
 const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const query = `
    SELECT tb_mk.*, COUNT(tb_krs.kode_mk) as jml_krs
    FROM tb_mk
    LEFT JOIN tb_krs ON tb_mk.kode_mk = tb_krs.kode_mk
    GROUP BY tb_mk.kode_mk
    ORDER BY tb_mk.smt
  `;
  const queryMahasiswaKrs = `
  SELECT tb_mk.*, COUNT(tb_krs.kode_mk) as jml_krs
  FROM tb_mk
  LEFT JOIN tb_krs ON tb_mk.kode_mk = tb_krs.kode_mk
  WHERE nim = ? AND status = ?
  GROUP BY tb_mk.kode_mk
  ORDER BY tb_mk.smt 
  `;
  const queryDosenKrs = `
  SELECT tb_mk.*, COUNT(tb_krs_dosen.kode_mk) as jml_krs
  FROM tb_mk
  LEFT JOIN tb_krs_dosen ON tb_mk.kode_mk = tb_krs_dosen.kode_mk
  WHERE nip = ?
  GROUP BY tb_mk.kode_mk
  ORDER BY tb_mk.smt 
  `
  db.query(query, (err, results) => {
    if (err) throw err;
    db.query(queryMahasiswaKrs,[userId,'Tidak Lulus'], (err, resultsKrs) => {
      if (err) throw err;
      db.query(queryDosenKrs,[userId], (err, resultsKrsDosen) => {
        if (err) throw err;
    res.render('krs', { nameUser,userId,typeUser,data: results,dataKrsMahasiswa: resultsKrs,dataKrsDosen:resultsKrsDosen });
  });
});
});
});
app.get('/pencapaian/:id', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const { id } = req.params;

  const query = `
  SELECT tb_nilai.*,
  tb_aturan_penilaian.absensi AS absensiAturan,
  tb_aturan_penilaian.tugas AS tugasAturan,
  tb_aturan_penilaian.uts AS utsAturan,
  tb_aturan_penilaian.uas AS uasAturan
FROM tb_nilai
JOIN tb_aturan_penilaian ON tb_nilai.kode_mk = tb_aturan_penilaian.kode_mk
WHERE tb_nilai.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const nilai = results[0];
    const kode_MK = results[0].kode_mk;
    const nim = results[0].nim;
    
    const queryMhs = `
      SELECT * FROM tb_mahasiswa WHERE nim = ?
    `;

    db.query(queryMhs, [nim], (err, resultsMhs) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const mhs = resultsMhs[0];

      const queryCplMk = 'SELECT * FROM tb_cpl_mk WHERE kode_mk = ?';
      const queryCpmkMk = 'SELECT * FROM tb_cpmk_mk WHERE kode_mk = ?';
      const queryMk = 'SELECT * FROM tb_mk WHERE kode_mk = ?';
      const queryCplPl = 'SELECT * FROM tb_cpl_pl';
      const queryKRS = 'SELECT * FROM tb_krs WHERE kode_mk = ? AND nim = ?';
      const queryCPMK = 'SELECT * FROM tb_cpmk';
      const queryCPL = 'SELECT * FROM tb_cpl';
      const queryPL = 'SELECT * FROM tb_pl';
      db.query(queryCplMk, [kode_MK], (err, resultsCplMk) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        db.query(queryCpmkMk, [kode_MK], (err, resultsCpmkMk) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }
          db.query(queryCplPl, (err, resultsCplPl) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
          db.query(queryMk, [kode_MK], (err, resultsMk) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
            db.query(queryCPMK, (err, resultsCPMK) => {
              if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
              }
              db.query(queryKRS, [kode_MK,nim], (err, resultsKRS) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                  return;
                }
                db.query(queryCPL, (err, resultsCPL) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                  }
                  db.query(queryPL, (err, resultsPL) => {
                    if (err) {
                      console.error(err);
                      res.status(500).send('Internal Server Error');
                      return;
                    }
                const dataStatus = resultsKRS[0].status;
            const dataMk = resultsMk[0];
            
          res.render('pencapaian', { nameUser,userId,typeUser,nilai, mhs,dataStatus,dataCplPl:resultsCplPl,dataPL:resultsPL, dataCplMk: resultsCplMk, dataCpmkMk: resultsCpmkMk,dataCPMK : resultsCPMK, dataCPL : resultsCPL,dataMk });
        });
      });
      });
      });
      });
      });
    });
    });
  });
});
});




app.get('/penilaian', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const query = `
    SELECT tb_mk.*, COUNT(tb_nilai.kode_mk) as jml_penilaian
    FROM tb_mk
    LEFT JOIN tb_nilai ON tb_mk.kode_mk = tb_nilai.kode_mk
    GROUP BY tb_mk.kode_mk
    ORDER BY tb_mk.smt
  `;
  const queryDosen = `
  SELECT tb_mk.*, COUNT(tb_nilai.kode_mk) as jml_penilaian, tb_krs_dosen.*
  FROM tb_mk
  LEFT JOIN tb_nilai ON tb_mk.kode_mk = tb_nilai.kode_mk
  LEFT JOIN tb_krs_dosen ON tb_mk.kode_mk = tb_krs_dosen.kode_mk
  WHERE nip = ?
  GROUP BY tb_mk.kode_mk
  ORDER BY tb_mk.smt
`;



  db.query(query, (err, results) => {
    if (err) throw err;
    db.query(queryDosen,[userId], (err, resultsDosen) => {
      if (err) throw err;
      console.log(resultsDosen)
    res.render('penilaian', { nameUser,userId,typeUser,data: results,dataDosen: resultsDosen });
  });
});
});
app.get('/detail-penilaian/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
    return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kode_mk = req.params.kode_mk;
  const queryAkses = `
    SELECT * FROM akses_penilaian WHERE kode_mk = ?
  `;
  const query = `
    SELECT tb_krs.*, tb_mahasiswa.nama
    FROM tb_krs
    JOIN tb_mahasiswa ON tb_krs.nim = tb_mahasiswa.nim
    WHERE kode_mk = ?
  `;

  db.query(query, [kode_mk], (err, results) => {
    if (err) throw err;

    const queryMatkul = `
      SELECT * FROM tb_mk
      WHERE kode_mk = ?
    `;

    db.query(queryMatkul, [kode_mk], (err, matkul) => {
      if (err) throw err;

      const queryDosen = `
      SELECT tb_krs_dosen.*,tb_dosen.nama FROM tb_krs_dosen 
      JOIN tb_dosen ON tb_krs_dosen.nip = tb_dosen.nip
      WHERE kode_mk = ?
      `;

      db.query(queryDosen, [kode_mk], (err, dosen) => {
        if (err) throw err;
        db.query(queryAkses, [kode_mk], (err, resultsAkses) => {
          if (err) throw err;
        res.render('detail-penilaian', { nameUser,userId,typeUser,data: results, matkul: matkul[0], dosen,dataAkses: resultsAkses });
      });
    });
    });
  });
});
app.get('/detail-krs/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
    return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kode_mk = req.params.kode_mk;

  const query = `
    SELECT tb_krs.*, tb_mahasiswa.nama
    FROM tb_krs
    JOIN tb_mahasiswa ON tb_krs.nim = tb_mahasiswa.nim
    WHERE kode_mk = ?
  `;

  db.query(query, [kode_mk], (err, results) => {
    if (err) throw err;

    const queryMatkul = `
      SELECT * FROM tb_mk
      WHERE kode_mk = ?
    `;

    db.query(queryMatkul, [kode_mk], (err, matkul) => {
      if (err) throw err;

      const queryDosen = `
        SELECT tb_krs_dosen.*,tb_dosen.nama FROM tb_krs_dosen 
        JOIN tb_dosen ON tb_krs_dosen.nip = tb_dosen.nip
        WHERE kode_mk = ?
      `;

      db.query(queryDosen, [kode_mk], (err, dosen) => {
        if (err) throw err;

        res.render('detail-krs', { nameUser,userId,typeUser,data: results, matkul: matkul[0], dosen });
      });
    });
  });
});
app.get('/input-krs-dosen/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kode_mk = req.params.kode_mk;

  const queryMK = 'SELECT * FROM tb_mk WHERE kode_mk = ?';

  db.query(queryMK, [kode_mk], (errMK, resultsMK) => {
    if (errMK) throw errMK;

    const queryDosen = `
      SELECT * FROM tb_dosen ORDER BY nip
    `;

    db.query(queryDosen, (errDsn, resultsDsn) => {
      if (errDsn) throw errDsn;
      res.render('input-krs-dosen', { nameUser,userId,typeUser,mk: resultsMK, dosen: resultsDsn });
    });
  });
});
app.get('/input-krs/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kode_mk = req.params.kode_mk;

  const queryMK = 'SELECT * FROM tb_mk WHERE kode_mk = ?';

  db.query(queryMK, [kode_mk], (errMK, resultsMK) => {
    if (errMK) throw errMK;

    const smt = resultsMK[0].smt; // Perlu diambil dari hasil query

    const queryMahasiswa = `
      (SELECT * FROM tb_mahasiswa WHERE smt = ? ORDER BY nim)
      UNION ALL
      (SELECT * FROM tb_mahasiswa WHERE smt != ? ORDER BY nim)
    `;

    db.query(queryMahasiswa, [smt, smt], (errMhs, resultsMhs) => {
      if (errMhs) throw errMhs;
      const error = req.session.err;
      req.session.err = false;
      res.render('input-krs', { nameUser,userId,typeUser,mk: resultsMK, mhs: resultsMhs,message: error });
    });
  });
});







app.get('/admin', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const query = 'SELECT * FROM tb_admin';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('admin', { nameUser,userId,typeUser,data: results });
  });
});

  app.get('/pl', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_pl';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('pl', { nameUser,userId,typeUser,data: results });
    });
  });
  function combineDataCplPl(data) {
    const combinedDataCplPl = {};
    data.forEach(item => {
      if (!combinedDataCplPl[item.kode_cpl]) {
        combinedDataCplPl[item.kode_cpl] = [];
      }
      combinedDataCplPl[item.kode_cpl].push(item.kode_pl);
    });
  
    const mergedData = Object.keys(combinedDataCplPl).map(cpl => {
      return {
        kode_cpl: cpl,
        kode_pl: combinedDataCplPl[cpl].join(', ')
      };
    });
  
    return mergedData;
  }
  
  function combineDataBkCpl(data) {
    const combinedDataBkCpl = {};
    data.forEach(item => {
      if (!combinedDataBkCpl[item.kode_bk]) {
        combinedDataBkCpl[item.kode_bk] = [];
      }
      combinedDataBkCpl[item.kode_bk].push(item.kode_cpl);
    });
  
    const mergedData = Object.keys(combinedDataBkCpl).map(bk => {
      return {
        kode_bk: bk,
        kode_cpl: combinedDataBkCpl[bk]
      };
    });
  
    return mergedData;
  }
  function combineDataBkMk(data) {
    const combinedDataBkMk = {};
    data.forEach(item => {
        if (!combinedDataBkMk[item.kode_mk]) {
            combinedDataBkMk[item.kode_mk] = [];
        }
        combinedDataBkMk[item.kode_mk].push(item.kode_bk);
    });

    const mergedData = Object.keys(combinedDataBkMk).map(mk => {
        return {
            kode_mk: mk,
            kode_bk: combinedDataBkMk[mk].join(', ')
        };
    });

    return mergedData;
}
function combineDataCplMk(data) {
  const combinedDataCplMk = {};
  data.forEach(item => {
      if (!combinedDataCplMk[item.kode_mk]) {
          combinedDataCplMk[item.kode_mk] = [];
      }
      combinedDataCplMk[item.kode_mk].push(item.kode_cpl);
  });

  const mergedData = Object.keys(combinedDataCplMk).map(mk => {
      return {
          kode_mk: mk,
          kode_cpl: combinedDataCplMk[mk].join(', ')
      };
  });

  return mergedData;
}
function combineDataCpmkCpl(data) {
  const combinedDataCpmkCpl = {};
  data.forEach(item => {
      if (!combinedDataCpmkCpl[item.kode_cpl]) {
          combinedDataCpmkCpl[item.kode_cpl] = [];
      }
      combinedDataCpmkCpl[item.kode_cpl].push(item.kode_cpmk);
  });

  const mergedData = Object.keys(combinedDataCpmkCpl).map(cpl => {
      return {
          kode_cpl: cpl,
          kode_cpmk: combinedDataCpmkCpl[cpl].join(', ')
      };
  });

  return mergedData;
}
function combineDataCpmkMk(data) {
  const combinedDataCpmkMk = {};
  data.forEach(item => {
      if (!combinedDataCpmkMk[item.kode_mk]) {
          combinedDataCpmkMk[item.kode_mk] = [];
      }
      combinedDataCpmkMk[item.kode_mk].push(item.kode_cpmk);
  });

  const mergedData = Object.keys(combinedDataCpmkMk).map(mk => {
      return {
          kode_mk: mk,
          kode_cpmk: combinedDataCpmkMk[mk].join(', ')
      };
  });

  return mergedData;
}
  app.get('/epm', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
      return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_cpl';
    db.query(query, (err, resultsCpl) => {
      if (err) throw err;
      const query = 'SELECT * FROM tb_cpmk';
      db.query(query, (err, resultsCpmk) => {
        if (err) throw err;
      const query = 'SELECT * FROM tb_bk_cpl';
      db.query(query, (err, resultsBkCpl) => {
        if (err) throw err;
      const combinedDataBkCpl = combineDataBkCpl(resultsBkCpl);
      const query = 'SELECT * FROM tb_pl';
      db.query(query, (err, resultsPl) => {
        if (err) throw err;
        const query = 'SELECT * FROM tb_cpl_pl';
        db.query(query, (err, resultsCplPl) => {
          if (err) throw err;
        const combinedDataCplPl = combineDataCplPl(resultsCplPl);

        const query = 'SELECT * FROM tb_bk';
        db.query(query, (err, resultsBK) => {
          if (err) throw err;
          const query = 'SELECT * FROM tb_bk_mk';
          db.query(query, (err, resultsBkMk) => {
            if (err) throw err;
          const combinedDataBkMk = combineDataBkMk(resultsBkMk);

          const query = 'SELECT * FROM tb_cpl_mk';
          db.query(query, (err, resultsCplMk) => {
            if (err) throw err;
          const combinedDataCplMk = combineDataCplMk(resultsCplMk);
          const query = 'SELECT * FROM tb_cpmk_cpl';
          db.query(query, (err, resultsCpmkCpl) => {
            if (err) throw err;
          const combinedDataCpmkCpl = combineDataCpmkCpl(resultsCpmkCpl);
          const query = 'SELECT * FROM tb_cpmk_mk';
          db.query(query, (err, resultsCpmkMk) => {
            if (err) throw err;
          const combinedDataCpmkMk = combineDataCpmkMk(resultsCpmkMk);
    
      res.render('epm', { nameUser,userId,typeUser,databBkCpl: combinedDataBkCpl,dataCPL: resultsCpl,dataCPMK: resultsCpmk, dataPl: resultsPl,dataCplPl: combinedDataCplPl,
        dataBK: resultsBK, dataBkMk: combinedDataBkMk, dataCplMk: combinedDataCplMk, dataCpmkCpl: combinedDataCpmkCpl, dataCpmkMk: combinedDataCpmkMk});
      });
    });
    });
    });
          });    
        });
    });
      })
      });
    });
  });
  app.get('/prodi', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_prodi';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('prodi', { nameUser,userId,typeUser,data: results });
    });
  });

  app.get('/daftar-nilai', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
      return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
  
    const query = `
      SELECT tb_nilai.*,
             tb_aturan_penilaian.absensi AS absensiAturan,
             tb_aturan_penilaian.tugas AS tugasAturan,
             tb_aturan_penilaian.uts AS utsAturan,
             tb_aturan_penilaian.uas AS uasAturan
      FROM tb_nilai
      JOIN tb_aturan_penilaian ON tb_nilai.kode_mk = tb_aturan_penilaian.kode_mk
    `;
    const queryDosen = `
    SELECT tb_nilai.*,tb_krs_dosen.*,
           tb_aturan_penilaian.absensi AS absensiAturan,
           tb_aturan_penilaian.tugas AS tugasAturan,
           tb_aturan_penilaian.uts AS utsAturan,
           tb_aturan_penilaian.uas AS uasAturan
    FROM tb_nilai
    JOIN tb_aturan_penilaian ON tb_nilai.kode_mk = tb_aturan_penilaian.kode_mk
    JOIN tb_krs_dosen ON tb_nilai.kode_mk = tb_krs_dosen.kode_mk
    WHERE nip = ?
  `;
    const queryMahasiswa = `
      SELECT tb_nilai.*,
             tb_mk.nama_matkul,
             tb_mk.sks,
             tb_aturan_penilaian.absensi AS absensiAturan,
             tb_aturan_penilaian.tugas AS tugasAturan,
             tb_aturan_penilaian.uts AS utsAturan,
             tb_aturan_penilaian.uas AS uasAturan
      FROM tb_nilai
      JOIN tb_mk ON tb_nilai.kode_mk = tb_mk.kode_mk
      JOIN tb_aturan_penilaian ON tb_nilai.kode_mk = tb_aturan_penilaian.kode_mk
      WHERE nim = ?
    `;
    db.query(query, (err, results) => {
      if (err) throw err;
      db.query(queryMahasiswa,[userId], (err, resultsMahasiswa) => {
        if (err) throw err;
        db.query(queryDosen,[userId], (err, resultsDosen) => {
          if (err) throw err;
          console.log(resultsDosen)
      res.render('daftar-nilai', { nameUser, userId, typeUser, data: results,dataMahasiswa: resultsMahasiswa, dataDosen: resultsDosen});
    });
  });
  });
  });
  


  app.get('/bk', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_bk';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('bk', { nameUser,userId,typeUser,data: results });
    });
  });
  app.get('/cpl', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_cpl';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('cpl', { nameUser,userId,typeUser,data: results });
    });
  });
  app.get('/cpmk', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_cpmk';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('cpmk', { nameUser,userId,typeUser,data: results });
    });
  });

  app.get('/dosen', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const dosenQuery = 'SELECT * FROM tb_dosen';
    db.query(dosenQuery, (err, dosenResults) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

            res.render('dosen', {nameUser,userId,typeUser, data: dosenResults });
        });
    });








  app.get('/mata-kuliah', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = 'SELECT * FROM tb_mk';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('mata-kuliah', {nameUser,userId,typeUser, data: results });
    });
  });


  app.get('/pemetaan', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const query = `
      SELECT tb_bk.kode_bk, tb_cpl.kode_cpl, tb_mk.kode_mk
      FROM tb_bk
      JOIN tb_bk_cpl ON tb_bk.kode_bk = tb_bk_cpl.kode_bk
      JOIN tb_cpl ON tb_bk_cpl.kode_cpl = tb_cpl.kode_cpl
      JOIN tb_bk_mk ON tb_bk.kode_bk = tb_bk_mk.kode_bk
      JOIN tb_mk ON tb_bk_mk.kode_mk = tb_mk.kode_mk
    `;
    const query2 = `
    SELECT tb_cpmk.kode_cpmk, tb_cpl.kode_cpl, tb_mk.kode_mk
    FROM tb_cpmk
    JOIN tb_cpmk_cpl ON tb_cpmk.kode_cpmk = tb_cpmk_cpl.kode_cpmk
    JOIN tb_cpl ON tb_cpmk_cpl.kode_cpl = tb_cpl.kode_cpl
    JOIN tb_cpmk_mk ON tb_cpmk.kode_cpmk = tb_cpmk_mk.kode_cpmk
    JOIN tb_mk ON tb_cpmk_mk.kode_mk = tb_mk.kode_mk
  `;
  const queryMk = `SELECT kode_mk,smt FROM tb_mk`;
    db.query(query, (err, results) => {
      if (err) throw err;
  
      // Transform data
      const formattedData = {};
      results.forEach(result => {
        const { kode_bk, kode_cpl, kode_mk } = result;
        if (!formattedData[kode_cpl]) {
          formattedData[kode_cpl] = {};
        }
        if (!formattedData[kode_cpl][kode_bk]) {
          formattedData[kode_cpl][kode_bk] = [];
        }
        formattedData[kode_cpl][kode_bk].push(kode_mk);
      });
  
      // Get unique BK and CPL codes
      const uniqueBKCodes = [...new Set(results.map(item => item.kode_bk))];
      const uniqueCPLCodes = [...new Set(results.map(item => item.kode_cpl))];
  
      // Add all combinations to formattedData
      uniqueCPLCodes.forEach(cpl => {
        if (!formattedData[cpl]) {
          formattedData[cpl] = {};
        }
        uniqueBKCodes.forEach(bk => {
          if (!formattedData[cpl][bk]) {
            formattedData[cpl][bk] = [];
          }
        });
      });
  
      // Sort BK codes
      const sortedBKCodes = uniqueBKCodes.sort();
      db.query(query2, (err, results2) => {
        if (err) throw err;
    
        // Transform data
        const formattedData2 = {};
        results2.forEach(result => {
          const { kode_cpmk, kode_cpl, kode_mk } = result;
          if (!formattedData2[kode_cpl]) {
            formattedData2[kode_cpl] = {};
          }
          if (!formattedData2[kode_cpl][kode_cpmk]) {
            formattedData2[kode_cpl][kode_cpmk] = [];
          }
          formattedData2[kode_cpl][kode_cpmk].push(kode_mk);
        });
    
        // Get unique cpmk and CPL codes
        const uniqueCPMKCodes = [...new Set(results2.map(item => item.kode_cpmk))];
        const uniqueCPLCodes = [...new Set(results2.map(item => item.kode_cpl))];
    
        // Add all combinations to formattedData2
        uniqueCPLCodes.forEach(cpl => {
          if (!formattedData2[cpl]) {
            formattedData2[cpl] = {};
          }
          uniqueCPMKCodes.forEach(cpmk => {
            if (!formattedData2[cpl][cpmk]) {
              formattedData2[cpl][cpmk] = [];
            }
          });
        });
    
        // Sort BK codes
        const sortedCPMKCodes = uniqueCPMKCodes.sort();
        db.query(queryMk, (err, resultsMk) => {
          if (err) throw err;
        res.render('pemetaan', {nameUser,userId,typeUser, dataMk: resultsMk,data: formattedData, sortedBKCodes, data2: formattedData2, sortedCPMKCodes });
      });
    });
    });
  });
  app.get('/input-mahasiswa', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const queryProdi = 'SELECT * FROM tb_prodi';
    db.query(queryProdi, (err, resultsProdi) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const error = req.session.err;
      req.session.err = false;
    res.render('input-mahasiswa', { nameUser,userId,typeUser, prodi: resultsProdi,message: error });
    });
  });
// Mengambil data dari tabel tb_bk dan tb_cpl
app.get('/input-bk-cpl', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
   
  const queryBK = 'SELECT * FROM tb_bk';
  const queryCPL = 'SELECT * FROM tb_cpl';

  // Query untuk mendapatkan semua kode_bk yang sudah ada di tb_bk_cpl
  const queryExistingBK = 'SELECT DISTINCT kode_bk FROM tb_bk_cpl';

  db.query(queryBK, (errBK, resultsBK) => {
    if (errBK) throw errBK;
    db.query(queryCPL, (errCPL, resultsCPL) => {
      if (errCPL) throw errCPL;

      db.query(queryExistingBK, (errExistingBK, resultsExistingBK) => {
        if (errExistingBK) throw errExistingBK;

        // Mengubah hasil query menjadi array kode_bk yang sudah ada
        const existingBKArray = resultsExistingBK.map(item => item.kode_bk);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-bk-cpl', { 
          nameUser,userId,typeUser,
          bkOptions: resultsBK, 
          cplOptions: resultsCPL,
          existingBKArray: existingBKArray, message: error
        });
      });
    });
  });
});

app.get('/input-cpl-pl', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;

  const queryCPL = 'SELECT * FROM tb_cpl';
  const queryPL = 'SELECT * FROM tb_pl';

  // Query untuk mendapatkan semua kode_CPL yang sudah ada di tb_CPL_PL
  const queryExistingCPL = 'SELECT DISTINCT kode_cpl FROM tb_cpl_pl';

  db.query(queryCPL, (errCPL, resultsCPL) => {
    if (errCPL) throw errCPL;
    db.query(queryPL, (errPL, resultsPL) => {
      if (errPL) throw errPL;

      db.query(queryExistingCPL, (errExistingCPL, resultsExistingCPL) => {
        if (errExistingCPL) throw errExistingCPL;

        // Mengubah hasil query menjadi array kode_CPL yang sudah ada
        const existingCPLArray = resultsExistingCPL.map(item => item.kode_CPL);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-cpl-pl', { 
          nameUser,userId,typeUser,
          cplOptions: resultsCPL, 
          plOptions: resultsPL, 
          existingCPLArray: existingCPLArray, message: error
        });
      });
    });
  });
});
app.get('/input-bk-mk', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
  const queryMK = 'SELECT * FROM tb_mk';
  const queryBK = 'SELECT * FROM tb_bk';

  // Query untuk mendapatkan semua kode_MK yang sudah ada di tb_MK_BK
  const queryExistingMK = 'SELECT DISTINCT kode_mk FROM tb_bk_mk';

  db.query(queryMK, (errMK, resultsMK) => {
    if (errMK) throw errMK;
    db.query(queryBK, (errBK, resultsBK) => {
      if (errBK) throw errBK;

      db.query(queryExistingMK, (errExistingMK, resultsExistingMK) => {
        if (errExistingMK) throw errExistingMK;

        // Mengubah hasil query menjadi array kode_MK yang sudah ada
        const existingMKArray = resultsExistingMK.map(item => item.kode_MK);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-bk-mk', { 
          nameUser,userId,typeUser,
          mkOptions: resultsMK, 
          bkOptions: resultsBK,
          existingMKArray: existingMKArray, message: error
        });
      });
    });
  });
});
app.get('/input-cpl-mk', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
  const queryMK = 'SELECT * FROM tb_mk';
  const queryCPL = 'SELECT * FROM tb_cpl';

  // Query untuk mendapatkan semua kode_MK yang sudah ada di tb_MK_CPL
  const queryExistingMK = 'SELECT DISTINCT kode_mk FROM tb_cpl_mk';

  db.query(queryMK, (errMK, resultsMK) => {
    if (errMK) throw errMK;
    db.query(queryCPL, (errCPL, resultsCPL) => {
      if (errCPL) throw errCPL;

      db.query(queryExistingMK, (errExistingMK, resultsExistingMK) => {
        if (errExistingMK) throw errExistingMK;

        // Mengubah hasil query menjadi array kode_MK yang sudah ada
        const existingMKArray = resultsExistingMK.map(item => item.kode_MK);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-cpl-mk', { 
          nameUser,userId,typeUser,
          mkOptions: resultsMK, 
          cplOptions: resultsCPL,
          existingMKArray: existingMKArray, message: error
        });
      });
    });
  });
});


app.get('/input-cpmk-cpl', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
  const queryCPL = 'SELECT * FROM tb_cpl';
  const queryCPMK = 'SELECT * FROM tb_cpmk';

  // Query untuk mendapatkan semua kode_CPL yang sudah ada di tb_CPL_CPMK
  const queryExistingCPL = 'SELECT DISTINCT kode_cpl FROM tb_cpmk_cpl';

  db.query(queryCPL, (errCPL, resultsCPL) => {
    if (errCPL) throw errCPL;
    db.query(queryCPMK, (errCPMK, resultsCPMK) => {
      if (errCPMK) throw errCPMK;

      db.query(queryExistingCPL, (errExistingCPL, resultsExistingCPL) => {
        if (errExistingCPL) throw errExistingCPL;

        // Mengubah hasil query menjadi array kode_CPL yang sudah ada
        const existingCPLArray = resultsExistingCPL.map(item => item.kode_CPL);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-cpmk-cpl', { 
          nameUser,userId,typeUser,
          cplOptions: resultsCPL, 
          cpmkOptions: resultsCPMK,
          existingCPLArray: existingCPLArray, message: error
        });
      });
    });
  });
});
app.get('/input-cpmk-mk', (req, res) => {
  const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
     const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
  const queryMK = 'SELECT * FROM tb_mk';
  const queryCPMK = 'SELECT * FROM tb_cpmk';

  // Query untuk mendapatkan semua kode_MK yang sudah ada di tb_MK_CPMK
  const queryExistingMK = 'SELECT DISTINCT kode_mk FROM tb_cpmk_mk';

  db.query(queryMK, (errMK, resultsMK) => {
    if (errMK) throw errMK;
    db.query(queryCPMK, (errCPMK, resultsCPMK) => {
      if (errCPMK) throw errCPMK;

      db.query(queryExistingMK, (errExistingMK, resultsExistingMK) => {
        if (errExistingMK) throw errExistingMK;

        // Mengubah hasil query menjadi array kode_MK yang sudah ada
        const existingMKArray = resultsExistingMK.map(item => item.kode_MK);
        const error = req.session.err;
        req.session.err = false;
        res.render('input-cpmk-mk', { 
          nameUser,userId,typeUser,
          mkOptions: resultsMK, 
          cpmkOptions: resultsCPMK,
          existingMKArray: existingMKArray, message: error
        });
      });
    });
  });
});

  app.get('/input-pl', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const error = req.session.err;
    req.session.err = false;
    res.render('input-pl',{nameUser,userId,typeUser,message: error});
  });
  app.get('/input-prodi', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const error = req.session.err;
    req.session.err = false;
    res.render('input-prodi',{nameUser,userId,typeUser,message:error});
  });
    app.get('/input-cpl', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const error = req.session.err;
    req.session.err = false;
    res.render('input-cpl',{nameUser,userId,typeUser,message: error});
  });
  app.get('/input-cpmk', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const error = req.session.err;
    req.session.err = false;
    res.render('input-cpmk',{nameUser,userId,typeUser,message: error});
  });

  app.get('/input-bk', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const error = req.session.err;
    req.session.err = false;
    res.render('input-bk',{nameUser,userId,typeUser,message: error});
  });

  app.get('/input-dosen', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    // Query SQL untuk mendapatkan data nama_matkul dari tb_mk
    const query = 'SELECT * FROM tb_mk';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Mengirim data nama_matkul ke halaman input-dosen
        const errorNip = req.session.errNipDuplicate;
      req.session.errNipDuplicate = false;
        res.render('input-dosen', { nameUser,userId,typeUser,mk: results,message: errorNip });
    });
});




  app.get('/input-matakuliah', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const errorMk = req.session.errMkDuplicate;
    req.session.errMkDuplicate = false;
    const errorAturan = req.session.errAturan;
    req.session.errAturan = false;
    res.render('input-matakuliah',{nameUser,userId,typeUser,message: errorMk,messageAturan: errorAturan});
  });
  app.get('/input-nilai/:kode_mk/:nim', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const { kode_mk, nim } = req.params;

    // const queryCplMk = 'SELECT * FROM tb_cpl_mk WHERE kode_mk = ?';
    // const queryCpmkMk = 'SELECT * FROM tb_cpmk_mk WHERE kode_mk = ?';

    const queryMahasiswa = `
        SELECT * FROM tb_mahasiswa WHERE nim = ?
    `;
    const queryMk = `
        SELECT * FROM tb_mk WHERE kode_mk = ?
    `;
    const queryAturan = `
        SELECT * FROM tb_aturan_penilaian WHERE kode_mk = ?
    `;
    // db.query(queryCpmkMk, [kode_mk], (err, resultsCpmkMk) => {
    //     if (err) throw err;

    //     // Dapatkan semua kode_cpmk
    //     const kode_cpmks = resultsCpmkMk.map(result => result.kode_cpmk);

    //     // Jalankan query untuk setiap kode_cpmk
    //     const promises = kode_cpmks.map(kode_cpmk => {
    //         return new Promise((resolve, reject) => {
    //             db.query(queryCplMk, [kode_mk], (err, resultsCplMk) => {
    //                 if (err) reject(err);
    //                 resolve({ kode_cpmk, resultsCplMk });
    //             });
    //         });
    //     });

    //     Promise.all(promises)
    //         .then(dataCplMkArray => {
                db.query(queryMk, [kode_mk], (err, resultsMk) => {
                    if (err) throw err;
                    db.query(queryMahasiswa, [nim], (err, resultsMahasiswa) => {
                      if (err) throw err;
                      db.query(queryAturan, [kode_mk], (err, resultsAturan) => {
                        if (err) throw err;
                        const error = req.session.err;
                        req.session.err = false;
                    res.render('input-nilai', {
                      nameUser,userId,typeUser,
                        kode_mk,
                        nim,
                        dataMk : resultsMk[0],
                        dataMahasiswa: resultsMahasiswa[0],
                        dataAturan: resultsAturan[0],
                        message: error
                    });
                    });
                });
            });
          })
//     });
// });


app.get('/edit-nilai/:id', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const { id } = req.params;

  const queryNilai = `
      SELECT * FROM tb_nilai WHERE id = ?
  `;
  const queryAturan = `
      SELECT * FROM tb_aturan_penilaian WHERE kode_mk = ?
  `;

                  db.query(queryNilai, [id], (err, resultsNilai) => {
                    if (err) throw err;
                    let kode_mk = resultsNilai[0].kode_mk;
                    db.query(queryAturan, [kode_mk], (err, resultsAturan) => {
                      if (err) throw err;
                  res.render('edit-nilai', {
                    nameUser,userId,typeUser,
                      dataNilai: resultsNilai[0],
                      dataAturan: resultsAturan[0]
                  });
                  });
              });
          });


  

  app.get('/delete-mahasiswa/:nim', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const nim = req.params.nim;
    // Query SQL untuk menghapus mahasiswa dengan NIM tertentu
    const query = 'DELETE FROM tb_mahasiswa WHERE nim = ?';
    const queryUser = 'DELETE FROM tb_user WHERE idUser = ?';
    db.query(query, [nim], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(queryUser, [nim], (err, resultsUser) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }

        res.redirect('/mahasiswa'); // Redirect ke halaman mahasiswa setelah penghapusan berhasil
    });
  });
});
app.get('/delete-krs/:nim/:kode_mk', (req, res) => {
  const nim = req.params.nim;
  const kode_mk = req.params.kode_mk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus data KRS dengan NIM dan kode_mk tertentu
  const deleteQuery = 'DELETE FROM tb_krs WHERE nim = ? AND kode_mk = ?';
  db.query(deleteQuery, [nim, kode_mk], (err, deleteResult) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Setelah penghapusan berhasil, ambil data KRS terbaru untuk kode_mk tersebut
    const selectQuery = `
      SELECT tb_krs.*, tb_mahasiswa.nama
      FROM tb_krs
      JOIN tb_mahasiswa ON tb_krs.nim = tb_mahasiswa.nim
      WHERE kode_mk = ?
    `;

    db.query(selectQuery, [kode_mk], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const queryMatkul = `
        SELECT * FROM tb_mk
        WHERE kode_mk = ?
      `;

      db.query(queryMatkul, [kode_mk], (err, matkul) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const queryDosen = `
        SELECT tb_krs_dosen.*,tb_dosen.nama FROM tb_krs_dosen 
        JOIN tb_dosen ON tb_krs_dosen.nip = tb_dosen.nip
        WHERE kode_mk = ?
        `;

        db.query(queryDosen, [kode_mk], (err, dosen) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }

          res.redirect(`/detail-krs/${kode_mk}`);
        });
      });
    });
  });
});

app.get('/delete-krs-dosen/:nip/:kode_mk', (req, res) => {
  const nip = req.params.nip;
  const kode_mk = req.params.kode_mk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus data KRS dengan nip dan kode_mk tertentu
  const deleteQuery = 'DELETE FROM tb_krs_dosen WHERE nip = ? AND kode_mk = ?';
  db.query(deleteQuery, [nip, kode_mk], (err, deleteResult) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Setelah penghapusan berhasil, ambil data KRS terbaru untuk kode_mk tersebut
    const selectQuery = `
      SELECT tb_krs.*, tb_mahasiswa.nama
      FROM tb_krs
      JOIN tb_mahasiswa ON tb_krs.nim = tb_mahasiswa.nim
      WHERE kode_mk = ?
    `;

    db.query(selectQuery, [kode_mk], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const queryMatkul = `
        SELECT * FROM tb_mk
        WHERE kode_mk = ?
      `;

      db.query(queryMatkul, [kode_mk], (err, matkul) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const queryDosen = `
        SELECT tb_krs_dosen.*,tb_dosen.nama FROM tb_krs_dosen 
        JOIN tb_dosen ON tb_krs_dosen.nip = tb_dosen.nip
        WHERE kode_mk = ?
        `;

        db.query(queryDosen, [kode_mk], (err, dosen) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }

          res.redirect(`/detail-krs/${kode_mk}`);
        });
      });
    });
  });
});


app.get('/delete-pl/:kode_pl', (req, res) => {
  const kode_pl = req.params.kode_pl;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus pl dengan kode_pl tertentu
  const query = 'DELETE FROM tb_pl WHERE kode_pl = ?';
  db.query(query, [kode_pl], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.redirect('/pl'); // Redirect ke halaman pl setelah penghapusan berhasil
  });
});
app.get('/delete-prodi/:kode_prodi', (req, res) => {
  const kode_prodi = req.params.kode_prodi;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus prodi dengan kode_prodi tertentu
  const query = 'DELETE FROM tb_prodi WHERE kode_prodi = ?';
  db.query(query, [kode_prodi], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.redirect('/prodi'); // Redirect ke halaman prodi setelah penghapusan berhasil
  });
});
app.get('/delete-bk/:kode_bk', (req, res) => {
  const kode_bk = req.params.kode_bk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus bk dengan kode_bk tertentu
  const query = 'DELETE FROM tb_bk WHERE kode_bk = ?';
  db.query(query, [kode_bk], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.redirect('/bk'); // Redirect ke halaman pl setelah penghapusan berhasil
  });
});
app.get('/delete-cpl/:kode_cpl', (req, res) => {
  const kode_cpl = req.params.kode_cpl;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus cpl dengan kode_cpl tertentu
  const query = 'DELETE FROM tb_cpl WHERE kode_cpl = ?';
  db.query(query, [kode_cpl], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.redirect('/cpl'); // Redirect ke halaman pl setelah penghapusan berhasil
  });
});
app.get('/delete-cpmk/:kode_cpmk', (req, res) => {
  const kode_cpmk = req.params.kode_cpmk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus cpmk dengan kode_cpmk tertentu
  const query = 'DELETE FROM tb_cpmk WHERE kode_cpmk = ?';
  db.query(query, [kode_cpmk], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.redirect('/cpmk'); // Redirect ke halaman pl setelah penghapusan berhasil
  });
});
app.get('/delete-dosen/:nip', (req, res) => {
  const nip = req.params.nip;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus mahasiswa dengan nip tertentu
  const query = 'DELETE FROM tb_dosen WHERE nip = ?';
  const queryUser = 'DELETE FROM tb_user WHERE idUser = ?';
  db.query(query, [nip], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }
      db.query(queryUser, [nip], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

      res.redirect('/dosen'); // Redirect ke halaman mahasiswa setelah penghapusan berhasil
  });
});
});
app.get('/delete-bkcpl/:kode_bk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kodeBK = req.params.kode_bk;
  const query = 'DELETE FROM tb_bk_cpl WHERE kode_bk = ?';

  db.query(query, [kodeBK], (err, results) => {
    if (err) throw err;
    res.redirect('/epm'); // Redirect ke halaman setelah penghapusan
  });
});

app.get('/delete-cplpl/:kode_cpl', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kodeCPL = req.params.kode_cpl;
  const query = 'DELETE FROM tb_cpl_pl WHERE kode_cpl = ?';

  db.query(query, [kodeCPL], (err, results) => {
    if (err) throw err;
    res.redirect('/epm'); // Redirect ke halaman setelah penghapusan
  });
});
app.get('/delete-bkmk/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kodeMK = req.params.kode_mk;
  const query = 'DELETE FROM tb_bk_mk WHERE kode_mk = ?';

  db.query(query, [kodeMK], (err, results) => {
    if (err) throw err;
    res.redirect('/epm'); // Redirect ke halaman setelah penghapusan
  });
});

app.get('/delete-cplmk/:kode_mk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kodeMK = req.params.kode_mk;
  const query = 'DELETE FROM tb_cpl_mk WHERE kode_mk = ?';

  db.query(query, [kodeMK], (err, results) => {
    if (err) throw err;
    res.redirect('/epm'); // Redirect ke halaman setelah penghapusan
  });
});
app.get('/delete-cpmkcpl/:kode_cpl', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const kodeCPL = req.params.kode_cpl;
  const query = 'DELETE FROM tb_cpmk_cpl WHERE kode_cpl = ?';

  db.query(query, [kodeCPL], (err, results) => {
    if (err) throw err;
    res.redirect('/epm'); // Redirect ke halaman setelah penghapusan
  });
});
app.get('/edit-matakuliah/:kode_mk', (req, res) => {
  const kode_mk = req.params.kode_mk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data mahasiswa dengan kode_mk tertentu
  const query = 'SELECT * FROM tb_mk WHERE kode_mk = ?';
  db.query(query, [kode_mk], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const queryAturan = 'SELECT * FROM tb_aturan_penilaian WHERE kode_mk = ?';
    db.query(queryAturan, [kode_mk], (err, resultsAturan) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
   
      const errorAturan = req.session.errAturan;
      req.session.errAturan = false;
    res.render('edit-matakuliah', { nameUser,userId,typeUser,matakuliah: results[0], aturan: resultsAturan[0],messageAturan: errorAturan });
    });
  });
});


app.get('/edit-pl/:kode_pl', (req, res) => {
  const kode_pl = req.params.kode_pl;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data mahasiswa dengan kode_pl tertentu
  const query = 'SELECT * FROM tb_pl WHERE kode_pl = ?';
  db.query(query, [kode_pl], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render halaman edit dengan data mahasiswa
    res.render('edit-pl', { nameUser,userId,typeUser,pl: results[0] });
  });
});
app.get('/edit-prodi/:kode_prodi', (req, res) => {
  const kode_prodi = req.params.kode_prodi;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data mahasiswa dengan kode_prodi tertentu
  const query = 'SELECT * FROM tb_prodi WHERE kode_prodi = ?';
  db.query(query, [kode_prodi], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render halaman edit dengan data mahasiswa
    res.render('edit-prodi', { nameUser,userId,typeUser,prodi: results[0] });
  });
});
app.get('/edit-cpl/:kode_cpl', (req, res) => {
  const kode_cpl = req.params.kode_cpl;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data mahasiswa dengan kode_cpl tertentu
  const query = 'SELECT * FROM tb_cpl WHERE kode_cpl = ?';
  db.query(query, [kode_cpl], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render halaman edit dengan data mahasiswa
    res.render('edit-cpl', { nameUser,userId,typeUser,cpl: results[0] });
  });
});
app.get('/edit-bk/:kode_bk', (req, res) => {
  const kode_bk = req.params.kode_bk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data mahasiswa dengan kode_bk tertentu
  const query = 'SELECT * FROM tb_bk WHERE kode_bk = ?';
  db.query(query, [kode_bk], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render halaman edit dengan data mahasiswa
    res.render('edit-bk', { nameUser,userId,typeUser,bk: results[0] });
  });
});

app.get('/delete-matakuliah/:kode_mk', (req, res) => {
  const kode_mk = req.params.kode_mk;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk menghapus matakuliah dengan NIM tertentu
  const query = 'DELETE FROM tb_mk WHERE kode_mk = ?';
  db.query(query, [kode_mk], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }
      const query = 'DELETE FROM tb_aturan_penilaian WHERE kode_mk = ?';
      db.query(query, [kode_mk], (err, results) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }

      res.redirect('/mata-kuliah'); // Redirect ke halaman matakuliah setelah penghapusan berhasil
        });
  });
});

app.get('/delete-nilai/:id', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  const { id } = req.params;

  // Step 1: Get the kode_mk and nim for the deleted record
  const getRecordQuery = `
      SELECT kode_mk, nim FROM tb_nilai WHERE id = ?
  `;

  db.query(getRecordQuery, [id], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      const { kode_mk, nim } = results[0];

      // Step 2: Delete the record from tb_nilai
      const deleteQuery = `
          DELETE FROM tb_nilai WHERE id = ?
      `;

      db.query(deleteQuery, [id], (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }

          // Step 3: Update tb_krs status to 'Tidak Lulus'
          const updateKrsQuery = `
              UPDATE tb_krs SET status = 'Tidak Lulus'
              WHERE kode_mk = ? AND nim = ?
          `;

          db.query(updateKrsQuery, [kode_mk, nim], (err, result) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
                  return;
              }

              res.redirect(`/daftar-nilai`);
          });
      });
  });
});


// GET request untuk halaman edit
app.get('/edit-dosen/:nip', (req, res) => {
  const nip = req.params.nip;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan data dosen dengan nip tertentu
  const queryDosen = 'SELECT * FROM tb_dosen WHERE nip = ?';
  db.query(queryDosen, [nip], (err, resultsDosen) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

      // Render halaman edit dengan data dosen dan mata kuliah
      res.render('edit-dosen', { nameUser,userId,typeUser,dosen: resultsDosen[0]});

    });
  });


app.get('/edit-mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    // Query SQL untuk mendapatkan data mahasiswa dengan nim tertentu
    const query = 'SELECT * FROM tb_mahasiswa WHERE nim = ?';
    db.query(query, [nim], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const queryProdi = 'SELECT * FROM tb_prodi';
      db.query(queryProdi, (err, resultsProdi) => {
        if (err) throw err;
      // Render halaman edit dengan data mahasiswa
      res.render('edit-mahasiswa', { nameUser,userId,typeUser,mahasiswa: results[0], data: resultsProdi });
  });
    });
  });
  
  app.get('/detail-mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    // Query SQL untuk mendapatkan detail mahasiswa berdasarkan NIM
    const query = 'SELECT * FROM tb_mahasiswa WHERE nim = ?';
    db.query(query, [nim], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            const mahasiswa = results[0];
            res.render('detail-mahasiswa', { nameUser,userId,typeUser,mahasiswa });
        } else {
            res.status(404).send('Mahasiswa tidak ditemukan');
        }
    });
});

app.get('/detail-dosen/:nip', (req, res) => {
  const nip = req.params.nip;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const nameUser = req.session.nameUser;
  const userId = req.session.userId;
  const typeUser = req.session.typeUser;
  // Query SQL untuk mendapatkan detail dosen berdasarkan nip
  const query = 'SELECT * FROM tb_dosen WHERE nip = ?';
  db.query(query, [nip], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      const dosen = results[0];

        res.render('detail-dosen', { nameUser,userId,typeUser,dosen });
      
    } else {
      res.status(404).send('Dosen tidak ditemukan');
    }
  });
});

  

//   APP POST


app.post('/input-mahasiswa', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
    return res.redirect('/login');
  }
  const nim = req.body.nim;
  const nama = req.body.nama;
  const jenis_kelamin = req.body.jenis_kelamin;
  const tempat_lahir = req.body.tempat_lahir;
  const tanggal_lahir = req.body.tanggal_lahir;
  const alamat = req.body.alamat;
  const email = req.body.email;
  const no_tlp = req.body.no_tlp;
  const prodi = req.body.prodi;
  const smt = req.body.smt;
  
  const query = 'INSERT INTO tb_mahasiswa (nim, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, email, no_tlp, prodi, smt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nim, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, email, no_tlp, prodi, smt], (err, results) => {
    if (err) {
      req.session.err = true;
     return res.redirect('/input-mahasiswa');
    }
    // Tambahkan data ke tb_user
    const username = nim;
    const password = require('crypto').createHash('md5').update(nim).digest('hex'); // menghasilkan hash md5 dari nim
    const type = 'mahasiswa';
    
    const userQuery = 'INSERT INTO tb_user (username, password, type, idUser) VALUES (?, ?, ?, ?)';
    
    db.query(userQuery, [username, password, type, nim], (userErr, userResults) => {
      if (userErr) throw userErr;
      res.redirect('/mahasiswa');
    });
  });
});

  
app.post('/input-dosen', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
    return res.redirect('/login');
  }
  const { nip, nama, alamat, no_tlp } = req.body;

  // Query SQL untuk menyimpan data dosen ke tabel tb_dosen
  const query = 'INSERT INTO tb_dosen (nip, nama, alamat, no_telp) VALUES (?, ?, ?, ?)';
  db.query(query, [nip, nama, alamat, no_tlp], (err, results) => {
    if (err) {
      req.session.errNipDuplicate = true;
      res.redirect('/input-dosen');
      return;
    }

    // Tambahkan data ke tb_user
    const username = nip;
    const password = require('crypto').createHash('md5').update(nip).digest('hex'); // menghasilkan hash md5 dari nip
    const type = 'dosen';

    const userQuery = 'INSERT INTO tb_user (username, password, type, idUser) VALUES (?, ?, ?, ?)';

    db.query(userQuery, [username, password, type, nip], (userErr, userResults) => {
      if (userErr) throw userErr;
      res.redirect('/dosen');
    });
  });
});

app.post('/input-bk-cpl', (req, res) => {
  const kodeBK = req.body.bk;
  const kodeCPL = req.body.cpl;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_bk_cpl WHERE kode_bk = '${kodeBK}' AND kode_cpl = '${kodeCPL}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai

          req.session.err = true;
          res.redirect('/input-bk-cpl');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_bk_cpl (kode_bk, kode_cpl) VALUES ('${kodeBK}', '${kodeCPL}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                throw err;
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});

app.post('/input-cpl-pl', (req, res) => {
  const kodeCPL = req.body.cpl;
  const kodePL = req.body.pl;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_cpl_pl WHERE kode_cpl = '${kodeCPL}' AND kode_pl = '${kodePL}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai
          req.session.err = true;
          res.redirect('/input-cpl-pl');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_cpl_pl (kode_cpl, kode_pl) VALUES ('${kodeCPL}', '${kodePL}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                  throw err;
                  // Atau lakukan penanganan error sesuai kebutuhan Anda
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});
app.post('/input-bk-mk', (req, res) => {
  const kodeMK = req.body.mk;
  const kodeBK = req.body.bk;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_bk_mk WHERE kode_mk = '${kodeMK}' AND kode_bk = '${kodeBK}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai
          req.session.err = true;
          res.redirect('/input-bk-mk');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_bk_mk (kode_mk, kode_bk) VALUES ('${kodeMK}', '${kodeBK}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                  throw err;
                  // Atau lakukan penanganan error sesuai kebutuhan Anda
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});

app.post('/input-cpl-mk', (req, res) => {
  const kodeMK = req.body.mk;
  const kodeCPL = req.body.cpl;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_cpl_mk WHERE kode_mk = '${kodeMK}' AND kode_cpl = '${kodeCPL}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai
          req.session.err = true;
          res.redirect('/input-cpl-mk');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_cpl_mk (kode_mk, kode_cpl) VALUES ('${kodeMK}', '${kodeCPL}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                  throw err;
                  // Atau lakukan penanganan error sesuai kebutuhan Anda
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});
app.post('/input-cpmk-cpl', (req, res) => {
  const kodeCPL = req.body.cpl;
  const kodeCPMK = req.body.cpmk;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_cpmk_cpl WHERE kode_cpl = '${kodeCPL}' AND kode_cpmk = '${kodeCPMK}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai
          req.session.err = true;
          res.redirect('/input-cpmk-cpl');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_cpmk_cpl (kode_cpl, kode_cpmk) VALUES ('${kodeCPL}', '${kodeCPMK}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                  throw err;
                  // Atau lakukan penanganan error sesuai kebutuhan Anda
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});

app.post('/input-cpmk-mk', (req, res) => {
  const kodeMK = req.body.mk;
  const kodeCPMK = req.body.cpmk;

  // Lakukan validasi atau manipulasi data sesuai kebutuhan Anda

  const checkQuery = `SELECT * FROM tb_cpmk_MK WHERE kode_mk = '${kodeMK}' AND kode_cpmk = '${kodeCPMK}'`;

  db.query(checkQuery, (err, results) => {
      if (err) {
          throw err;
          // Atau lakukan penanganan error sesuai kebutuhan Anda
      }

      if (results.length > 0) {
          // Data sudah ada dalam tabel, berikan notifikasi atau pesan yang sesuai
          req.session.err = true;
          res.redirect('/input-cpmk-mk');
      } else {
          // Data belum ada dalam tabel, lanjutkan dengan operasi INSERT
          const insertQuery = `INSERT INTO tb_cpmk_mk (kode_mk, kode_cpmk) VALUES ('${kodeMK}', '${kodeCPMK}')`;

          db.query(insertQuery, (err, result) => {
              if (err) {
                  throw err;
                  // Atau lakukan penanganan error sesuai kebutuhan Anda
              }

              console.log("Data berhasil disimpan!");
              res.redirect('/epm'); // Ganti 'halaman-tujuan' dengan halaman tujuan Anda
          });
      }
  });
});


app.post('/input-pl', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const kode_pl = req.body.kode_pl;
  const profil_lulus = req.body.profil_lulus;

  // Query SQL untuk menyimpan data pl
  const query = 'INSERT INTO tb_pl (kode_pl, profil_lulus) VALUES (?, ?)';
  db.query(query, [kode_pl, profil_lulus,], (err, results) => {
    if (err) {
      req.session.err = true;
     return res.redirect('/input-pl');
    }

    res.redirect('pl'); // Redirect ke halaman pl setelah penyimpanan berhasil
  });
});
app.post('/input-prodi', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const kode_prodi = req.body.kode_prodi;
  const prodi = req.body.prodi;

  // Query SQL untuk menyimpan data prodi
  const query = 'INSERT INTO tb_prodi (kode_prodi, nama_prodi) VALUES (?, ?)';
  db.query(query, [kode_prodi, prodi,], (err, results) => {
    if (err) {
      req.session.err = true;
     return res.redirect('/input-prodi');
    }

    res.redirect('prodi'); // Redirect ke halaman pl setelah penyimpanan berhasil
  });
});
app.post('/input-bk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const kode_bk = req.body.kode_bk;
  const bahan_kajian = req.body.bahan_kajian;
  const reference = req.body.reference;

  // Query SQL untuk menyimpan data bk
  const query = 'INSERT INTO tb_bk (kode_bk, bahan_kajian,reference) VALUES (?, ?, ?)';
  db.query(query, [kode_bk, bahan_kajian,reference], (err, results) => {
    if (err) {
      req.session.err = true;
      return res.redirect('/input-bk');
    }

    res.redirect('bk'); // Redirect ke halaman pl setelah penyimpanan berhasil
  });
});
app.post('/input-cpl', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const kode_cpl = req.body.kode_cpl;
  const deskripsi_cpl = req.body.deskripsi_cpl;
  const keterangan = req.body.keterangan;

  // Query SQL untuk menyimpan data cpl
  const query = 'INSERT INTO tb_cpl (kode_cpl, deskripsi_cpl,keterangan) VALUES (?, ?, ?)';
  db.query(query, [kode_cpl, deskripsi_cpl,keterangan], (err, results) => {
    if (err) {
      req.session.err = true;
      return res.redirect('/input-cpl');
    }

    res.redirect('cpl'); // Redirect ke halaman pl setelah penyimpanan berhasil
  });
});

app.post('/input-cpmk', (req, res) => {
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  const kode_cpmk = req.body.kode_cpmk;
  const deskripsi_cpmk = req.body.deskripsi_cpmk;

  // Query SQL untuk menyimpan data cpmk
  const query = 'INSERT INTO tb_cpmk (kode_cpmk, deskripsi_cpmk) VALUES (?, ?)';
  db.query(query, [kode_cpmk, deskripsi_cpmk], (err, results) => {
    if (err) {
      req.session.err = true;
     return res.redirect('/input-cpmk');
    }

    res.redirect('cpmk'); // Redirect ke halaman pl setelah penyimpanan berhasil
  });
});


  app.post('/input-matakuliah', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const kode_mk = req.body.kode_mk;
    const nama_matkul = req.body.nama_matkul;
    const sks = req.body.sks;
    const semester = req.body.semester;
    const hari = req.body.hari;
    const jam = req.body.jam;
    const mbkm = req.body.mbkm;
    const jadwal = hari+"_"+jam;
    const absensi = parseInt(req.body.absensi);
    const tugas = parseInt(req.body.tugas);
    const uts = parseInt(req.body.uts);
    const uas = parseInt(req.body.uas);

    const total = absensi+tugas+uts+uas;
  
    if(total==100){
      
    // Query SQL untuk menyimpan data matakuliah
    const query = 'INSERT INTO tb_mk (kode_mk, nama_matkul, sks, smt, jadwal, mbkm) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [kode_mk, nama_matkul, sks, semester, jadwal, mbkm], (err, results) => {
      if (err) {
        req.session.errMkDuplicate = true;
     return res.redirect('/input-matakuliah');
      }
      const queryAturan = 'INSERT INTO tb_aturan_penilaian (kode_mk, absensi, tugas, uts, uas) VALUES (?, ?, ?, ?, ?)';
    db.query(queryAturan, [kode_mk, absensi, tugas, uts, uas], (err, results) => {
      if (err) {
        req.session.errAturan = true;
     return res.redirect('/input-matakuliah');
      }
    });
  
      res.redirect('/mata-kuliah'); // Redirect ke halaman matakuliah setelah penyimpanan berhasil
    });
  }else{
    req.session.errAturan = true;
    res.redirect('/input-matakuliah');
  }
  });
  app.post('/input-krs', (req, res) => {
    const { kode_mk, nim } = req.body;
  
    // Tambahkan query untuk memeriksa apakah kode_mk dan nim sudah ada
    const checkQuery = 'SELECT * FROM tb_krs WHERE kode_mk = ? AND nim = ?';
  
    db.query(checkQuery, [kode_mk, nim], (err, rows) => {
      if (err) throw err;
  
      // Jika ada hasil, maka mata kuliah sudah dipilih oleh mahasiswa
      if (rows.length > 0) {
        req.session.err = true;
        res.redirect(`/input-krs/${kode_mk}`);
      } else {
        // Jika tidak ada hasil, lakukan penyisipan
        const insertQuery = 'INSERT INTO tb_krs (kode_mk, nim) VALUES (?, ?)';
        db.query(insertQuery, [kode_mk, nim], (err, result) => {
          if (err) throw err;
  
          // Redirect to a success page or display a success message
          res.redirect('/krs'); // Ganti dengan halaman sukses yang sesuai
        });
      }
    });
  });
  app.post('/input-krs-dosen', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const nameUser = req.session.nameUser;
    const userId = req.session.userId;
    const typeUser = req.session.typeUser;
    const { kode_mk, nip } = req.body;
        // Jika tidak ada hasil, lakukan penyisipan
        const insertQuery = 'INSERT INTO tb_krs_dosen (kode_mk, nip) VALUES (?, ?)';
        db.query(insertQuery, [kode_mk, nip], (err, result) => {
          if (err) throw err;
          const selectQuery = `
          SELECT tb_krs.*, tb_mahasiswa.nama
          FROM tb_krs
          JOIN tb_mahasiswa ON tb_krs.nim = tb_mahasiswa.nim
          WHERE kode_mk = ?
        `;
    
        db.query(selectQuery, [kode_mk], (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
          }
    
          const queryMatkul = `
            SELECT * FROM tb_mk
            WHERE kode_mk = ?
          `;
    
          db.query(queryMatkul, [kode_mk], (err, matkul) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
    
            const queryDosen = `
            SELECT tb_krs_dosen.*,tb_dosen.nama FROM tb_krs_dosen 
            JOIN tb_dosen ON tb_krs_dosen.nip = tb_dosen.nip
            WHERE kode_mk = ?
            `;
    
            db.query(queryDosen, [kode_mk], (err, dosen) => {
              if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
              }
    
              res.redirect(`/detail-krs/${kode_mk}`);
            });
          });
        });
      });
      
    });
  app.post('/input-nilai', (req, res) => {
    const { kode_mk, nim, absensi, tugas, uts, uas } = req.body;
   
    const queryMk = `SELECT * FROM tb_mk WHERE kode_mk = ?`;
    const checkQuery = `
        SELECT * FROM tb_nilai WHERE kode_mk = ? AND nim = ?
    `;
    const queryAturan = `
    SELECT * FROM tb_aturan_penilaian WHERE kode_mk = ?
`;

    db.query(checkQuery, [kode_mk, nim], (checkErr, checkResults) => {
        if (checkErr) {
            throw checkErr;
        }

        if (checkResults.length > 0) {
            req.session.err = true;
            res.redirect(`/input-nilai/${kode_mk}/${nim}`);
        } else {
            db.query(queryMk, [kode_mk], (err, resultMk) => {
                if (err) {
                    throw err;
                }
                let mbkm = resultMk[0].mbkm;
                db.query(queryAturan, [kode_mk], (err, resultsAturan) => {
                  if (err) {
                      throw err;
                  }
                  let absensiAturan = resultsAturan[0].absensi;
                  let tugasAturan = resultsAturan[0].tugas;
                  let utsAturan = resultsAturan[0].uts;
                  let uasAturan = resultsAturan[0].uas;
                  let total = (((absensi * 6.25) * (absensiAturan/100)) + (tugas * (tugasAturan/100)) + (uts * (utsAturan/100)) + (uas * (uasAturan/100)));
                if (total >= mbkm) {
                    const query = 'UPDATE tb_krs SET status = ? WHERE kode_mk = ? AND nim = ?';
                    let status = 'Lulus';
                    db.query(query, [status, kode_mk, nim], (err, results) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                    });
                }
                const insertQuery = `
                    INSERT INTO tb_nilai (kode_mk, nim, absensi, tugas, uts, uas)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(insertQuery, [kode_mk, nim, absensi, tugas, uts, uas], (insertErr, insertResult) => {
                    if (insertErr) {
                        throw insertErr;
                    }

                    console.log('Data berhasil dimasukkan');
                    res.redirect(`/detail-penilaian/${kode_mk}`);
                });
            });
          });
        }
      
    });
});


// APP GET POST EDIT


app.post('/edit-dosen/:nip', (req, res) => {
  const nip = req.params.nip;
  const { nama, alamat, no_tlp } = req.body;
  const idUser = req.session.idUser;
  if (!idUser) {
      return res.redirect('/login');
  }
  // Query SQL untuk memperbarui data dosen
  const query = 'UPDATE tb_dosen SET nama = ?, alamat = ?, no_telp = ? WHERE nip = ?';
  db.query(query, [nama, alamat, no_tlp, nip], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.redirect('/dosen'); // Redirect ke halaman dosen setelah berhasil memperbarui data
  });
});

app.post('/edit-mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const { nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, email, no_tlp, prodi, smt } = req.body;
  
    // Query SQL untuk mengupdate data mahasiswa
    const query = `
      UPDATE tb_mahasiswa
      SET nama = ?, jenis_kelamin = ?, tempat_lahir = ?, tanggal_lahir = ?, alamat = ?, email = ?, no_tlp = ?, prodi = ?, smt = ?
      WHERE nim = ?`;
    
    const values = [nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, email, no_tlp, prodi, smt, nim];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/mahasiswa'); // Redirect ke halaman mahasiswa setelah berhasil mengedit
    });
  });
  app.post('/edit-pl/:kode_pl', (req, res) => {
    const kode_pl = req.params.kode_pl;
    const { profil_lulus } = req.body;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    // Query SQL untuk memperbarui data dosen
    const query = 'UPDATE tb_pl SET profil_lulus = ? WHERE kode_pl = ?';
    db.query(query, [profil_lulus, kode_pl], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/pl'); // Redirect ke halaman dosen setelah berhasil memperbarui data
    });
  });

  app.post('/edit-prodi/:kode_prodi', (req, res) => {
    const kode_prodi = req.params.kode_prodi;
    const { prodi } = req.body;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    // Query SQL untuk memperbarui data dosen
    const query = 'UPDATE tb_prodi SET nama_prodi = ? WHERE kode_prodi = ?';
    db.query(query, [prodi, kode_prodi], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/prodi'); // Redirect ke halaman dosen setelah berhasil memperbarui data
    });
  });
  app.post('/edit-bk/:kode_bk', (req, res) => {
    const kode_bk = req.params.kode_bk;
    const { bahan_kajian,reference } = req.body;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    // Query SQL untuk memperbarui data dosen
    const query = 'UPDATE tb_bk SET bahan_kajian = ?, reference = ? WHERE kode_bk = ?';
    db.query(query, [bahan_kajian,reference, kode_bk], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/bk'); // Redirect ke halaman dosen setelah berhasil memperbarui data
    });
  });
  app.post('/edit-cpl/:kode_cpl', (req, res) => {
    const kode_cpl = req.params.kode_cpl;
    const { deskripsi_cpl,keterangan } = req.body;
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    // Query SQL untuk memperbarui data dosen
    const query = 'UPDATE tb_cpl SET deskripsi_cpl = ?, keterangan = ? WHERE kode_cpl = ?';
    db.query(query, [deskripsi_cpl,keterangan, kode_cpl], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/cpl'); // Redirect ke halaman dosen setelah berhasil memperbarui data
    });
  });
  app.post('/edit-matakuliah', (req, res) => {
    const idUser = req.session.idUser;
    if (!idUser) {
        return res.redirect('/login');
    }
    const { kode_mk, nama_matkul, sks, semester, mbkm } = req.body;
    const hari = req.body.hari;
    const jam = req.body.jam;
    const jadwalHari = hari+"_"+jam;
    const absensi = parseInt(req.body.absensi);
    const tugas = parseInt(req.body.tugas);
    const uts = parseInt(req.body.uts);
    const uas = parseInt(req.body.uas);

    const total = absensi+tugas+uts+uas;

    if(total==100){
    // Query SQL untuk mengupdate data matakuliah
    const query = 'UPDATE tb_mk SET nama_matkul = ?, sks = ?, smt = ?, jadwal = ?, mbkm = ? WHERE kode_mk = ?';
    db.query(query, [nama_matkul, sks, semester,jadwalHari, mbkm, kode_mk], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const queryAturan = 'UPDATE tb_aturan_penilaian SET absensi = ?, tugas = ?, uts = ?, uas = ? WHERE kode_mk = ?';
    db.query(queryAturan, [absensi,tugas,uts,uas, kode_mk], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.redirect('/mata-kuliah'); // Redirect ke halaman matakuliah setelah pengeditan berhasil
    });
  });
  }else{
    req.session.errAturan = true;
    res.redirect(`/edit-matakuliah/${kode_mk}`);
  }
  });
  app.post('/edit-nilai/:id', (req, res) => {
    const { id } = req.params;
    const { absensi, tugas, uts, uas } = req.body;




    const queryMk = `SELECT * FROM tb_mk WHERE kode_mk = ?`;

    const queryNilai = `
        SELECT * FROM tb_nilai WHERE id = ?
    `;

    db.query(queryNilai, [id], (err, resultsNilai) => {
        if (err) {
            throw err;
        }

        const kode_mk = resultsNilai[0].kode_mk;
        db.query(queryMk, [kode_mk], (err, resultMk) => {
            if (err) {
                throw err;
            }

            let mbkm = resultMk[0].mbkm;
            const queryAturan = `
            SELECT * FROM tb_aturan_penilaian WHERE kode_mk = ?
        `;
            db.query(queryAturan, [kode_mk], (err, resultsAturan) => {
              if (err) {
                  throw err;
              }
              let absensiAturan = resultsAturan[0].absensi;
              let tugasAturan = resultsAturan[0].tugas;
              let utsAturan = resultsAturan[0].uts;
              let uasAturan = resultsAturan[0].uas;
              let total = (((absensi * 6.25) * (absensiAturan/100)) + (tugas * (tugasAturan/100)) + (uts * (utsAturan/100)) + (uas * (uasAturan/100)));
              console.log(total)
            if (total < mbkm) {
                const updateKrsQuery = 'UPDATE tb_krs SET status = ? WHERE kode_mk = ? AND nim = ?';
                const status = 'Tidak Lulus';

                db.query(updateKrsQuery, [status, kode_mk, resultsNilai[0].nim], (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                });
            }else{
              const updateKrsQuery = 'UPDATE tb_krs SET status = ? WHERE kode_mk = ? AND nim = ?';
                const status = 'Lulus';

                db.query(updateKrsQuery, [status, kode_mk, resultsNilai[0].nim], (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                });
            }

            const updateNilaiQuery = `
                UPDATE tb_nilai 
                SET absensi = ?, tugas = ?, uts = ?, uas = ?
                WHERE id = ?
            `;

            db.query(updateNilaiQuery, [absensi, tugas, uts, uas, id], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.redirect(`/daftar-nilai`);
            });
        });
      });
    });
});
app.get('/akses/:kode_mk', (req, res) => {
  const kodeMk = req.params.kode_mk;

  // Simpan data ke tabel akses_penilaian di database
  const query = 'INSERT INTO akses_penilaian (kode_mk) VALUES (?)';
  db.query(query, [kodeMk], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saat menyimpan data ke database');
    }

    // Berhasil menyimpan data
    res.redirect(`/detail-penilaian/${kodeMk}`);
  });
});

app.get('/hapus-akses/:kode_mk', (req, res) => {
  const kodeMk = req.params.kode_mk;

  // Delete data from the akses_penilaian table
  const query = 'DELETE FROM akses_penilaian WHERE kode_mk = ?';
  db.query(query, [kodeMk], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting data from the database');
    }

    // Successfully deleted data
    res.redirect(`/detail-penilaian/${kodeMk}`);
  });
});

  
  

  const opn = require('opn');

  app.listen(3000, () => {
      console.log("Konek yah");
      opn('http://localhost:3000');
  });

  
  
  
  
  
