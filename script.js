// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Alamat server backend LOKAL Anda
    const API_BASE_URL = 'http://localhost:5000';

    // Fungsi untuk memuat berita
    async function loadBerita() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/berita`);
            const beritaData = await response.json();
            
            const container = document.querySelector('.cards3');
            container.innerHTML = '';

            beritaData.forEach(berita => {
                // Gunakan path gambar dari folder img Anda
                const newsCard = `
                    <article class="news-card">
                        <img src="${berita.gambar_url}" alt="Gambar Berita">
                        <div class="news-caption">${berita.judul}</div>
                    </article>
                `;
                container.innerHTML += newsCard;
            });

        } catch (error) {
            console.error('Error memuat data berita:', error);
        }
    }

    // Panggil fungsi
    loadBerita();
    // (tambahkan fungsi untuk loadPengumuman, dll.)
});