class BuildYourBundleCart extends HTMLElement {
  constructor() {
    super();

    this.collectionId = this.dataset.collection;
    this.translations = this.extractTranslations();
    this.currency = window.Shopify.currency.active === "EUR" ? "€" : window.Shopify.currency.active;
    this.errorMessage = null;
    this.productsInBundle = [];
    this.bundleQuantity = 0;
    this.bundleName = "";
    this.selectedVariant = null;
    this.bundlePrice = 0;
    this.mhkd = 0;
    this.cpp = 0;
    this.mpc = 0;
    this.mpcd = 0;
    this.overlay = document.getElementById("byb_overlay");
    

    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    this.facet = document.querySelector("byb-facet-filters-form");
    this.onLoad();

    this.closeButton = document.getElementById("close-byb-cart");
    this.openButton = document.getElementById("open-byb-cart");
    this.closeButton.addEventListener("click", () => this.toggleCart());
    this.openButton.addEventListener("click", () => this.toggleCart());



    // Event listener for clicking on empty bundle items to close the cart
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("byb-bundle-item-empty")) {
        this.toggleCart();
      }
    });
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add("!hidden");
    }
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  async onLoad() {
    this.formCatch();
    this.showInitialPlaceholders();
    await this.fetchDiscounts();
    this.insertBundleQuantity();
    this.insertBundleQuantityInUspGrid();
    this.insertBundlePriceInUspGrid();
    this.updateBundleUI();
    this.disableLoading();
  }

  formCatch() {
    if (this.forms && this.forms.length > 0) {
      // Unsubscribe from all events
    }
  
    // Get all forms
    this.forms = document.getElementsByClassName("bundle-form");
  
    for (let i = 0; i < this.forms.length; i++) { 
      this.forms[i].addEventListener("submit", async (event) => {
        event.preventDefault();
        await this.addToCart(event, this.forms[i]);
  
        // Check if the last product is being added  
        const isLastProduct = this.productsInBundle.length === this.bundleQuantity;
  
        // Scroll to the top if not the last item or if on desktop
        if (!isLastProduct || !this.isMobile()) {
          window.scrollTo(0, 0);
        }
  
        // Toggle the cart only if the last item is added
        if (isLastProduct) {
          this.toggleCart();
        }
      });
    }
  }
  

  handleIntersectionAfterSubmit() {
    const animationTriggerElements = Array.from(
      document.querySelectorAll(`.${SCROLL_ANIMATION_TRIGGER_CLASSNAME}`)
    );
    animationTriggerElements.forEach((element) => {
      if (
        element.isIntersecting &&
        element.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)
      ) {
        element.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        if (element.hasAttribute("data-cascade")) {
          const index = animationTriggerElements.indexOf(element);
          element.setAttribute("style", `--animation-order: ${index};`);
        }
      }
    });
  }

  insertBundleQuantityInUspGrid() {
    // Find all ".bundle-qty" elements and update their text content
    const bundleQtyElements = document.querySelectorAll(".bundle-qty");
    bundleQtyElements.forEach((bundleQtyElement) => {
      bundleQtyElement.textContent = this.bundleQuantity;
    });
  }

  insertBundlePriceInUspGrid() {
    // Find the single element with class "usp-grid"
    const uspGridElement = document.querySelector(".usp-grid");

    if (uspGridElement) {
      // Find all ".bundle-price" elements within the "usp-grid" and update their text content
      const bundlePriceElements =
        uspGridElement.querySelectorAll(".bundle-price");
      bundlePriceElements.forEach((bundlePriceElement) => {
        bundlePriceElement.textContent = `${this.bundlePrice} ${this.currency}`;
      });
    }
  }

  insertBundleQuantity() {
    // Find the .byb-qty element
    const qtyElement = document.querySelector(".byb-qty");

    // If the .byb-qty element exists, set its text content to bundleQuantity
    if (qtyElement) {
      qtyElement.textContent = this.bundleQuantity;
    }
  }

  
  

  handleProductCardButtonClick() {
    document.querySelectorAll('.product_card .Button_primary').forEach(button => {
      button.addEventListener('click', (e) => {

      });
    });
  }

  renderCartDetail() {
    const beforePrice = this.productsInBundle.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    const container = document.getElementById("byb_cart_details");
    if (!container) return;

    let buttonText = this.translations.add_bundle_to_cart;
    let buttonClass = "Button Button_secondary"; // Default to secondary class

    const remainingQuantity = this.bundleQuantity - this.productsInBundle.length;

    if (remainingQuantity === 0) {
      buttonClass = "Button Button_primary";
    } else if (remainingQuantity > 0) {
      buttonText = `${this.translations.select} ${remainingQuantity} ${
        this.translations.more
      } ${
        remainingQuantity === 1
          ? this.translations.item
          : this.translations.items
      }`;
    }

    const amountSelected = this.bundleQuantity - remainingQuantity;

    const bundleCountSpan = document.querySelector(".bundle-count");
    if (bundleCountSpan) {
      bundleCountSpan.innerHTML = amountSelected;
    }

    const bundleCartButton = document.querySelector(".bundlecart_button");
    if (remainingQuantity === 0 && bundleCartButton) {
      bundleCartButton.classList.add("bundle_full");
    }

    container.innerHTML = `
      <div class="byb-cart-price flex flex-col gap-y-[5px] pb-2 mb-2">
          <span class="Heading byb-your-price flex justify-between text-2xl font-bold pb-1 ">${
            this.translations.your_price
          }: <span class="text-red-500">${beforePrice.toFixed(2)} ${this.currency}</span></span>
          <span class="byb-before-price line-through flex justify-between">${
            this.translations.before_price
          }: <span class="0">${beforePrice.toFixed(2)} ${
      this.currency
    }</span></span>
      </div>
      <a href="#" id="add_bundle_to_cart" class="flex items-center mt-1 mb-4 text-center justify-center gap-x-2 rounded-full  px-4 min-h-[35px] text-base font-semibold text-white w-fit min-w-[150px] bg-primary-black hover:bg-medium-green  ${buttonClass} w-full mt-4">${buttonText}</a>
      `;

    const addToCartButton = document.getElementById("add_bundle_to_cart");
    addToCartButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (remainingQuantity > 0) {
        this.toggleCart();
      } else {
        this.addBundleToCart();
        this.toggleCart();
      }
    }); 
  }

  addToCart(event, form) {
    const formData = new FormData(form);
    const selectedOption = form.querySelector('select[name="id"] option:checked');
    const variantTitle = selectedOption ? selectedOption.getAttribute("data-variant-title") : "";

    const product = {
      id: formData.get("id"),
      properties: {
        _BundleCollection: this.collectionId,
        _BundleConfiguration: JSON.stringify({
          bundleQuantity: this.bundleQuantity,
          bundlePrice: this.bundlePrice,
          bundleName: this.bundleName,
          e_collection: btoa(this.collectionId),
        }),
        _UniqueIdentifier: Math.random().toString(36).substr(2, 9) // Add a unique identifier
      },
      title: formData.get("product_name"),
      price: Number(formData.get("price")) / 100, 
      image: formData.get("product_image"),
      variantTitle: variantTitle,
    };
    this.productsInBundle.push(product);
    this.syncProductsInBundleWithStorage();
    this.updateBundleUI();
    this.handleIntersectionAfterSubmit();
  }

  removeProductFromBundle(product) {
      this.productsInBundle = this.productsInBundle.filter(
          (p) => p.properties._UniqueIdentifier !== product.properties._UniqueIdentifier
      );
      this.syncProductsInBundleWithStorage();
      this.updateBundleUI();
  }

  toggleCart() {
    const isCartHidden = this.classList.contains("hidden");
  
    if (isCartHidden) {
      // Show the cart
      this.classList.remove("hidden");
  
      // Apply no-scroll if there are more than 5 products and on mobile
      if (this.isMobile()) {
        document.body.classList.add("body-no-scroll");
      }
    } else {
      // Hide the cart
      this.classList.add("hidden");
  
      // Remove no-scroll class only if the cart was originally open
      if (this.isMobile()) {
        if (document.body.classList.contains("body-no-scroll")) {
          document.body.classList.remove("body-no-scroll");
        }
      }
    }
  }
  

  updateBundleUI() {
    const list = document.getElementById("byb_product_list");
    if (!list) return;

    // Clear the list
    list.innerHTML = "";

    // Calculate how many empty placeholders to add
    const emptyPlaceholderCount = Math.max(3, this.bundleQuantity) - this.productsInBundle.length;

    // Add actual products to the list, replacing the initial 3
    this.productsInBundle.forEach((product, index) => {
      // Added 'index' parameter
      const li = document.createElement("li");
      li.dataset.id = product.id;
      li.classList.add("byb-bundle-item", "text-sm", "relative");

      li.innerHTML = `
          <div class="byb-cart-item flex items-center justify-between gap-2 bg-white overflow-hidden">
            <button class="byb-remove-bundle-item absolute text-xs ">${
              this.translations.Remove
            }</button>
            <img height="150" class="object-cover min-h-[150px] h-full" src="${
              product.image
            }" alt="${product.title}" />
            <div class="flex flex-col gap-2 pr-2 w-full">
              <span class="Heading font-bold text-sm">${
                product.title.trim().length > 22
                  ? product.title.trim().substring(0, 22) + "..."
                  : product.title.trim()
              }</span>
                <span class="flex flex-row item-center justify-between gap-x-2">
                ${
                  product.variantTitle
                    ? `<span class="text-sm">Size: ${product.variantTitle}</span>`
                    : ""
                }
                <span class="byb-before-price text-sm line-through">${
                  product.price + " " + this.currency
                }</span>
              </span>
            </div>
          </div>
          `;

      li.addEventListener("click", (event) => {
        if (event.target.classList.contains("byb-remove-bundle-item")) {
          this.removeProductFromBundle(product);
        }
      });

      list.appendChild(li);
    });

    // Add any remaining empty placeholders, if needed
    for (let i = 0; i < emptyPlaceholderCount; i++) {
      const emptyLi = document.createElement("li");
      emptyLi.classList.add("byb-bundle-item-empty");
      emptyLi.innerHTML = `
          <div class="empty-content flex flex-col items-center justify-center bg-secondary-bg h-[150px]">
            <div class="w-3/4 h-4 bg-gray-600 mb-2"></div>
            <div class="w-1/2 h-4 bg-gray-600"></div>
          </div>
          `;
      list.appendChild(emptyLi);
    }

    this.renderCartDetail();
    this.applyContainerStyles();
  }

  applyContainerStyles() { 
    const container = document.querySelector(".byb-products-container");
    if (container && this.isMobile()) {
      if (this.productsInBundle.length >= 5) {
        container.style.overflowY = "scroll";
        container.style.maxHeight = "300px";
        container.style.alignItems = "flex-start";
      } else {
        container.style.overflowY = "visible";
        container.style.maxHeight = "unset";
      }
    }
  }

  hideCartDetails() {
    const container = document.getElementById("byb_cart_details");
    if (!container) return;
    container.innerHTML = "";
  }

  extractHkd(formData) {
    const x = atob("WTI5emRB");
    const y = String(formData.get(x));
    const z = atob(y);
    return Number(z) / 8;
  }

  extractMhkd(mhkd) {
    const z = atob(mhkd);
    return Number(z) / 8;
  }

  cartIsOverLimit() {
    return false;
  }

  async addBundleToCart() {
    const dataToSend = this.productsInBundle.map((product) => ({
      id: product.id,
      quantity: 1,
      properties: product.properties,
    }));

    const ajax = window.liquidAjaxCart;

    this.enableLoading();

    const options = {
      firstCallback: (requestState) => {
        this.addToCardSuccesCallback(requestState);
        this.disableLoading();
        document.body.classList.add("js-show-ajax-cart");

        if (!document.documentElement.classList.contains("js-ajax-cart-empty")) {
          document.querySelector("#shopify-section-cart-recomendations").classList.add("cart-recom-slidein");
        } else {
          document.querySelector("#shopify-section-cart-recomendations").classList.remove("cart-recom-slidein");
        }
      },
    };

    ajax.add({ items: dataToSend }, options);
  }

  addToCardSuccesCallback(response) {
    this.disableLoading();
    if (response.responseData.status !== 200) {
      console.log("cart error", response);
      return;
    }
    this.productsInBundle = [];
    this.syncProductsInBundleWithStorage();
    this.updateBundleUI();
  }

  extractTranslations() {
    let trans = this.replaceAll(this.dataset.translations, "=>", ":");
    trans = this.replaceAll(trans, "u0026quot;", '"');
    trans = this.replaceAll(trans, "=u0026gt;", ":");

    return JSON.parse(trans);
  }

  replaceAll(str, find, replace) {
    const string = str.replace(new RegExp(find, "g"), replace);
    return string.replace(/\\/g, "");
  }

  async fetchDiscounts() {
    this.enableLoading();
    const scriptConf = this.querySelector("script[data-configuration-json]");
    const configuration = JSON.parse(scriptConf?.innerHTML);

    this.bundleQuantity = configuration.quantity;
    this.bundlePrice = configuration.bundlePrice;
    this.bundleName = configuration.bundleName;

    this.fetchProductsInBundleWithStorage();
    this.disableLoading();
  }

  enableLoading() {
    const loader = document.getElementById("byb_overlay");
    loader?.classList.remove("!hidden");
  }

  disableLoading() {
    const loader = document.getElementById("byb_overlay");
    loader?.classList.add("!hidden");
  }

  syncProductsInBundleWithStorage() {
    // create dummy event
    const storageData = {
      productsInBundle: this.productsInBundle,
    };
    localStorage.setItem(
      "byb_products_in_bundle_" + this.collectionId,
      JSON.stringify(storageData)
    );
  }

  fetchProductsInBundleWithStorage() {
    // create dummy event
    const storageData = localStorage.getItem(
      "byb_products_in_bundle_" + this.collectionId
    );
    if (!storageData) return;

    const parsedData = JSON.parse(storageData);
    this.productsInBundle = parsedData.productsInBundle;
    this.updateBundleUI();
  }

  showInitialPlaceholders() {
    const list = document.getElementById("byb_product_list");
    if (!list) return;

    // Clear the list
    list.innerHTML = "";

    // Add 3 empty placeholders initially 
    for (let i = 0; i < 3; i++) {
      const emptyLi = document.createElement("li");
      emptyLi.classList.add("byb-bundle-item-empty");
      emptyLi.innerHTML = `
        <div class="empty-content flex flex-col items-center justify-center bg-secondary-bg h-[150px]">
          <div class="w-3/4 h-4 bg-gray-300 mb-2"></div>
          <div class="w-1/2 h-4 bg-gray-300"></div>
        </div>
      `;
      list.appendChild(emptyLi);
    }
  }
}
customElements.define("build-your-bundle-cart", BuildYourBundleCart);
