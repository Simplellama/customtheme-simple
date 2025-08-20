document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll('.lazyloadVideo');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const sources = JSON.parse(video.dataset.sources);

            if (entry.isIntersecting) {
                if (!video.dataset.sourceAppended) {
                    sources.forEach(sourceInfo => {
                        const source = document.createElement('source');
                        source.src = sourceInfo.url;
                        source.type = sourceInfo.mime_type;
                        video.appendChild(source);
                    });
                    video.dataset.sourceAppended = 'true';
                    video.load();
                }
                if (video.paused) {
                    video.play();
                }
            } else if (!video.paused) {
                video.pause();
            }
        }); 
    }, {
        rootMargin: '200px 0px',
        threshold: 0.5
    });

    videos.forEach(video => {
        observer.observe(video);
    });
});