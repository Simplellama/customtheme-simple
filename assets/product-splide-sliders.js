document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('product_slider')) {
        let main = new Splide('#product_slider', {
            start: 0,
            type: 'slide',
            pagination: false,
            perPage: 1,
            updateOnMove: true,
            arrows: true,
            omitEnd: true,
            gap: 0,
            lazyLoad: 'nearby',
            autoHeight: true,
            cover: true,
            breakpoints: {
                '768': { 
                    flickPower: 300,
                    focus: 'center',
                }
            },
        });

        main.mount();

        // Check if there is more than one slide
        if (main.length > 1) {
            let thumbnails = new Splide('#thumbnail-slider', {
                type: 'slide',
                start: 0, 
                gap: 10,
                perPage: 6,
                rewind: true,
                easing: 'ease',
                trimSpace: true,
                cover: true,
                pagination: false,
                isNavigation: true,
                arrows: false,
                wheelSleep: 10,
                speed: 1000,
                updateOnMove: true,
                lazyLoad: 'nearby',
                focus: main.length >= 6 ? 'center' : false // Focus center if 6 or more slides
            });

            thumbnails.on('mounted move', function () {
                let end = thumbnails.Components.Controller.getEnd() + 1;
                let rate = Math.min((thumbnails.index + 1) / end, 1);
                document.querySelector('#thumbnail-slider .splide-progress-bar').style.width = String(100 * rate) + '%';
            });

            thumbnails.mount();
            main.sync(thumbnails);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () { 
    const gallery = document.getElementById('product_slider');
    if (gallery) {
        new SimpleLightbox('#product_slider a', {
            history: true,
            alertError: false,
            additionalHtml: false,
            loop: true,
            overlayOpacity: 1,
            doubleTapZoom: 2,
            fadeSpeed: 50,
            animationSpeed: 50,
            swipeClose: false,
            enableZoom: true
        });
    }
});