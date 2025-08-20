function initializeLookProduct(productContainer) {
    // Retrieve color data for the current product container
    let colorData = document.querySelector("[data-look-colors-json]");
    
    if (colorData) {
        const lookColors = JSON.parse(colorData.innerHTML).lookColorsArray;
        
        // Add a click event listener to color links within the product container
        productContainer.querySelectorAll('.color_link').forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                // Retrieve data from the clicked link
                let clickedProductId = link.getAttribute('data-look-product-id');
                let clickedColorId = link.getAttribute('data-color-id');
                // console.log('Clicked Product ID:', clickedProductId);
                // console.log('Clicked Color ID:', clickedColorId);

                // Find the corresponding data in the lookColors JSON based on productId
                let selectedProductData = lookColors[clickedProductId];
                // console.log('Selected Product Data:', selectedProductData);

                // Declare and initialize selectedVariantId
                let selectedVariantId = null;

                // Check if the selected product data exists
                if (selectedProductData) {

                    // Find the data for the clicked color ID inside the selected product data
                    let selectedColorData = selectedProductData.prodcolors.find(function (color) {
                        return color.hasOwnProperty(clickedColorId);
                    });

                    // Access the object inside selectedColorData using colorId
                    let colorData = selectedColorData[clickedColorId];
                    // console.log('Color Data:', colorData);

                    // Update the look_image and color-title element in the productContainer
                    let lookImageElement = productContainer.querySelector('.look_image');
                    let colorTitleElement = productContainer.querySelector('.color-title');

                    if (lookImageElement && colorTitleElement) {
                        lookImageElement.src = colorData.LookImage;
                        lookImageElement.srcset = ""; // This will remove the srcset attribute

                        colorTitleElement.textContent = colorData.colorTitle; 
         
                    } else {
                        console.error('look_image element or color-title element not found in product container.');
                    }

                    // Update the select element
                    let variantSelect = productContainer.querySelector('select[name="id"]');
                    if (variantSelect) {
                        // Get the currently selected variant ID
                        let selectedVariantId = variantSelect.value;

                        // Clear existing options
                        variantSelect.innerHTML = '';

                        // Loop through the variants in the selected color data and add options
                        colorData.variants.forEach(function (variant) {
                            let option = document.createElement('option');
                            option.value = variant.variantId;
                            option.textContent = variant.variantTitle;

                            if (variant.variantId === selectedVariantId) {
                                option.setAttribute('selected', true);
                            }

                            if (variant.variantAvailable === 'false') {
                                option.setAttribute('disabled', true);
                                option.textContent += ' - {{ 'products.product.sold_out' | t }}';
                            }

                            variantSelect.appendChild(option);
                        });

                        // Add change event listener to handle variant selection changes
                        variantSelect.addEventListener('change', function () {
                            let selectedOption = variantSelect.options[variantSelect.selectedIndex];
                            selectedVariantId = selectedOption.value;
                            // console.log('Selected Variant ID:', selectedVariantId);

                            // Update the upsellVariantIdInput value
                            let upsellVariantIdInput = productContainer.querySelector('input[name="id"][type="hidden"]');
                            if (upsellVariantIdInput) {
                                upsellVariantIdInput.value = selectedVariantId;
                            } else {
                                console.error('upsellVariantIdInput not found in product container.');
                            }
                        });
                    } else {
                        console.error('Select element not found in product container.');
                    }
                } else {
                    console.error('Selected product data not found in lookColors.');
                }
            });
        });
    } else {
        console.error('Color data not found.');
    }
}

// Function to reinitialize the Look product
function reinitializeLookProduct() {
    // Find all product containers and initialize the Look product for each
    document.querySelectorAll('.shop-the-look-product').forEach(function (productContainer) {
        initializeLookProduct(productContainer);
    });
}

// Listen for the liquid-ajax-cart:request-end event
document.addEventListener("liquid-ajax-cart:request-end", function (event) {
    const { requestState } = event.detail;

    // Check if the request is not from a mutation function
    if (requestState.info.initiator !== "mutation") {
        // Reinitialize the Look product
        reinitializeLookProduct();
    }
});

// Initialize the Look product initially for all product containers
document.querySelectorAll('.shop-the-look-product').forEach(function (productContainer) {
    initializeLookProduct(productContainer);
});
