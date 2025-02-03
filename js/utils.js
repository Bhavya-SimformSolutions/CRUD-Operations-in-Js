import { getProductsFromLocalStorage } from './storage.js';
import { deleteProduct, populateEditForm } from './product.js';

/**
 * Renders a list of products to the DOM.
 *
 * @param {Array} [products=getProductsFromLocalStorage()] - An array of product objects to render. If not provided, defaults to the products retrieved from local storage.
 * @param {string} products[].id - The unique identifier of the product.
 * @param {string} products[].name - The name of the product.
 * @param {string} products[].image - The URL of the product's image.
 * @param {number} products[].price - The price of the product.
 * @param {string} products[].description - The description of the product.
 */
export function renderProducts(products = getProductsFromLocalStorage()) {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Price: Rs.${product.price}</p>
            <p>${product.description}</p>
            <div class="buttons">
                 <button onclick="window.location.href='edit.html?id=${product.id}'"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        productsList.appendChild(productItem);
    });
}

/**
 * Renders a list of filtered products to the DOM.
 *
 * @param {Array} filteredProducts - An array of product objects to be rendered.
 * @param {Object} filteredProducts[].id - The unique identifier of the product.
 * @param {Object} filteredProducts[].name - The name of the product.
 * @param {Object} filteredProducts[].image - The URL of the product image.
 * @param {Object} filteredProducts[].price - The price of the product.
 * @param {Object} filteredProducts[].description - The description of the product.
 */
export function renderFilteredProducts(filteredProducts) {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Price: Rs.${product.price}</p>
            <p>${product.description}</p>
            <div class="buttons">
                <button onclick="window.location.href='edit.html?id=${product.id}'"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        productsList.appendChild(productItem);
    });
}

/**
 * Filters products based on the input value of the element with id 'filterId'.
 * Retrieves products from local storage and filters them by checking if their id includes the filterId value.
 * Renders the filtered products.
 */
export function filterProducts() {
    const filterId = document.getElementById('filterId').value.trim();
    const products = getProductsFromLocalStorage();
    const filteredProducts = products.filter(product => product.id.includes(filterId));
    renderFilteredProducts(filteredProducts);
}

/**
 * Sorts the products based on the selected sort option and renders the sorted products.
 * The sort options can be 'productId', 'productName', or 'price'.
 * - 'productId': Sorts products by their ID in lexicographical order.
 * - 'productName': Sorts products by their name in lexicographical order.
 * - 'price': Sorts products by their price in ascending order.
 */
export function sortProducts() {
    const sortOption = document.getElementById('sortOptions').value;
    const products = getProductsFromLocalStorage();

    if (sortOption === 'productId') {
        products.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOption === 'productName') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price') {
        products.sort((a, b) => a.price - b.price);
    }

    renderProducts(products);
}

/**
 * Validates the product form fields.
 *
 * @param {string} name - The name of the product.
 * @param {number} price - The price of the product.
 * @param {HTMLInputElement} imageInput - The file input element for the product image.
 * @param {string} description - The description of the product.
 * @returns {boolean} - Returns true if the form is valid, otherwise false.
 */
export function validateProductForm(name, price, imageInput, description) {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('priceError').textContent = '';
    if (imageInput) {
        document.getElementById('imageError').textContent = '';
    }
    document.getElementById('descriptionError').textContent = '';

    if (!name.trim()) {
        document.getElementById('nameError').textContent = 'Product name is required!';
        isValid = false;
    }
    if (!price || isNaN(price) || price <= 0) {
        document.getElementById('priceError').textContent = 'Valid price is required!';
        isValid = false;
    }
    if (imageInput && imageInput.files.length === 0) {
        document.getElementById('imageError').textContent = 'Product image is required!';
        isValid = false;
    } else if (imageInput && imageInput.files[0].size > 2 * 1024 * 1024) { // 2MB limit
        document.getElementById('imageError').textContent = 'Image size should be less than 2MB!';
        isValid = false;
    }
    if (!description.trim()) {
        document.getElementById('descriptionError').textContent = 'Product description is required!';
        isValid = false;
    }
    return isValid;
}