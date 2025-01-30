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
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!name || !price || !imageInput.files.length || !description) {
        alert('All fields are required!');
        return;
    }
    //a FileReader to read the selected image file and convert it to a base64 string.
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageBase64 = event.target.result;

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            image: imageBase64,
            description
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        window.location.href = 'index.html';
    };
    reader.readAsDataURL(imageInput.files[0]);
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