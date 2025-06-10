// Varsayılan resimler
const defaultImages = [
    {
        src: 'resimler/1.jpeg',
        title: 'Bahar Çiçekleri',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2024',
        isDefault: true
    },
    {
        src: 'resimler/2.jpeg',
        title: 'Portre Çalışması',
        category: 'karakalem',
        categoryName: 'Karakalem',
        year: '2024',
        isDefault: true
    },
    {
        src: 'resimler/3.jpeg',
        title: 'Modern Kompozisyon',
        category: 'dijital',
        categoryName: 'Dijital',
        year: '2024',
        isDefault: true
    }
];

// localStorage'dan resimleri al veya varsayılan resimleri kullan
function getImages() {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    
    // İlk kez yükleniyorsa varsayılan resimleri kaydet
    if (savedImages.length === 0) {
        localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
        return defaultImages;
    }
    
    return savedImages;
}

// Yeni resim ekle
function addImage(imageData) {
    const currentImages = getImages();
    currentImages.push({
        ...imageData,
        isDefault: false
    });
    localStorage.setItem('galleryImages', JSON.stringify(currentImages));
    return currentImages;
}

// Resim silme fonksiyonu
function deleteImage(imgSrc) {
    const confirmDelete = confirm('Bu resmi silmek istediğinizden emin misiniz?');
    if (confirmDelete) {
        const currentImages = getImages();
        // Varsayılan resim kontrolü
        const targetImage = currentImages.find(img => img.src === imgSrc);
        if (targetImage && targetImage.isDefault) {
            alert('Varsayılan resimler silinemez!');
            return;
        }

        // Resmi localStorage'dan sil
        const updatedImages = currentImages.filter(img => img.src !== imgSrc);
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        
        // DOM'dan resim elementini bul ve kaldır
        const imageElement = document.querySelector(`[src="${imgSrc}"]`);
        if (imageElement) {
            const galleryItem = imageElement.closest('.gallery-item');
            if (galleryItem) {
                galleryItem.remove();
            }
        }

        // Eğer sayfada hiç resim kalmadıysa veya son resim silindiyse
        const remainingImages = document.querySelectorAll('.gallery-item');
        if (remainingImages.length === 0) {
            clearGallery();
            displayImages(filterImages(settings.currentFilter));
        }
    }
}

// Resimleri filtreleme fonksiyonu
function filterImages(filter = 'all') {
    const images = getImages();
    return filter === 'all' ? images : images.filter(img => img.category === filter);
}

// Lightbox değişkenleri
let currentIndex = 0;
let currentImages = [];

// Lightbox içeriğini güncelle
function updateLightboxContent() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-description');
    
    const currentImage = currentImages[currentIndex];
    lightboxImg.src = currentImage.src;
    lightboxTitle.style.display = 'none';
    lightboxDesc.textContent = `${currentImage.categoryName}, ${currentImage.year}`;
}

// Navigasyon butonlarını güncelle
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentIndex < currentImages.length - 1 ? 'flex' : 'none';
}

// Önceki resme git
function showPreviousImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxContent();
        updateNavigationButtons();
    }
}

// Sonraki resme git
function showNextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateLightboxContent();
        updateNavigationButtons();
    }
}

// Lightbox olaylarını ayarla
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Navigasyon butonları tıklama olayları
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Lightbox'ı kapatma
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Dışarı tıklayarak kapatma
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Klavye tuşları ile gezinme
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        }
    });
}); 