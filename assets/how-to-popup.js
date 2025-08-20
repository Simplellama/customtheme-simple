//POPUP 
document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('popup-container');
    const popupVideo = document.querySelector('#popup-video video');
    const closeBtn = document.getElementById('close-btn');
    const popupOverlay = document.getElementById('popup-overlay');

    const howToSection = document.querySelector('.how-to-section');
    howToSection.addEventListener('click', function(event) {
        if (!event.target.classList.contains('close-icon')) {
            popupContainer.style.display = 'block';
            popupVideo.muted = false;
            popupVideo.play();
        }
    });

    closeBtn.addEventListener('click', function() {
        popupContainer.style.display = 'none';
        popupVideo.pause();
        popupVideo.currentTime = 0;
    });

    popupOverlay.addEventListener('click', function() {
        popupContainer.style.display = 'none';
        popupVideo.pause();
        popupVideo.currentTime = 0;
    });
});

//CLOSE BUTTON
const closeIcon = document.querySelector('.close-icon');

// Attach a click event listener to the close icon
closeIcon.addEventListener('click', () => {
    const section = closeIcon.closest('.how-to-section');
    if (section) {
        section.remove();
    }
});
