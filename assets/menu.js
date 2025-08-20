document.addEventListener('DOMContentLoaded', function () {
    const headerSection = document.querySelector('.Header_section');
    const mainElement = document.querySelector('.main-section');
    let lastScrollTop = 0;

    function updatePadding() {
      if (!document.querySelector('.transparent-header') && headerSection && mainElement) {
        const headerHeight = headerSection.offsetHeight;
        mainElement.style.paddingTop = `${headerHeight}px`;
      }
    }
  
    function updatePaddingAndTop() {
      if (!document.querySelector('.transparent-header') && headerSection) {
        const headerHeight = headerSection.offsetHeight;
        const paddingTopValue = `${headerHeight}px`;
        const topValue = `${headerHeight + 10}px`;
  
        // Create a <style> element
        const style = document.createElement('style');
        style.innerHTML = `
          .padding-top {
            padding-top: ${paddingTopValue};
          }
          .top-position {
            top: ${topValue}; 
          }
        `;
  
        // Append the <style> element to the <head> of the document
        document.head.appendChild(style);
      }
    }

    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        headerSection.style.top = `-${headerSection.offsetHeight}px`;
        headerSection.style.transition = 'top 0.3s ease-in-out';
      } else {
        // Scrolling up
        headerSection.style.top = '0';
        headerSection.style.transition = 'top 0.3s ease-in-out';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }
  
    // Call the functions when the page loads
    updatePadding();
    updatePaddingAndTop();
  
    // Call the functions when the window is resized
    window.addEventListener('resize', updatePadding);
    window.addEventListener('resize', updatePaddingAndTop);
  
    // Observe changes to the size of the headerSection
    const resizeObserver = new ResizeObserver(updatePadding);
    resizeObserver.observe(headerSection);
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  });
  
  // document.addEventListener('DOMContentLoaded', function () {
  //   const mainSection = document.querySelector('.frontpage'); 
  //   if (mainSection) {

  //     // Apply bg-primary-bg on load only if page is not scrolled
  //     // Apply bg-primary-bg if page is initially scrolled
  //     if (window.scrollY >= 0.05) {
  //       mainSection.classList.remove('bg-secondary-bg');
  //       mainSection.classList.add('bg-primary-bg');
  //     } else {
  //       mainSection.classList.add('bg-secondary-bg');
  //     }
    
  //     window.addEventListener('scroll', () => {
  //         const scrollPosition = window.scrollY;
  //         const targetPositionMain = window.innerHeight * 0.05; 

  //         if (scrollPosition >= targetPositionMain) {
  //           mainSection.classList.remove('bg-secondary-bg'); 
  //           mainSection.classList.add('bg-primary-bg');
  //         } else {
  //           mainSection.classList.remove('bg-primary-bg');
  //           mainSection.classList.add('bg-secondary-bg');
  //         }
  //     });
  //   }
  // });

