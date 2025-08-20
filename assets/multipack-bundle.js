document.addEventListener("DOMContentLoaded", function () {
  // Get references to the trigger elements, popups, and overlay
  const triggerElements = document.querySelectorAll(".bundle-button");
  const popups = document.querySelectorAll(".bundle-popup");
  const overlay = document.querySelector("#bundle-popup-overlay");

  // Function to update the URL with selected product variants
  function updateURLWithVariants() {
    const selectedOptions = collectSelectedOptions();
    const variantIds = selectedOptions.join(','); // Join selected options as comma-separated string
    const currentURL = window.location.href;
    const updatedURL = currentURL.split('?')[0] + `?variant_ids=${variantIds}`;
    window.history.replaceState({}, document.title, updatedURL); // Update URL without page refresh
  }
  

  // Function to open a specific popup
  function openPopup(index) {
    popups.forEach((popup, i) => {
      if (i === index) {
        popup.classList.add("translate-x-0");
        popup.classList.remove("translate-x-full");
        overlay.classList.remove("hidden"); // Show the overlay
      } else {
        popup.classList.remove("translate-x-0");
        popup.classList.add("translate-x-full");
      }
    });
    document.body.classList.add('body-no-scroll'); // Add .body-no-scroll class to the body
  }

  // Function to close all popups
  function closePopups() {
    popups.forEach((popup) => {
      popup.classList.remove("translate-x-0");
      popup.classList.add("translate-x-full");
    });
    overlay.classList.add("hidden"); // Hide the overlay
    document.body.classList.remove('body-no-scroll'); // Remove .body-no-scroll class from the body
  }

  function collectSelectedOptions() {
    const selectedOptions = [];
    const bundleProductLists = document.querySelectorAll(".bundle-products-list");
  
    bundleProductLists.forEach((bundleProductList) => {
      const selectedOption = bundleProductList.querySelector("select[data-product-select]");
      const selectedValue = selectedOption.value;
      selectedOptions.push(selectedValue);
    });
  
    return selectedOptions;
  }
  
  // Function to update the selected options and properties input
  function updateSelectedOptions() {
    const selectedOptions = collectSelectedOptions();
    console.log('Selected Options:', selectedOptions); // Log selected options

    const propertiesInput = document.querySelector('input[name="properties[_Bundle]"]');
    console.log('Properties Input:', propertiesInput); // Log properties input

    if (propertiesInput) {
      propertiesInput.value = JSON.stringify(selectedOptions);
      console.log('Updated Properties Input Value:', propertiesInput.value); // Log updated value
    }
  }


  // Add change event listeners to select elements within .bundle-products-list
  const bundleProductSelects = document.querySelectorAll(".bundle-products-list select[data-product-select]");
  bundleProductSelects.forEach((select) => {
    select.addEventListener("change", function () {
      updateSelectedOptions();
      updateURLWithVariants();
    });
  });

  // Add click event listeners to trigger elements
  triggerElements.forEach((trigger, index) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openPopup(index);
    });
  });

  // Add click event listener to close buttons within popups
  const closeButtons = document.querySelectorAll(".close-popup-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      closePopups();
    });
  });

  // add click event to overlay
  overlay.addEventListener("click", function () {
    closePopups();
  });

  // Add click event listener to "Add to bundle" buttons within popups
  const addToBundleButtons = document.querySelectorAll(".add-to-bundle");
  addToBundleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const popup = button.closest(".bundle-popup");
      const popupIndex = popup.getAttribute("data-loop-id");
      const bundleProduct = document.querySelector(`.bundle-product[data-loop-index="${popupIndex}"]`);

      if (bundleProduct) {
        // Get the data from the clicked "Add to bundle" button
        const image = button.getAttribute("data-popup-image");
        const title = button.getAttribute("data-popup-title");
        const selectedOption = button.previousElementSibling; // Get the select element
        const selectedValue = selectedOption.value;

        // Update the bundle product with the retrieved data and selected option
        let activeBundleImage = bundleProduct.querySelector(".active-bundle-image");
        activeBundleImage.src = image;
        activeBundleImage.removeAttribute("srcset");
        bundleProduct.querySelector(".bundle-title").textContent = title;

        // Replace the bundle product's select with the selected option
        const productSelect = bundleProduct.querySelector("select[data-product-select]");
        productSelect.innerHTML = selectedOption.outerHTML;



        // Set the selected attribute for the corresponding option
        const options = productSelect.querySelectorAll("option");
        options.forEach((option) => {
          if (option.value === selectedValue) {  
            option.setAttribute("selected", "selected");
          } else {
            option.removeAttribute("selected");
          }
        });

        

        // Get all elements with the no_select and selected classes
        let selectedElements = document.querySelectorAll('.no_select.selected');
        if (selectedElements) {
          // Loop through each selected element
          selectedElements.forEach(selectedElement => {
            // Remove the selected class
            selectedElement.classList.remove("selected");
            // Add the updated_select class
            selectedElement.classList.add("updated_select");

            // Get the .bundle_updated_text and .select-hover-text elements within the current selection
            let updatedTextElement = selectedElement.querySelector('.bundle_updated_text');
            let selectHoverText = selectedElement.querySelector('.select-hover-text');
            let bundleSelectHover = selectedElement.querySelector('.bundle_selecte_hover');

            // If the .bundle_updated_text and .select-hover-text elements exist
            if (updatedTextElement && selectHoverText) {
              // Remove the hidden class from the .bundle_updated_text element
              updatedTextElement.classList.remove("hidden");
              // Add the hidden class to the .select-hover-text element
              selectHoverText.classList.add("hidden");
              bundleSelectHover.classList.add("-top-full", "group-hover:top-0");
              bundleSelectHover.classList.remove("top-0");
            }

            // Get the current index from the data-noselect-index attribute
            let currentIndex = parseInt(selectedElement.getAttribute('data-noselect-index'));

            // Find the next no_select element using the data-noselect-index attribute
            let nextElement = document.querySelector(`.no_select[data-noselect-index="${currentIndex + 1}"]`);

            // If the next element exists and it has the disabled_select class
            if (nextElement && nextElement.classList.contains("disabled_select")) {
              // Remove the disabled_select class
              nextElement.classList.remove("disabled_select");
              // Add the selected class
              nextElement.classList.add("selected");
            }
          }); 

          // Function to update the count in the button
          function updateCount(count) {
            // Get the span element with the class "prod-count"
            let countElement = document.querySelector('.prod-count');
            // Update the content of the span element with the new count
            countElement.textContent = count;
          }

          // Function to enable/disable the button based on the count
          function updateButtonState() {
            // Get the number of elements with the class "updated_select"
            let updatedSelectCount = document.querySelectorAll('.updated_select').length;

            // Get the number of elements with the class "no_select"
            let noSelectCount = document.querySelectorAll('.no_select').length;

            // Calculate the difference
            let remainingCount = noSelectCount - updatedSelectCount;

            // Get the bundle button
            let bundleButton = document.getElementById('bundle-button');

            // Check if the remaining count is 0 or less
            if (remainingCount <= 0) {
                // Remove the "disabled" class from the button
                bundleButton.classList.remove("disabled");
                // Set the count to 0 to prevent negative values
                remainingCount = 0;
            } else {
                // Add the "disabled" class to the button
                bundleButton.classList.add("disabled");
            }

            // Update the count in the button
            updateCount(remainingCount);
          }


          const selectedText = selectedOption.options[selectedOption.selectedIndex].text;
          // Get all select elements with the class 'bundle-prod-option'
          const popupSelects = document.querySelectorAll('.bundle-prod-option');
  
          // Loop through each select element
          Array.from(popupSelects).forEach((select) => {
            // Find the option with the selected text
            const option = Array.from(select.options).find(option => option.text.trim() === selectedText.trim());
  
            // If the option exists and is not disabled, update the value of the select element
            if (option && !option.disabled) {
              select.value = option.value;
            }
          });

          // Call updateButtonState() initially and whenever an element is selected or updated
          updateButtonState();
        }

        // Close the popup
        closePopups();

        // Collect and update the selected options
        const selectedOptions = collectSelectedOptions();
        const propertiesInput = document.querySelector('input[name="properties[_Bundle]"]');
        console.log(selectedOptions);
        console.log(propertiesInput);
        if (propertiesInput) {
          propertiesInput.value = JSON.stringify(selectedOptions);
        }

        updateURLWithVariants();
      } else {
        // Handle the case where no corresponding .bundle-product is found
        console.log("Corresponding bundle product not found!");
      }
    });
  });


  // Look for out of stock products and disable them 
  
    // Function to check if all options in a select are disabled
    function areAllOptionsDisabled(select) {
      const options = select.querySelectorAll("option");
      for (const option of options) {
        if (!option.disabled) {
          return false;
        }
      }
      return true;
    }
  
    // Function to update the class of bundle-list-item-popup
    function updateOutOfStockClass() {
      const bundleListItemPopups = document.querySelectorAll(".bundle-list-item-popup");
      bundleListItemPopups.forEach((popup) => {
        const select = popup.querySelector("select[data-product-select]");
        if (select && areAllOptionsDisabled(select)) {
          popup.classList.add("out-of-stock");
        } else {
          popup.classList.remove("out-of-stock");
        }
      });
    }
  
    // Add change event listeners to select elements within .bundle-prod-option
    const bundleProdOptions = document.querySelectorAll(".bundle-prod-option");
    bundleProdOptions.forEach((select) => {
      select.addEventListener("change", function () {
        updateOutOfStockClass();
      });
    });
  
    // Initial update of the out-of-stock class
    updateOutOfStockClass();
    
});
