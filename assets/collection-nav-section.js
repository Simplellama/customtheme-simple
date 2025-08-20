document.addEventListener('DOMContentLoaded', function () {
    let sliderElement = document.getElementById('collection_nav_slider');
    let containerElement = document.querySelector('.collection_nav_slider_container');
  
    function updateArrowsVisibility(slider) {
      let prevArrow = slider.querySelector('.splide__arrow--prev');
      let nextArrow = slider.querySelector('.splide__arrow--next');
      let arrowsElement = slider.querySelector('.splide__arrows');
      let slideCount = slider.querySelectorAll('.splide__slide').length;
  
      if (arrowsElement) {
        if (prevArrow && nextArrow) {
          let prevDisabled = prevArrow.hasAttribute('disabled');
          let nextDisabled = nextArrow.hasAttribute('disabled');
  
          if (prevDisabled && nextDisabled) {
            arrowsElement.classList.add('!hidden');
            if (containerElement) {
              containerElement.classList.remove('pr-0');
            }
          } else {
            arrowsElement.classList.remove('!hidden');
            if (containerElement) {
              containerElement.classList.add('pr-0');
            }
          }
        }

      }
    }
  
    if (sliderElement) {
      let collectionNavSlider = new Splide('#collection_nav_slider', {
        type: 'slide',
        omitEnd: true,
        pagination: false,
        drag: 'free',
        gap: 1,
        autoWidth: true,
        lazyLoad: false,
        flickPower: 300,
        arrows: true,
        padding: {
            right: '15px',
            left: '15px',
            },
      });
      
  
      collectionNavSlider.on('mounted moved', function () {
        updateArrowsVisibility(sliderElement);
      });
  
      collectionNavSlider.mount();
  
      // Initial update of arrows visibility
      updateArrowsVisibility(sliderElement);
  
      // Update arrows visibility on resize
      window.addEventListener('resize', function () {
        updateArrowsVisibility(sliderElement);
      });
    }
  });


  document.addEventListener('DOMContentLoaded', function () {
    let sliderElement = document.getElementById('image-block-panel-slider');
  
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
        arrows: showArrows
      });

      collectionNavSlider.mount();
    }
  });