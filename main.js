document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle (Memindahkan logic lama ke sini)
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".navbar a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Tutup menu saat link diklik (UX improvement untuk mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

// 2. Typing Effect (Looping dengan Backspace)
    const textElement = document.querySelector('.position-text');
    if (textElement) {
        const text = textElement.innerText;
        let i = 0;
        let isDeleting = false;
        
        function typeWriter() {
            // Jika sedang mode menghapus (isDeleting)
            if (isDeleting) {
                textElement.innerText = text.substring(0, i - 1);
                i--;
            } 
            // Jika sedang mode mengetik
            else {
                textElement.innerText = text.substring(0, i + 1);
                i++;
            }

            // Atur kecepatan
            let typeSpeed = 100; // Kecepatan mengetik normal

            if (isDeleting) {
                typeSpeed = 50; // Menghapus lebih cepat
            }

            // Logika Pergantian Mode
            if (!isDeleting && i === text.length) {
                // Kalau sudah selesai mengetik, diam dulu 2 detik sebelum menghapus
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && i === 0) {
                // Kalau sudah selesai menghapus, diam dulu 0.5 detik sebelum mengetik ulang
                isDeleting = false;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Mulai fungsi
        typeWriter();
    }

    // 3. Scroll Reveal Animation (Muncul saat di-scroll)
    const observerOptions = {
        threshold: 0.15, // Muncul ketika 15% elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hanya animasi sekali
            }
        });
    }, observerOptions);

    // Targetkan elemen yang ingin dianimasikan
    const animatedElements = document.querySelectorAll('.card-section, .project-item, .experience-item, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('hidden'); // Set state awal hidden
        observer.observe(el);
    });

    // 4. Active Navigation Link on Scroll (ScrollSpy)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -150 untuk offset navbar
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });

    // 5. Dark/Light Mode Toggle
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle';
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Default icon (untuk pindah ke light)
    document.querySelector('.nav-container').appendChild(themeToggleBtn);

    // Cek preference user atau default ke dark mode sesuai HTML awal
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update icon awal
    if(isDarkMode) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Ganti icon
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});