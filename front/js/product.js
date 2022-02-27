const productImg = document.querySelector('.item__img');
const productName = document.querySelector('#title');
const productPrice = document.querySelector('#price');
const productDescription = document.querySelector('#description');
const productColors = document.querySelector('#colors');
const productQuantity = document.querySelector('#quantity');
const addToCart = document.querySelector('#addToCart');


let productId
function getProductIdFromUrl() {
    let str = window.location.href;
    let url = new URL(str);
    productId = url.searchParams.get('id');
}
getProductIdFromUrl();

function showProduct() {
    fetch('http://localhost:3000/api/products/' + productId)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(product => {
            productImg.innerHTML =
                `
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        `;

            productName.innerHTML = product.name;

            productPrice.innerHTML = product.price;

            productDescription.innerHTML = product.description;

            for (let color of product.colors) {
                productColors.innerHTML += `<option value="${color}">${color}</option>`;
            }
        })
}

showProduct();

addToCart.addEventListener('click', function () {
    if (productColors.value == "") {
        alert("Choisissez un couleur valid pour ajouter ce produit à la carte :) ");
    } else if (productQuantity.value == "0") {
        alert("Choisissez une quantité valide pour ajouter ce produit à la carte :)")
    } else {
        var newCart;
        let product = {
            id: productId,
            Name: productName.innerHTML,
            ImgUrl: productImg.querySelector('img').getAttribute("src"),
            ImgAlt: productImg.querySelector('img').getAttribute("alt"),
            Price: productPrice.innerHTML,
            Color: productColors.value,
            Quantity: productQuantity.value,
        };
        if (JSON.parse(localStorage.getItem('cart')) === null) {
            newCart = [];
            newCart.push(product);
        } else {
            newCart = JSON.parse(localStorage.getItem('cart'));
            let found = false;
            for (let i = 0; i < newCart.length; i++) {
                if (newCart[i].id == productId && newCart[i].Color == productColors.value) {
                    newCart[i].Quantity = productQuantity.value;
                    found = true;
                    break;
                }
            }
            if (found == false) {
                newCart.push(product);
            }
        }
        localStorage.setItem(('cart'), JSON.stringify(newCart));
    }
})