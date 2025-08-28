// === Import library Firebase ===
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js' 
// import fungsi untuk inisialisasi aplikasi Firebase

import {
  getFirestore,   // untuk akses database Firestore
  collection,     // untuk referensi koleksi
  doc,            // untuk referensi dokumen
  getDocs,        // untuk mengambil banyak dokumen
  getDoc,         // untuk mengambil 1 dokumen
  addDoc,         // untuk menambahkan dokumen baru
  deleteDoc,      // untuk menghapus dokumen
  updateDoc,      // untuk mengupdate dokumen
  query,          // untuk membuat query
  orderBy         // untuk mengurutkan hasil query
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


// === Konfigurasi project Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyBWnwSPVAOZT7ZDYqgLmipF1lsI9OLbONg",  // API key project
  authDomain: "insancemerlang-4ee53.firebaseapp.com", // domain autentikasi
  projectId: "insancemerlang-4ee53",                  // ID project Firebase
  storageBucket: "insancemerlang-4ee53.firebasestorage.app", // tempat simpan file
  messagingSenderId: "290819815811",                  // ID pengirim pesan
  appId: "1:290819815811:web:4237f0fd64071ec1f3deb6", // ID aplikasi
  measurementId: "G-GTCXR8HWRG"                       // ID untuk analytics
}


// === Inisialisasi Firebase & Firestore ===
const aplikasi = initializeApp(firebaseConfig)   // hubungkan app ke Firebase
const basisdata = getFirestore(aplikasi)         // hubungkan app ke Firestore


// === Fungsi Tambah Data Pelanggan ===
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // tambahkan data baru ke koleksi "pelanggan"
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
      nama: nama,      // simpan nama
      alamat: alamat,  // simpan alamat
      nohape: nohape   // simpan no HP
    })

    // tampilkan pesan jika sukses
    console.log("berhasil menyimpan data pelanggan")
  } catch (e) {
    // tampilkan pesan error jika gagal
    console.log("gagal menyimpan data pelanggan: " + e)
  }
}


// === Fungsi Hapus Data Pelanggan ===
export async function hapusPelanggan(id) {
  // hapus dokumen berdasarkan ID
  await deleteDoc(doc(basisdata, "pelanggan", id))
}


// === Fungsi Ambil Semua Data Pelanggan ===
export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan")  // referensi koleksi
  const kueri = query(refDokumen, orderBy("nama"))       // query urutkan nama
  const cuplikanKueri = await getDocs(kueri)             // ambil semua dokumen

  let hasilKueri = []                                    // array penampung hasil
  cuplikanKueri.forEach((dokumen) => {                   // loop tiap dokumen
    hasilKueri.push({
      id: dokumen.id,               // ambil ID dokumen
      nama: dokumen.data().nama,    // ambil field nama
      alamat: dokumen.data().alamat,// ambil field alamat
      nohape: dokumen.data().nohape // ambil field nohape
    })
  })

  return hasilKueri  // kembalikan array hasil
}


// === Fungsi Ubah Data Pelanggan ===
export async function ubahPelanggan(id, nama, alamat, nohape) {
  // update dokumen berdasarkan ID
  await updateDoc(
    doc(basisdata, "pelanggan", id), // referensi dokumen
    {
      nama: nama,      // data baru nama
      alamat: alamat,  // data baru alamat
      nohape: nohape   // data baru nohape
    }
  )
}


// === Fungsi Ambil 1 Data Pelanggan ===
export async function ambilPelanggan(id) {
  const refDokumen = doc(basisdata, "pelanggan", id) // referensi dokumen by ID
  const snapshotDocumen = await getDoc(refDokumen)   // ambil data dokumen

  return snapshotDocumen.data()  // kembalikan data isi dokumen
}
