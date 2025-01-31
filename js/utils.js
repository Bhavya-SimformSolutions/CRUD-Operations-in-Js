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

