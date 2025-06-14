// Resim dizinleri
const resimDizinleri = {
    'tumu': 'resimler'
};

// Resimleri yükle
async function resimleriYukle() {
    const resimler = [];
    const dizin = resimDizinleri.tumu;
    try {
        const yanit = await fetch(`http://localhost:5500/api/dosyalar/${dizin}`);
        if (yanit.ok) {
            const dosyalar = await yanit.json();
            console.log('Yüklenen dosyalar:', dosyalar); // Hata ayıklama için
            dosyalar.forEach(dosya => {
                if (dosya.endsWith('.jpg') || dosya.endsWith('.jpeg') || dosya.endsWith('.png')) {
                    resimler.push({
                        src: `${dizin}/${dosya}`,
                        baslik: dosya.split('.')[0].replace(/-/g, ' '),
                        yil: '2025'
                    });
                }
            });
            console.log('İşlenen resimler:', resimler); // Hata ayıklama için
        } else {
            console.error(`${dizin} dizini için yanıt başarısız:`, yanit.status);
        }
    } catch (hata) {
        console.error(`${dizin} dizininden resimler yüklenirken hata oluştu:`, hata);
    }
    return resimler;
}

// Resimleri göster
async function resimleriGoster() {
    const resimler = await resimleriYukle();
    const resimlerDiv = document.getElementById('resimler');
    resimlerDiv.innerHTML = ''; // Mevcut içeriği temizle
    resimler.forEach(resim => {
        const resimElement = document.createElement('div');
        resimElement.className = 'resim';
        resimElement.innerHTML = `
            <img src="${resim.src}" alt="${resim.baslik}">
            <h3>${resim.baslik}</h3>
        `;
        resimlerDiv.appendChild(resimElement);
    });
}

// Sayfa yüklendiğinde resimleri göster
document.addEventListener('DOMContentLoaded', resimleriGoster); 