# CRUD-Operations-in-Js

## Product Management System

This application enables users to create, update, view, and manage products. It uses localStorage for storing product data and provides a simple interface for managing products.

## Live Demo
https://bhavya-simformsolutions.github.io/CRUD-Operations-in-Js/

## Features

- **Products List**: Displays a list of all products.
- **Add Product**: Allows users to add new products with a name, price, image, and description.
- **Edit Product**: Allows users to edit existing products.
- **Delete Product**: Allows users to delete products.
- **View Products**: Displays a list of all products.
- **Filter Products**: Filters products based on their ID.
- **Sort Products**: Sorts products by ID, name, or price.
- **Confirmation Messages**: Displays confirmation messages for add, edit, and delete actions.
- **Form Validation**: Validates the product form fields to ensure all required fields are filled and the image size is within the limit.
- **Responsive Design**: The UI is responsive for all device dimensions

## File Structure

- **index.html** :- Main page displaying the list of products 
- **add.html** :- Form page for adding new products
- **edit.html** :- Form page for updating existing products 
- **css / styles.css** :- CSS styles for the application 
- **js / main.js** :- Main JavaScript file for handling events and routing       
- **js / product.js** :- JavaScript file for product-related operations (add, edit, delete) 
- **js / storage.js** :- JavaScript file for handling localStorage operations 
- **js / utils.js** :- Utility JavaScript file for rendering and validating products 
## Code Highlights

### Adding a New Product
```javascript
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
```
### Editing existing Product
```javascript
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
```

### Deleting a Product 

```javascript
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
```

### Filtering Product by Product Ids

```javascript
export function filterProducts() {
    const filterId = document.getElementById('filterId').value.trim();
    const products = getProductsFromLocalStorage();
    const filteredProducts = products.filter(product => product.id.includes(filterId));
    renderFilteredProducts(filteredProducts);
}

```
### Sortng Products by ProductIds , Name and Price

```javascript
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
```

## Screenshots

### Product List :-
![](https://github.com/Bhavya-SimformSolutions/CRUD-Operations-in-Js/blob/master/Screenshots/Screenshot-1.png)
### Add Product :-
![](https://github.com/Bhavya-SimformSolutions/CRUD-Operations-in-Js/blob/master/Screenshots/Screenshot-2.png)
### Edit Product :-
![](https://github.com/Bhavya-SimformSolutions/CRUD-Operations-in-Js/blob/master/Screenshots/Screenshot-3.png)
