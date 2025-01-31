import { getProductsFromLocalStorage, saveProductsToLocalStorage } from './storage.js';
import { renderProducts } from './utils.js';

export function loadFromLocalStorage() {
    renderProducts();
}

export function saveProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!name || !price || !imageInput.files.length || !description) {
        alert('All fields are required!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageBase64 = event.target.result;

        const products = getProductsFromLocalStorage();
        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            image: imageBase64,
            description
        };

        products.push(newProduct);
        saveProductsToLocalStorage(products);

        window.location.href = 'index.html';
    };
    reader.readAsDataURL(imageInput.files[0]);
}

export function updateProduct(event, productId) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!name || !price || !description) {
        alert('Name, price, and description are required!');
        return;
    }

    const products = getProductsFromLocalStorage();
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        const product = products[productIndex];
        product.name = name;
        product.price = price;
        product.description = description;

        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                product.image = event.target.result;
                products[productIndex] = product;
                saveProductsToLocalStorage(products);
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            products[productIndex] = product;
            saveProductsToLocalStorage(products);
            window.location.href = 'index.html';
        }
    }
}

export function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = getProductsFromLocalStorage();
        const updatedProducts = products.filter(product => product.id !== productId);
        saveProductsToLocalStorage(updatedProducts);
        renderProducts();
    }
}

export function populateEditForm(productId) {
    const products = getProductsFromLocalStorage();
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('description').value = product.description;
        document.getElementById('currentImage').src = product.image;
    }
}