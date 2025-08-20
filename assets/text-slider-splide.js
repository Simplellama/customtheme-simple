document.addEventListener('DOMContentLoaded', function () {
    var sliders = document.querySelectorAll('.text-slider');

    sliders.forEach(function(slider) {
        new Splide(slider, {
            type: 'loop',
            focus: 'center',
            autoWidth: true,
            gap: '3rem', 
            arrows: false,
            pagination: false,
            autoScroll: {
                speed: 0.2,
            }
        }).mount(window.splide.Extensions);
    });
});