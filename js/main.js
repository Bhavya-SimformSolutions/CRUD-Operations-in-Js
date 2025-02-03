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

    // Attach functions to the window object
    window.populateEditForm = populateEditForm;
    window.deleteProduct = deleteProduct;
    window.filterProducts = filterProducts;
    window.sortProducts = sortProducts;
    window.renderProducts = renderProducts;
});