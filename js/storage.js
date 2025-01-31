export function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

export function saveProductsToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}