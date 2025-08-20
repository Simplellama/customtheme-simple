document.addEventListener('DOMContentLoaded', function () {
    new Splide('#text-slider', {
        type: 'loop',
        focus: 'center',
        autoWidth: true,
        gap: '3rem', 
        arrows: false,
        pagination: false,
     
        autoScroll: {
            speed: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
          }
    }).mount(window.splide.Extensions);
});