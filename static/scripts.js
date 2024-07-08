document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.banner');
    const items = document.querySelectorAll('.banner-item');
    const [prevBtn, nextBtn] = ['.prev', '.next'].map(selector => document.querySelector(selector));
    const [sunIcon, moonIcon] = ['sun-icon', 'moon-icon'].map(id => document.getElementById(id));
    const themeSwitcher = document.getElementById('theme-switcher');
    const dynamicText = document.querySelector('.dynamic-text');
    const cursor = document.querySelector('.cursor');
    let currentIndex = 0;
    let currentGradient = 1;
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

    [
        [prevBtn, prevSlide],
        [nextBtn, nextSlide],
        [themeSwitcher, toggleTheme]
    ].forEach(([element, handler]) => element.addEventListener('click', handler));

    setInterval(nextSlide, 6100);

    function updateLottieTheme() {
        const filter = document.body.classList.contains('dark-theme') ? 'invert(1)' : 'none';
        document.querySelectorAll('lottie-player').forEach(player => player.style.filter = filter);
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        [moonIcon, sunIcon].forEach(icon => icon.style.display = icon.style.display === 'none' ? 'inline-block' : 'none');
        updateLottieTheme();
        cycleGradient();
    }

    function cycleGradient() {
        currentGradient = (currentGradient % 8) + 1;
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        document.body.style.background = `var(--${theme}-gradient-${currentGradient})`;
    }

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

    updateLottieTheme();
    setInterval(cycleGradient, 1000000);
});
