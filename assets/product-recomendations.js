document.addEventListener('DOMContentLoaded', function () {
    const productRecommendationsSection = document.querySelector('.product-recommendations');
    const observer = new IntersectionObserver(handleIntersection, { rootMargin: '0px 0px 1000px 0px' });

    observer.observe(productRecommendationsSection);

    function handleIntersection(entries, observer) {
        if (!entries[0].isIntersecting) return;

        observer.unobserve(productRecommendationsSection);

        const url = productRecommendationsSection.dataset.url;

        fetch(url)
            .then(response => response.text())
            .then(text => {
                const html = document.createElement('div');
                html.innerHTML = text;
                const recommendations = html.querySelector('.product-recommendations');

                if (recommendations) {
                    // Append the fetched recommendations to the product-recommendations section
                    productRecommendationsSection.innerHTML = recommendations.innerHTML;

                    // Now that the product data is available, initialize the Splide slider
                    initializeSplideSlider();
                }
            })
            .catch(e => {
                console.error(e);
            });
    }

    function initializeSplideSlider() {
        new Splide('#product-recommendations_slider', {
            perPage: 4,
            perMove: 1,
            drag: 'free',
            arrows: true,
            omnitEnd: true,
            pagination: false,
            breakpoints: {
                1200: {
                    perPage: 3,
                },
                1024: {
                    perPage: 2, 
                },
                768: { 
                    perPage: 2,
         
                },
                640: {
                    perPage: 2,
           
                },
            }
        }).mount();
    }
});
