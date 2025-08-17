// server.js

// 1. Impor modul
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// 2. Inisialisasi Express
const app = express();
const PORT = 5000; // Backend akan berjalan di port 5000

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Konfigurasi Koneksi Database LOKAL (XAMPP)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_fasilkom_unsri'
};

// 5. Rute API
app.get('/', (req, res) => {
    res.send('🚀 Server Backend Fasilkom UNSRI Aktif!');
});

// Endpoint untuk mengambil data berita
app.get('/api/berita', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM berita ORDER BY created_at DESC LIMIT 3');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data berita', error: error.message });
    }
});

// Endpoint untuk mengambil data pengumuman
app.get('/api/pengumuman', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM pengumuman ORDER BY tanggal DESC LIMIT 4');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data pengumuman', error: error.message });
    }
});

// 6. Jalankan Server
app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
    console.log('Tekan Ctrl+C untuk menghentikan server.');
});