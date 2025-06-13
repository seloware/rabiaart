// Giriş durumunu kontrol et
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Giriş yapma fonksiyonu
function login(username, password) {
    // Burada gerçek bir kimlik doğrulama sistemi olacak
    // Şimdilik basit bir kontrol yapıyoruz
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
    }
    return false;
}

// Çıkış yapma fonksiyonu
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Giriş formunu dinle
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (login(username, password)) {
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = 'Kullanıcı adı veya şifre hatalı!';
            }
        });
    }

    // Giriş durumunu kontrol et ve admin öğelerini göster/gizle
    function updateAdminElements() {
        const isLoggedIn = checkLoginStatus();
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isLoggedIn ? 'block' : 'none';
        });
    }

    // Sayfa yüklendiğinde ve giriş durumu değiştiğinde admin öğelerini güncelle
    updateAdminElements();
    document.addEventListener('loginStatusChanged', updateAdminElements);
}); 