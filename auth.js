// Giriş durumunu kontrol et
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Giriş yap
function login(username, password) {
    // Burada gerçek bir kimlik doğrulama yapılmalı
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Rabia Doğruöz');
        updateNavigation();
        return true;
    }
    return false;
}

// Çıkış yap
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userName');
    updateNavigation();
    window.location.href = 'index.html';
}

// Navigasyon menüsünü güncelle
function updateNavigation() {
    const isLoggedIn = checkLoginStatus();
    const userName = localStorage.getItem('userName');
    const loginBtn = document.querySelector('.login-btn');
    
    if (isLoggedIn && loginBtn) {
        loginBtn.textContent = userName;
        loginBtn.classList.add('logged-in');
        
        // Çıkış menüsünü oluştur
        let logoutMenu = document.querySelector('.logout-menu');
        if (!logoutMenu) {
            logoutMenu = document.createElement('div');
            logoutMenu.className = 'logout-menu';
           
            loginBtn.parentNode.appendChild(logoutMenu);
        }
        
        // Tıklama olayını ekle
        loginBtn.onclick = function(e) {
            e.preventDefault();
            logoutMenu.classList.toggle('active');
        };
        
        // Sayfa herhangi bir yerine tıklandığında menüyü kapat
        document.addEventListener('click', function(e) {
            if (!loginBtn.contains(e.target)) {
                logoutMenu.classList.remove('active');
            }
        });
    } else if (loginBtn) {
        loginBtn.textContent = 'Giriş Yap';
        loginBtn.classList.remove('logged-in');
        loginBtn.onclick = null;
        
        // Varsa çıkış menüsünü kaldır
        const logoutMenu = document.querySelector('.logout-menu');
        if (logoutMenu) {
            logoutMenu.remove();
        }
    }
}

// Sayfa yüklendiğinde navigasyonu güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
}); 