document.addEventListener('DOMContentLoaded', () => {
    // 1. تغيير تنسيق النافبار عند التمرير لأسفل
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 24px';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
        } else {
            header.style.padding = '16px 24px';
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // 2. كاشف التمرير لتحديد الرابط الفعال تلقائياً (ScrollSpy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. إضافة تأثيرات الظهور التدريجي أثناء التمرير باستخدام IntersectionObserver
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // إيقاف المراقبة بعد ظهور العنصر لمنع تكرار الأنيميشن عند صعود الصفحة ونزولها
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة بطاقات المبادئ
    const cards = document.querySelectorAll('.animate-up');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        animateOnScrollObserver.observe(card);
    });

    // مراقبة بنود سياسة البيانات
    const policyItems = document.querySelectorAll('.animate-left');
    policyItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        animateOnScrollObserver.observe(item);
    });

    // مراقبة قسم التواصل
    const contactElements = document.querySelectorAll('.animate-fade');
    contactElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease-out';
        animateOnScrollObserver.observe(el);
    });

    // إضافة الكلاس المساعد للظهور
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-up.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .animate-left.visible {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        .animate-fade.visible {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
});
