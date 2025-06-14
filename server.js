const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 5500;

// Statik dosyaları sun
app.use(express.static(path.join(__dirname)));

// Dosya listesini getir
app.get('/api/dosyalar/:dizin', async (req, res) => {
    try {
        const dizinYolu = path.join(__dirname, req.params.dizin);
        const dosyalar = await fs.readdir(dizinYolu);
        res.json(dosyalar);
    } catch (hata) {
        res.status(500).send('Dosyalar yüklenirken bir hata oluştu.');
    }
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
}); 