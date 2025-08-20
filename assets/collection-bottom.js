// document.addEventListener("DOMContentLoaded", function() {
//     function toggleDescription() {
//         let descriptionText = document.querySelector(".Collection_description.Rte");
//         let readMoreButton = document.querySelector(".read-more-btn");
//         let readLessButton = document.querySelector(".read-less-btn");

//         if (descriptionText.classList.contains("desc-closed")) {
//             readMoreButton.style.display = "none";
//             readLessButton.style.display = "block";
//         } else {
//             readMoreButton.style.display = "block";
//             readLessButton.style.display = "none";
//         }

//         descriptionText.classList.toggle("desc-closed");
//     }

//     let descriptionText = document.querySelector(".Collection_description.Rte");
//     let readMoreButton = document.querySelector(".read-more-btn");
//     let readLessButton = document.querySelector(".read-less-btn");

//     if (descriptionText.scrollHeight > 90) {
//         descriptionText.classList.add("desc-closed");
//         readMoreButton.style.display = "block";
//     } else {
//         readMoreButton.style.display = "none";
//     }

//     if (readMoreButton) {
//         readMoreButton.addEventListener("click", toggleDescription);
//     }

//     if (readLessButton) {
//         readLessButton.addEventListener("click", toggleDescription);
//     }
// });