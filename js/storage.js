/**
 * Retrieves the list of products from local storage.
 *
 * @returns {Array} An array of products stored in local storage. If no products are found, returns an empty array.
 */
export function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

/**
 * Saves the given products array to the local storage.
 *
 * @param {Array} products - The array of products to be saved.
 */
export function saveProductsToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}