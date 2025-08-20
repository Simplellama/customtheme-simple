document.addEventListener('DOMContentLoaded', function () {
    const imageGridSliders = document.querySelectorAll('.image_grid_slider');
    const bannerGridSliders = document.querySelectorAll('.banner_grid_slider');

    imageGridSliders.forEach(slider => {
        let imageGridSlider = new Splide(slider, {
            type: 'slide',
            gap: '1.5rem',
            arrows: true,
            pagination: false,
            autoWidth: true,
            padding: { left: '2rem', right: 0 },
            breakpoints: {
              768: {
                focus: 'center',
              }
            }
          });
        imageGridSlider.mount();
    });

    bannerGridSliders.forEach(slider => {
        let bannerGridSlider = new Splide(slider, {
            type: 'loop',
            focus: 'center',
            autoWidth: true,
            gap: '1.5rem',
            arrows: false,
            pagination: false,
            autoScroll: {
                speed: 0.1,
            }
        });
        bannerGridSlider.mount(window.splide.Extensions);
    });
});
