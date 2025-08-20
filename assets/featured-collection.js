// document.addEventListener('DOMContentLoaded', function () {
//     new Splide('#splide{{ section.id }}', {
//         perPage: 4,
//         perMove: 1,
//         gap: '1rem',
//         arrows: true,
//         pagination: false,
//         noDrag: '.bundle-card-slider',
//         breakpoints: {
//         1200: {
//             perPage: 3,
//         },
//         1024: {
//             perPage: 2, 
//         },
//         640: {
//             perPage: 1,
//             gap: '5px'
//         },
//         }
//     }).mount();

//     function checkUrlAndUpdate() {
//         let urlSearchParams = new URLSearchParams(window.location.search);
//         let pageParameterValue = urlSearchParams.get('page');
//         let filterPresent = window.location.search.includes('filter');

//         let featuredCollectionElement = document.querySelector('.Featured_collection');
//         if (featuredCollectionElement) {
//         if ((pageParameterValue === '1' || (!pageParameterValue && !filterPresent)) && !filterPresent) {
//             featuredCollectionElement.classList.remove('hidden');
//         } else {
//             featuredCollectionElement.classList.add('hidden');
//         }
//         }
//     }

//     // Call the function initially
//     checkUrlAndUpdate();

//     // Call the function when the URL changes
//     window.addEventListener('popstate', checkUrlAndUpdate);
// });