document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".navbar a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Tutup menu otomatis saat link diklik (UX improvement untuk mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });


    // ==========================================
    // 2. TYPING EFFECT (Dengan Koma)
    // ==========================================
    const textElement = document.querySelector('.position-text');

    if (textElement) {
        // Koma dimasukkan langsung ke dalam array agar diketik dan dihapus
        const words = ["Hi", "Hola", "Bonjour", "Halo", "Ciao", "Konnichiwa"];
        
        let wordIndex = 0; 
        let charIndex = 0; 
        let isDeleting = false;
        
        function typeWriter() {
            const currentWord = words[wordIndex];

            // Logika Mengetik / Menghapus
            if (isDeleting) {
                textElement.innerText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.innerText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Atur kecepatan
            let typeSpeed = 100; // Ngetik normal

            if (isDeleting) {
                typeSpeed = 40; // Menghapus lebih cepat
            }

            // Atur pergantian kata
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Jeda saat kata selesai diketik
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                
                // Reset ke awal jika sudah di akhir array
                if (wordIndex === words.length) {
                    wordIndex = 0;
                }
                typeSpeed = 500; // Jeda sebelum mengetik kata baru
            }

            setTimeout(typeWriter, typeSpeed);
        }

        textElement.innerText = "";
        typeWriter();
    }


    // ==========================================
    // 3. SCROLL REVEAL ANIMATION
    // ==========================================
    const observerOptions = {
        threshold: 0.07, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hanya animasi satu kali
            }
        });
    }, observerOptions);

    // Menargetkan SEMUA class desain baru (termasuk edu-card, cert-item, dll)
    const animatedElements = document.querySelectorAll('.card-section, .project-item, .exp-timeline-item, .edu-card, .cert-item, .skill-tag');
    
    animatedElements.forEach(el => {
        el.classList.add('hidden'); // Set state awal hidden dari CSS
        observer.observe(el);
    });


    // ==========================================
    // 4. ACTIVE NAV LINK ON SCROLL (SCROLLSPY)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // -150 untuk offset karena navbar kita sticky (menempel di atas)
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Ditambah syarat "current" agar saat di paling atas (home), tidak ada garis yang menyala
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });


    // ==========================================
    // 5. DARK / LIGHT MODE TOGGLE (FIXED 2 SUNS)
    // ==========================================
    // Kita tangkap tombol yang SUDAH ADA di HTML (jangan buat element baru)
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        // Cek preference default dari body HTML
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Update icon awal saat halaman dimuat
        themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

        themeToggleBtn.addEventListener('click', () => {
            // Toggle class dark-mode di tag body
            document.body.classList.toggle('dark-mode');
            
            // Ganti icon berdasarkan state yang aktif
            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Jadi ikon matahari
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Jadi ikon bulan
            }
        });
    }
});