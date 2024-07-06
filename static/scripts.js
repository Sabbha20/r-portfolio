
document.addEventListener('DOMContentLoaded', function() {
    fetch('/phrases')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const phrases = data;
            const typingDelay = 100;
            const erasingDelay = 50;
            const newPhraseDelay = 2000; // Delay before starting to type a new phrase
            let phraseIndex = 0;
            let charIndex = 0;

            const dynamicText = document.querySelector('.dynamic-text');
            const cursor = document.querySelector('.cursor');

            function type() {
                if (charIndex < phrases[phraseIndex].length) {
                    if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
                    dynamicText.textContent += phrases[phraseIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingDelay);
                } else {
                    cursor.classList.remove('typing');
                    setTimeout(erase, newPhraseDelay);
                }
            }

            function erase() {
                if (charIndex > 0) {
                    if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
                    dynamicText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, erasingDelay);
                } else {
                    cursor.classList.remove('typing');
                    phraseIndex++;
                    if (phraseIndex >= phrases.length) phraseIndex = 0;
                    setTimeout(type, typingDelay + 1100);
                }
            }

            setTimeout(type, newPhraseDelay + 250);
        })
        .catch(error => console.error('Error fetching phrases:', error));
});
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
document.getElementById('theme-switcher').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    if (sunIcon && moonIcon){
        if (document.body.classList.contains('dark-theme')){
            document.getElementById('moon-icon').style.display = 'none';
            document.getElementById('sun-icon').style.display = 'inline-block';
        }
        else {
            document.getElementById('sun-icon').style.display = 'none';
            document.getElementById('moon-icon').style.display = 'inline-block';
        }
    }
});

