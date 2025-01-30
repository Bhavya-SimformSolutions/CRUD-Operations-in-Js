document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.getElementById('products');
    if (productsList) {
        loadFromLocalStorage();
    }

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', saveProduct);
    }

    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            window.location.href = 'add.html';
        });
    }
});

//called when new product is added
function saveProduct(event) {
   
}

function loadFromLocalStorage() {
    renderProducts();
}

function renderProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
            </div>
            <div>
                <button onclick="editProduct('${product.id}')">Edit</button>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        `;
        productsList.appendChild(productItem);
    });
}

function editProduct(productId) {
    window.location.href = `edit.html?id=${productId}`;
}

function deleteProduct(productId) {
    // Delete product logic
}

function filterProducts() {
    // Filter products logic
}

function sortProducts() {
    // Sort products logic
}