document.addEventListener('DOMContentLoaded', (event) => {
const socialSlider = document.querySelector('.social_slider_section');
    if (socialSlider) {

    let social_slider = new Splide( '#social_slider', {  
      type   : 'loop', 
      pagination  : false,
      arrows: false, 
      focus: 'center',
      isNavigation: false, 
      gap: 10,  
      drag: 'free',
      fixedWidth: 400, 
      lazyLoad: true,
      autoScroll: {
        speed: 2,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
      breakpoints: {
        640: {
          fixedWidth: 300,
          gap: 5
        },
      } 
    }); 

    social_slider.mount(window.splide.Extensions);
  }
});