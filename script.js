// Tüm JavaScript kodunu DOMContentLoaded içine alıyoruz
document.addEventListener('DOMContentLoaded', function() {
    // Utility Functions
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    function validateForm(formData, requiredFields) {
        for (let field of requiredFields) {
            if (!formData.get(field)) {
                showMessage(`Lütfen ${field} alanını doldurun`, 'error');
                return false;
            }
        }
        return true;
    }

    function getCategoryName(category) {
        const categoryMap = {
            'paintings': 'Yağlı Boya',
            'drawings': 'Karakalem',
            'digital': 'Dijital'
        };
        return categoryMap[category] || category;
    }

    // Navigation Menu Toggle
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.menu');
    
    if (menu) {
        menu.addEventListener('click', function() {
            nav?.classList.toggle('active');
        });
    }

    // Gallery Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryImages = document.querySelectorAll('.gallery .images .img');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryImages.forEach(image => {
                const display = filter === 'all' || image.getAttribute('data-category') === filter;
                image.style.display = display ? 'block' : 'none';
            });
        });
    });

    // Image Upload Preview
    const imageInput = document.querySelector('#image-file');
    const previewArea = document.querySelector('#preview-area');
    const previewImage = document.querySelector('#image-preview');

    if (imageInput && previewArea && previewImage) {
        // Dosya seçildiğinde önizleme göster
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    showMessage('Lütfen geçerli bir resim dosyası seçin', 'error');
                    return;
                }
                showPreview(file);
            }
        });

        // Sürükle-bırak olayları
        previewArea.addEventListener('click', () => imageInput.click());

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            previewArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            previewArea.addEventListener(eventName, () => {
                previewArea.classList.add('highlight');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            previewArea.addEventListener(eventName, () => {
                previewArea.classList.remove('highlight');
            });
        });

        previewArea.addEventListener('drop', handleDrop);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];

            if (file && file.type.startsWith('image/')) {
                imageInput.files = dt.files;
                showPreview(file);
            } else {
                showMessage('Lütfen geçerli bir resim dosyası seçin', 'error');
            }
        }

        function showPreview(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                previewArea.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    }

    // Auth Tabs Functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    if (authTabs.length && authForms.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                tab.classList.add('active');
                const formId = `${tab.dataset.tab}-form-container`;
                document.getElementById(formId)?.classList.add('active');
            });
        });
    }

    // Form Submissions
    const forms = {
        login: document.querySelector('#login-form'),
        register: document.querySelector('#register-form'),
        contact: document.querySelector('#contact-form'),
        upload: document.querySelector('#upload-form')
    };

    // Login Form
    if (forms.login) {
        forms.login.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forms.login);
            
            if (!validateForm(formData, ['email', 'password'])) return;

            try {
                // Login logic here
                showMessage('Giriş başarılı!', 'success');
            } catch (error) {
                showMessage('Giriş yapılırken bir hata oluştu', 'error');
            }
        });
    }

    // Register Form
    if (forms.register) {
        forms.register.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forms.register);
            
            if (!validateForm(formData, ['username', 'email', 'password'])) return;

            try {
                // Register logic here
                showMessage('Kayıt başarılı!', 'success');
            } catch (error) {
                showMessage('Kayıt olurken bir hata oluştu', 'error');
            }
        });
    }

    // Contact Form
    if (forms.contact) {
        forms.contact.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forms.contact);
            
            if (!validateForm(formData, ['name', 'email', 'message'])) return;

            try {
                // Form submission logic here
                showMessage('Mesajınız gönderildi!', 'success');
                forms.contact.reset();
            } catch (error) {
                showMessage('Mesaj gönderilirken bir hata oluştu', 'error');
            }
        });
    }

    // Upload Form
    if (forms.upload) {
        forms.upload.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forms.upload);
            
            if (!validateForm(formData, ['image', 'title', 'category'])) return;

            const imageFile = formData.get('image');
            if (!imageFile.type.startsWith('image/')) {
                showMessage('Lütfen geçerli bir resim dosyası seçin', 'error');
                return;
            }

            try {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const newImageData = {
                        src: e.target.result,
                        title: formData.get('title'),
                        category: formData.get('category'),
                        categoryName: getCategoryName(formData.get('category')),
                        description: formData.get('description') || '',
                        year: new Date().getFullYear().toString()
                    };

                    // addImage fonksiyonunu kullan (galeri.html'den)
                    if (typeof addImage === 'function') {
                        addImage(newImageData);
                    } else {
                        showMessage('Resim yükleme fonksiyonu bulunamadı', 'error');
                        return;
                    }

                    showMessage('Resim başarıyla yüklendi!', 'success');
                    forms.upload.reset();
                    if (previewImage && previewArea) {
                        previewImage.style.display = 'none';
                        previewArea.style.display = 'block';
                    }

                    setTimeout(() => {
                        window.location.href = 'galeri.html';
                    }, 1500);
                };
                reader.readAsDataURL(imageFile);
            } catch (error) {
                console.error('Yükleme hatası:', error);
                showMessage('Resim yüklenirken bir hata oluştu', 'error');
            }
        });
    }

    // Password Toggle Functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Kullanıcı giriş durumunu kontrol et
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userName = localStorage.getItem('userName');
        return isLoggedIn && userName === 'Rabia Doğruöz';
    }

    // Navigation bar'ı güncelle
    function updateNavigation() {
        const nav = document.querySelector('nav ul');
        const isLoggedIn = checkLoginStatus();
        const loginBtn = document.querySelector('.login-btn');
        
        if (isLoggedIn) {
            // Kullanıcı menüsünü oluştur
            if (loginBtn) {
                const userContainer = document.createElement('li');
                userContainer.className = 'user-container';
                
                const userButton = document.createElement('a');
                userButton.href = '#';
                userButton.className = 'user-button';
                userButton.innerHTML = 'Rabia Doğruöz <i class="fas fa-chevron-down"></i>';
                
                const dropdownMenu = document.createElement('div');
                dropdownMenu.className = 'dropdown-menu';
                
                const logoutButton = document.createElement('a');
                logoutButton.href = '#';
                logoutButton.className = 'logout-btn';
                logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Çıkış Yap';
                
                dropdownMenu.appendChild(logoutButton);
                userContainer.appendChild(userButton);
                userContainer.appendChild(dropdownMenu);
                
                // Login butonunu kullanıcı menüsü ile değiştir
                loginBtn.parentNode.replaceChild(userContainer, loginBtn);
                
                // Kullanıcı butonuna tıklandığında dropdown menüyü göster/gizle
                userButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                });
                
                // Çıkış yap butonuna tıklandığında
                logoutButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userName');
                    window.location.href = 'index.html';
                });
                
                // Sayfa herhangi bir yerine tıklandığında dropdown menüyü kapat
                document.addEventListener('click', function(e) {
                    if (!userContainer.contains(e.target)) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        }
    }

    // Sayfa yüklendiğinde çalıştır
    updateNavigation();

    // Mobil menü toggle fonksiyonu
    const menuToggle = document.querySelector('.menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.toggle('active');
            }
        });
    }
});

// Gallery lightbox functionality
window.onload = () => {
    const images = document.querySelectorAll('.gallery .images .img');
    images.forEach((image, index) => {
        image.onclick = () => {
            const imgSrc = image.querySelector('img').src;
            previewBox.src = imgSrc;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        };
    });
}

// Close lightbox
if (closeIcon) {
    closeIcon.onclick = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    };
}