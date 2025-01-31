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
});

function populateEditForm(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('description').value = product.description;
        document.getElementById('currentImage').src = product.image;
    }
}

function updateProduct(event, productId) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const description = document.getElementById('description').value;

    if (!name || !price || !description) {
        alert('Name, price, and description are required!');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
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
                localStorage.setItem('products', JSON.stringify(products));
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            products[productIndex] = product;
            localStorage.setItem('products', JSON.stringify(products));
            window.location.href = 'index.html';
        }
    }
}

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
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <div class="buttons">
                <button onclick="editProduct('${product.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        productsList.appendChild(productItem);
    });
}

function renderFilteredProducts(filteredProducts) {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <div class="buttons">
                <button onclick="editProduct('${product.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        productsList.appendChild(productItem);
    });
}

function filterProducts() {
    const filterId = document.getElementById('filterId').value.trim();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter(product => product.id.includes(filterId));
    renderFilteredProducts(filteredProducts);
}

function editProduct(productId) {
    window.location.href = `edit.html?id=${productId}`;
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = products.filter(product => product.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        renderProducts();
    }
}

function sortProducts() {
    // Sort products logic
}