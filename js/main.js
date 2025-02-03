import { loadFromLocalStorage, saveProduct, updateProduct, deleteProduct, populateEditForm } from './product.js';
import { sortProducts, filterProducts, renderProducts } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.getElementById('products');
    if (productsList) {
        loadFromLocalStorage();
    }

    const form = document.getElementById('form');
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            populateEditForm(productId);
            form.addEventListener('submit', (event) => updateProduct(event, productId));
        } else {
            form.addEventListener('submit', saveProduct);
        }
    }

    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            window.location.href = 'add.html';
        });
    }

    const sortOptions = document.getElementById('sortOptions');
    if (sortOptions) {
        sortOptions.addEventListener('change', sortProducts);
    }

    const filterInput = document.getElementById('filterId');
    if (filterInput) {
        filterInput.addEventListener('input', filterProducts);
    }

    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imagePreview = document.getElementById('imagePreview');
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Display confirmation message if it exists
    const confirmationMessage = localStorage.getItem('confirmationMessage');
    const confirmationMessageType = localStorage.getItem('confirmationMessageType');
    if (confirmationMessage) {
        const confirmationMessageElement = document.getElementById('confirmationMessage');
        confirmationMessageElement.textContent = confirmationMessage;
        confirmationMessageElement.style.display = 'block';
        if (confirmationMessageType === 'delete') {
            confirmationMessageElement.classList.add('delete');
        } else {
            confirmationMessageElement.classList.remove('delete');
        }
        localStorage.removeItem('confirmationMessage');
        localStorage.removeItem('confirmationMessageType');

        // Hide the confirmation message after 3 seconds
        setTimeout(() => {
            confirmationMessageElement.style.display = 'none';
        }, 3000);
    }

    // Attach functions to the window object
    window.populateEditForm = populateEditForm;
    window.deleteProduct = deleteProduct;
    window.filterProducts = filterProducts;
    window.sortProducts = sortProducts;
    window.renderProducts = renderProducts;
});