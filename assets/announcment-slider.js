document.addEventListener('DOMContentLoaded', function () {
  
    if (document.getElementById('news_slider')) {
  
      let announcmentSlider = new Splide('#news_slider', {
        destroy: true,
        
        breakpoints: {
          1024: {
            destroy: false,
            type: 'slider',
            perPage: 3,
            autoplay: false,
            interval: 2000,
            pauseOnHover: false,
            arrows: false,
            pagination: false
          },
          768: {
            destroy: false,
            type: 'slider',
            perPage: 2,
            autoplay: false,
            interval: 2000,
            pauseOnHover: false,
            arrows: false,
            pagination: false
          },
          640: {
            destroy: false,
            type: 'slider',
            perPage: 1,
            autoplay: false,
            interval: 2000,
            pauseOnHover: false,
            arrows: false,
            pagination: false
        },
        }
      });
      announcmentSlider.mount();
    }
}); 
  