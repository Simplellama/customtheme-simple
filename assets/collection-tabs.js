document.addEventListener("DOMContentLoaded", function () {
    const splideElements = document.querySelectorAll('.col-splide-tab');
    
        splideElements.forEach(function (splideElement) {
            let splideTabs = new Splide(splideElement, {
                autoWidth: true,
                pagination: false,
                
            });
    
            splideTabs.mount();
        });
    
        const tabLinks = document.querySelectorAll('[data-tab-index]');
        const tabContents = document.querySelectorAll('.tab-content');
    
        tabLinks.forEach(function (tabLink) {
        tabLink.addEventListener("click", function (e) {
            e.preventDefault();
            const tabIndex = this.getAttribute("data-tab-index");
    
            // Hide all tab contents
            tabContents.forEach(function (content) {
                content.style.display = "none";
            });
    
            // Remove the "bold" class from all tab links
            tabLinks.forEach(function (link) {
                link.classList.remove("font-bold");
            });
    
            // Show the selected tab content
            document.getElementById(`tabs-${tabIndex}`).style.display = "flex";
    
            // Add the "bold" class to the clicked tab link
            this.classList.add("font-bold");
            });
    
            // Show the first tab by default
            if (tabLinks.length > 0) {
            tabLinks[0].click();
            }
        });
    });