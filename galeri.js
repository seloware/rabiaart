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

// Lightbox değişkenleri
let mevcutIndeks = 0;
let mevcutResimler = [];

// Dokunmatik ekran için değişkenler
let dokunmaBaslangicX = 0;
let dokunmaBaslangicY = 0;
let mevcutX = 0;
let mevcutY = 0;
let surukleniyor = false;

// Resimleri görüntüle
function resimleriGoster(resimler) {
    const galeriKonteyner = document.querySelector('.gallery-grid');
    galeriKonteyner.innerHTML = '';
    resimler.forEach((resim, indeks) => {
        const kart = document.createElement('div');
        kart.className = 'gallery-card';
        kart.setAttribute('data-aos', 'fade-up');
        kart.innerHTML = `
            <div class="gallery-card-image">
                <img src="${resim.src}" alt="${resim.baslik}">
                <div class="gallery-card-overlay">
                    <div class="gallery-card-info">
                        <h3>${resim.baslik}</h3>
                        <p class="gallery-card-year">${resim.yil}</p>
                        <div class="gallery-card-actions">
                            <button class="gallery-card-btn info-btn" title="Detaylar">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        galeriKonteyner.appendChild(kart);
    });
}

// Lightbox içeriğini güncelle
function lightboxIceriginiGuncelle() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxResim = lightbox.querySelector('.lightbox-image img');
    const lightboxBaslik = lightbox.querySelector('.lightbox-title');
    const lightboxAciklama = lightbox.querySelector('.lightbox-description');
    const mevcutResim = mevcutResimler[mevcutIndeks];
    lightboxResim.src = mevcutResim.src;
    lightboxBaslik.textContent = mevcutResim.baslik;
    lightboxAciklama.textContent = `${mevcutResim.yil}`;
}

function navigasyonButonlariniGuncelle() {
    const oncekiBtn = document.querySelector('.lightbox-prev');
    const sonrakiBtn = document.querySelector('.lightbox-next');
    
    if (oncekiBtn) {
        oncekiBtn.style.display = mevcutIndeks > 0 ? 'flex' : 'none';
    }
    if (sonrakiBtn) {
        sonrakiBtn.style.display = mevcutIndeks < mevcutResimler.length - 1 ? 'flex' : 'none';
    }
}

function oncekiResmiGoster() {
    if (mevcutIndeks > 0) {
        mevcutIndeks--;
        lightboxIceriginiGuncelle();
        navigasyonButonlariniGuncelle();
    }
}

function sonrakiResmiGoster() {
    if (mevcutIndeks < mevcutResimler.length - 1) {
        mevcutIndeks++;
        lightboxIceriginiGuncelle();
        navigasyonButonlariniGuncelle();
    }
}

function lightboxAcKapat(durum) {
    const lightbox = document.querySelector('.lightbox');
    if (durum) {
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const tumResimler = await resimleriYukle();
    resimleriGoster(tumResimler);
    // Lightbox olaylarını ayarla
    const lightbox = document.querySelector('.lightbox');
    const kapatBtn = lightbox.querySelector('.lightbox-close');
    const oncekiBtn = lightbox.querySelector('.lightbox-prev');
    const sonrakiBtn = lightbox.querySelector('.lightbox-next');
    
    if (kapatBtn) {
        kapatBtn.onclick = () => {
            lightboxAcKapat(false);
        };
    }
    
    if (oncekiBtn) {
        oncekiBtn.onclick = oncekiResmiGoster;
    }
    
    if (sonrakiBtn) {
        sonrakiBtn.onclick = sonrakiResmiGoster;
    }
    
    // Klavye ile gezinme
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'ArrowLeft') oncekiResmiGoster();
        if (e.key === 'ArrowRight') sonrakiResmiGoster();
        if (e.key === 'Escape') lightboxAcKapat(false);
    });
}); 