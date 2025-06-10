// Navigasyon menüsü için toggle fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.menu');

    menu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Sayfa kaydırma animasyonları için AOS kütüphanesini başlat
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Scroll olayını dinle ve navigasyon çubuğunu güncelle
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            nav.style.backgroundColor = '#fff';
            nav.style.boxShadow = 'none';
        }
    });

    // Mobil menüyü dışarı tıklandığında kapat
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target);
        
        if (!isClickInside && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
}); 