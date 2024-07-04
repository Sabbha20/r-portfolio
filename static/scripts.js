console.log("Sabbha")
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

