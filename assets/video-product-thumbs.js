  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('prod_video_thumb_slider')) {

      let prodVideoThumbSlider = new Splide('#prod_video_thumb_slider', {
            type: 'slide',
            perPage: 5,
            perMove: 1,
            gap: 10,
            drag: "free",
            interval: 4000,
            autoplay: true,
            pauseOnHover: false,
            arrows: true,
            pagination: false,
            breakpoints: {
              640: {
                perPage: 3,
              },
              1024: {
                perPage: 3,
              },
              1280: {
                perPage: 4,
              }
            }
  
        
      });
      prodVideoThumbSlider.mount();
    };
});

