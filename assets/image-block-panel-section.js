document.addEventListener('DOMContentLoaded', function () {
    let sliderElement = document.getElementById('image-block-panel-slider');

    function initializeSlider() {
        if (sliderElement) {
            let slides = sliderElement.querySelectorAll('.splide__slide');
            let showArrows = slides.length > 1;

            let collectionNavSlider = new Splide('#image-block-panel-slider', {
                type: 'slide',
                pagination: false,
                drag: 'free',
                gap: 1,
                autoWidth: true,
                lazyLoad: false, 
                flickPower: 300,
                arrows: showArrows,
            });

            collectionNavSlider.mount();
        }
    }

    initializeSlider();
});