


document.addEventListener('DOMContentLoaded', function () {

  // Add a special CSS class when the cart-icon is clicked 
  document.querySelector("#cart-icon").addEventListener("click", function(){
    document.body.classList.toggle("js-show-ajax-cart");


  });
});

// Close cart when clicking on the overlay
function closeCart() {
  document.body.classList.toggle("js-show-ajax-cart");
}


    // Listen for the "liquid-ajax-cart:request-end" event which is fired
    
    // after a Shopify Cart API Ajax request is performed
    document.addEventListener('liquid-ajax-cart:request-end', event => {
        const {requestState} = event.detail;
    
        // If the "add to cart" request is successful
        if (requestState.requestType === 'add' && requestState.responseData?.ok) {
    
        // Add the CSS class to the "body" tag
        document.body.classList.add('js-show-ajax-cart');
    
        // Check if js-ajax-cart-empty is not present on the HTML tag
        if (!document.documentElement.classList.contains("js-ajax-cart-empty")) {
            setTimeout(function(){
            document.querySelector("#shopify-section-cart-recomendations").classList.add("cart-recom-slidein");
            }, 500);
        } else {
            document.querySelector("#shopify-section-cart-recomendations").classList.remove("cart-recom-slidein");
        }
        }
    });
    
    // Close cart when clicking on the overlay
    function closeCart() {
        document.body.classList.toggle("js-show-ajax-cart");
    }


    // terms and conditions with popup

    let modal = document.getElementById("terms-modal");
    let acceptButton = document.getElementById("accept-terms");
    
    document.body.addEventListener('click', function(event) {
        let target = event.target;
        let nameAttr = target.getAttribute('name');
        
        if (nameAttr === 'checkout' || nameAttr === 'goto_pp' || nameAttr === 'goto_gc') {
        let agreeCheckbox = document.getElementById('agree');
        
        if (agreeCheckbox.checked) {
            target.form.submit();
        } else {
            modal.style.display = "block";
            event.preventDefault();
        }
        }
    });
    
    acceptButton.onclick = function() {
        modal.style.display = "none";
        var agreeCheckbox = document.getElementById('agree');
        agreeCheckbox.checked = true;
    
        // Redirect to the checkout page
        window.location.href = '/checkout';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }


    // cart instructions dropdown
    function toggleCartInstructions() {
        var dropdown = document.getElementById('cartInstructionDropdown');
        if (dropdown.classList.contains('hidden')) {
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    }



// PRODUCT ITEM 

document.addEventListener("DOMContentLoaded", function () {
  const colorContainer = document.querySelector(".color_container");
  const productItems = document.querySelectorAll(".Product-item");

  if (colorContainer) {
    const colorLinks = colorContainer.querySelectorAll(".color_link");
    const activeColor = colorContainer.querySelector(".active_color");
    const activeColorName = activeColor.querySelector(".color_name");

    colorLinks.forEach(link => {
      if (link !== activeColor) {
        link.addEventListener("mouseenter", () => {
          activeColorName.classList.add("hidden");
        }); 

        link.addEventListener("mouseleave", () => {
          activeColorName.classList.remove("hidden");
        });
      }
    });
  }

  if (productItems.length > 0) {
    productItems.forEach(item => {
      const colorLinks = item.querySelectorAll(".color_link");
      const activeColorItem = item.querySelector(".active_color");
      const activeColorNameItem = activeColorItem ? activeColorItem.querySelector(".color_name") : null;

      colorLinks.forEach(link => {
        const linkColorName = link.querySelector(".color_name");

        link.addEventListener("mouseenter", () => {
          if (activeColorNameItem) {
            activeColorNameItem.classList.add("hidden");
          }

          if (link !== activeColorItem) {
            linkColorName.classList.remove("hidden");
          }
        });

        link.addEventListener("mouseleave", () => {
          if (activeColorNameItem) {
            activeColorNameItem.classList.remove("hidden");
          }

          if (link !== activeColorItem) {
            linkColorName.classList.add("hidden");
          }
        });
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById("terms-modal");
  let acceptButton = document.getElementById("accept-terms");

  document.body.addEventListener('click', function(event) {
    let target = event.target;
    let nameAttr = target.getAttribute('name');
    
    if (nameAttr === 'checkout' || nameAttr === 'goto_pp' || nameAttr === 'goto_gc') {
      let agreeCheckbox = document.getElementById('agree');
    
      if (agreeCheckbox.checked) {
        target.form.submit();
      } else {
        modal.style.display = "block";
        event.preventDefault();
      }
    }
  });

  acceptButton.onclick = function() {
    modal.style.display = "none";
    var agreeCheckbox = document.getElementById('agree');
    agreeCheckbox.checked = true;

    // Redirect to the checkout page
    window.location.href = '/checkout';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

// cart instructions dropdown
function toggleCartInstructions() {
  var dropdown = document.getElementById('cartInstructionDropdown');
  var arrow = document.getElementById('arrow');
  if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      arrow.classList.remove('arrow-down');
      arrow.classList.add('arrow-up');
  } else {
      dropdown.classList.add('hidden');
      arrow.classList.remove('arrow-up');
      arrow.classList.add('arrow-down');
  }
}


// Faq product 

document.addEventListener("DOMContentLoaded", function() {
  const questions = document.querySelectorAll('.accordion_product .question');

  questions.forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.acc-icon');
      
      if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.classList.add('rotated');
      } else {
        answer.classList.add('hidden');
        icon.classList.remove('rotated');
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  let faqSections = document.querySelectorAll(".faq_section");


  if (faqSections.length > 0) {
    let accordions = document.querySelectorAll(".faq_section .accordion");
  
    accordions.forEach((accordion) => {
      accordion.addEventListener("click", function(e) {
        e.preventDefault();
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
  }
});