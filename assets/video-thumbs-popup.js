document.addEventListener("DOMContentLoaded", function () {
  const videoLinks = document.querySelectorAll(".video-link");
  const closeButtons = document.querySelectorAll(".closePopupProdVideo");
  const overlay = document.querySelector(".popup-overlay");
  const videoPopups = document.querySelectorAll(".video-popup");

  videoLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup(index + 1); 

      if (videoUrls[index]) {
        const video = document.querySelector("#video-" + (index + 1));
        const videoSources = video.querySelectorAll("source");

        // Update the video sources based on the data from videoUrls array
        videoSources[0].src = videoUrls[index].source0;
        videoSources[1].src = videoUrls[index].source1;
        video.load();
        video.play();
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      closePopup();
    });

    overlay.addEventListener("click", function () {
      closePopup();
    });
  });

  function openPopup(index) {
    const popup = document.querySelector(".product-video-pop-" + index);
    if (popup) {
      popup.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  }

  function closePopup() {
    videoPopups.forEach((popup) => {
      const video = popup.querySelector("video");
      if (video) {
        video.pause();
      }
      popup.classList.add("hidden");
    });
    overlay.classList.add("hidden");
  }
});