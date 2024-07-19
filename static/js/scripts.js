document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const [sunIcon, moonIcon] = ['sun-icon', 'moon-icon'].map(id => document.getElementById(id));
    let currentGradient = 1;

    // Set initial theme based on localStorage or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Always add event listener to theme switcher
    themeSwitcher && themeSwitcher.addEventListener('click', toggleTheme);

    function updateLottieTheme() {
        const filter = document.body.classList.contains('dark-theme') ? 'invert(1)' : 'none';
        document.querySelectorAll('lottie-player').forEach(player => player.style.filter = filter);
    }

    function setTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme + '-theme');
        if (moonIcon && sunIcon) {
            moonIcon.style.display = theme === 'light' ? 'inline-block' : 'none';
            sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
        }
        localStorage.setItem('theme', theme);
        updateLottieTheme();
        cycleGradient();
    }

    function toggleTheme() {
        const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        setTheme(newTheme);
    }

    function cycleGradient() {
        currentGradient = (currentGradient % 8) + 1;
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        document.body.style.background = `var(--${theme}-gradient-${currentGradient})`;
    }

    updateLottieTheme();
    setInterval(cycleGradient, 1000000);

    // Homepage-specific code
    if (document.querySelector('.banner')) {
        const banner = document.querySelector('.banner');
        const items = document.querySelectorAll('.banner-item');
        const [prevBtn, nextBtn] = ['.prev', '.next'].map(selector => document.querySelector(selector));
        const dynamicText = document.querySelector('.dynamic-text');
        const cursor = document.querySelector('.cursor');
        let currentIndex = 0;
        let phraseIndex = 0;
        let charIndex = 0;

        const showItem = index => banner.style.transform = `translateX(-${index * 100}%)`;
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        };

        [prevBtn, nextBtn].forEach((btn, index) => btn.addEventListener('click', index === 0 ? prevSlide : nextSlide));

        setInterval(nextSlide, 6100);

        // Fetching phrases and typing animation (only on homepage)
        fetch('/phrases')
            .then(response => response.json())
            .then(phrases => {
                function type() {
                    if (charIndex < phrases[phraseIndex].length) {
                        cursor.classList.add('typing');
                        dynamicText.textContent += phrases[phraseIndex][charIndex++];
                        setTimeout(type, 100);
                    } else {
                        cursor.classList.remove('typing');
                        setTimeout(erase, 2000);
                    }
                }

                function erase() {
                    if (charIndex > 0) {
                        cursor.classList.add('typing');
                        dynamicText.textContent = phrases[phraseIndex].substring(0, --charIndex);
                        setTimeout(erase, 50);
                    } else {
                        cursor.classList.remove('typing');
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        setTimeout(type, 1200);
                    }
                }

                setTimeout(type, 2250);
            })
            .catch(error => console.error('Error fetching phrases:', error));
    }
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Here you would typically send the form data to your server
    // For now, we'll just show an alert
    alert('Thank you for your message! We\'ll get back to you soon.');

    // Clear the form
    this.reset();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});