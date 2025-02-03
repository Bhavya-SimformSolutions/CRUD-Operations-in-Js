import { getProductsFromLocalStorage, saveProductsToLocalStorage } from './storage.js';
import { renderProducts, validateProductForm } from './utils.js';

/**
 * Loads products from local storage and renders them.
 */
export function loadFromLocalStorage() {
    renderProducts();
}

/**
 * Saves a product to local storage.
 * 
 * @param {Event} event - The event object from the form submission.
 * @returns {void}
 */
export function saveProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!validateProductForm(name, price, imageInput, description)) {
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

        localStorage.setItem('confirmationMessage', 'Product added successfully!');
        localStorage.setItem('confirmationMessageType', 'success');
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(imageInput.files[0]);
}

/**
 * Updates a product with the given productId based on the form input values.
 * 
 * @param {Event} event - The event object from the form submission.
 * @param {number} productId - The ID of the product to be updated.
 */
export function updateProduct(event, productId) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!validateProductForm(name, price, null, description)) {
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
                localStorage.setItem('confirmationMessage', 'Product Updated successfully!');
                localStorage.setItem('confirmationMessageType', 'success');
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            products[productIndex] = product;
            saveProductsToLocalStorage(products);
            localStorage.setItem('confirmationMessage', 'Product Updated successfully!');
            localStorage.setItem('confirmationMessageType', 'success');
            window.location.href = 'index.html';
        }
    }
}

/**
 * Deletes a product by its ID after user confirmation.
 * 
 * This function prompts the user for confirmation before deleting the product.
 * If confirmed, it retrieves the list of products from local storage, filters out
 * the product with the specified ID, saves the updated list back to local storage,
 * sets a confirmation message, and reloads the page.
 * 
 * @param {string} productId - The ID of the product to be deleted.
 */
export function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = getProductsFromLocalStorage();
        const updatedProducts = products.filter(product => product.id !== productId);
        saveProductsToLocalStorage(updatedProducts);
        localStorage.setItem('confirmationMessage', 'Product deleted successfully!');
        localStorage.setItem('confirmationMessageType', 'delete');
        renderProducts();
        window.location.reload();
    }
}

/**
 * Populates the edit form with the details of the product with the given ID.
 *
 * @param {string} productId - The ID of the product to edit.
 */
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