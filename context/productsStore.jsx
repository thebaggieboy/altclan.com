import React from "react";
import useData from "../hooks/useData"


const productsArray = fetch('http://127.0.0.1:8000/api/merchandises/');

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };