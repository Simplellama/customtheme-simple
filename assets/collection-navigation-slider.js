document.addEventListener('DOMContentLoaded', function () {
  let sliderElement = document.getElementById('collection_nav_slider');

  if (sliderElement) {
    let perPage = 9;
    let items = sliderElement.querySelectorAll('.splide__slide').length;

    // If there are less items than perPage, set perPage to items
    if (items < perPage) {
      perPage = items;
    }

    let collectionNavSlider = new Splide('#collection_nav_slider', {
      type: 'slide',
      perPage: perPage,
      omnitEnd: true,
      pagination: false,
      drag: 'free',
      snap   : true,
      gap: 10,
      lazyLoad: false, 
      flickPower: 300,
      breakpoints: {
        1280: {
            perPage: 7,
        },
        1024: {
            perPage: 5,
        },
        768: {
            perPage: 5,
        },
        640: {
          perPage: 4,
          gap: 2,
        }
      }
    });

    collectionNavSlider.on('mounted', function() {
      let splideList = sliderElement.querySelector('.splide__list');

      function adjustSplideList() {
        // If the viewport width is less than or equal to 640px
        if (window.innerWidth <= 640) {
         
          splideList.classList.remove('justify-end');
          splideList.classList.add('justify-start');
        } else {
          if (items <= perPage) { 
            splideList.classList.add('justify-end');
            splideList.classList.remove('justify-start');
          } else {
            splideList.classList.remove('justify-end');
            splideList.classList.add('justify-start');
          }
        }
      }

      // Call adjustSplideList function initially
      adjustSplideList();

      // Add event listener for resize event
      window.addEventListener('resize', adjustSplideList);
    });

    collectionNavSlider.mount();
  }
});