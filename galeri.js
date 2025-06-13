// Varsayılan resimler
const defaultImages = [
    {
        src: 'resimler/1.jpeg',
        title: 'Bahar Çiçekleri',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/2.jpeg',
        title: 'Portre Çalışması',
        category: 'karakalem',
        categoryName: 'Karakalem',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/3.jpeg',
        title: 'Modern Kompozisyon',
        category: 'dijital',
        categoryName: 'Dijital',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.26.jpeg',
        title: 'Yeni Eser 1',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (6).jpeg',
        title: 'Yeni Eser 2',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (5).jpeg',
        title: 'Yeni Eser 3',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (4).jpeg',
        title: 'Yeni Eser 4',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (3).jpeg',
        title: 'Yeni Eser 5',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (2).jpeg',
        title: 'Yeni Eser 6',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25 (1).jpeg',
        title: 'Yeni Eser 7',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.25.jpeg',
        title: 'Yeni Eser 8',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.24 (2).jpeg',
        title: 'Yeni Eser 9',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.24 (1).jpeg',
        title: 'Yeni Eser 10',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    },
    {
        src: 'resimler/yeni eserler/WhatsApp Image 2025-06-14 at 01.31.24.jpeg',
        title: 'Yeni Eser 11',
        category: 'yagli-boya',
        categoryName: 'Yağlı Boya',
        year: '2025',
        isDefault: true
    }
];

// localStorage'dan resimleri al veya varsayılan resimleri kullan
function getImages() {
    let savedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    
    // Eğer savedImages boşsa veya varsayılan resimlerden farklıysa, defaultImages'ı kullan
    if (savedImages.length === 0 || !savedImages.some(img => img.isDefault)) {
        savedImages = defaultImages.map(img => ({ ...img })); // Default resimlerin kopyasını oluştur
        localStorage.setItem('galleryImages', JSON.stringify(savedImages));
        return savedImages;
    }

    // Yılını 2024'ten 2025'e güncelle
    let updatedImages = savedImages.map(img => {
        if (img.year === '2024') {
            return { ...img, year: '2025' };
        }
        return img;
    });
    
    // Eğer güncellenen resimler savedImages'dan farklıysa, localStorage'ı güncelle
    if (JSON.stringify(updatedImages) !== JSON.stringify(savedImages)) {
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    }
    
    return updatedImages;
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

// Touch variables for mobile panning
let touchStartX = 0;
let touchStartY = 0;
let currentX = 0;
let currentY = 0;
let isDragging = false;

// Lightbox içeriğini güncelle
function updateLightboxContent() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-description');
    
    const currentImage = currentImages[currentIndex];
    lightboxImg.src = currentImage.src;
    lightboxTitle.style.display = 'none';
    lightboxDesc.textContent = `${currentImage.year}`;
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
    const lightboxImg = lightbox.querySelector('.lightbox-image img');

    // Touch event handlers for mobile panning
    lightboxImg.addEventListener('touchstart', (e) => {
        isDragging = true;
        touchStartX = e.touches[0].clientX - currentX;
        touchStartY = e.touches[0].clientY - currentY;
        lightboxImg.style.transition = 'none';
    });

    lightboxImg.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default scrolling
        currentX = e.touches[0].clientX - touchStartX;
        currentY = e.touches[0].clientY - touchStartY;
        lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    lightboxImg.addEventListener('touchend', () => {
        isDragging = false;
        lightboxImg.style.transition = 'transform 0.3s ease-out';
        lightboxImg.style.transform = 'translate(0, 0)';
        currentX = 0;
        currentY = 0;
    });

    // Reset transform when changing images
    function resetImageTransform() {
        lightboxImg.style.transform = 'translate(0, 0)';
        currentX = 0;
        currentY = 0;
    }

    // Add resetImageTransform to navigation functions
    const originalShowPreviousImage = showPreviousImage;
    const originalShowNextImage = showNextImage;

    window.showPreviousImage = function() {
        resetImageTransform();
        originalShowPreviousImage();
    };

    window.showNextImage = function() {
        resetImageTransform();
        originalShowNextImage();
    };

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

// Resimleri görüntüleme fonksiyonu
function displayImages(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    images.forEach(img => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', img.category);
        galleryItem.setAttribute('data-aos', 'fade-up');

        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${img.src}" alt="${img.title}">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <p>${img.year}</p>
                        <div class="gallery-actions">
                            <button class="action-btn zoom-btn" title="Büyüt">
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button class="action-btn info-btn" title="Detaylar">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            ${isLoggedIn ? `
                            <button class="action-btn delete-btn" title="Sil" onclick="deleteImage('${img.src}')">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        gallery.appendChild(galleryItem);

        // Büyütme butonuna tıklama olayını ekle
        const zoomBtn = galleryItem.querySelector('.zoom-btn');
        zoomBtn.addEventListener('click', () => {
            // ... existing code ...
        });
    });
} 