const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Statik dosyaları sun
app.use(express.static('./'));
app.use('/resimler', express.static('resimler'));

// Dosya listesini getir
app.get('/api/dosyalar/:dizin', async (req, res) => {
    try {
        const dizinYolu = path.join(__dirname, req.params.dizin);
        console.log('Okunmaya çalışılan dizin yolu:', dizinYolu); // Hata ayıklama için
        const dosyalar = await fs.readdir(dizinYolu);
        res.json(dosyalar);
    } catch (hata) {
        console.error('Dosya listesi alınırken hata oluştu:', hata);
        res.status(500).json({ hata: 'Dosya listesi alınamadı' });
    }
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Galeri sayfası
app.get('/galeri', (req, res) => {
    res.sendFile(path.join(__dirname, 'galeri.html'));
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
}); 