import { getProductsFromLocalStorage } from './storage.js';
import { deleteProduct, populateEditForm } from './product.js';

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

export function filterProducts() {
    const filterId = document.getElementById('filterId').value.trim();
    const products = getProductsFromLocalStorage();
    const filteredProducts = products.filter(product => product.id.includes(filterId));
    renderFilteredProducts(filteredProducts);
}

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