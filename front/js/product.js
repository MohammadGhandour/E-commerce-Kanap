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

fetch('http://localhost:3000/api/products/' + productId)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(cart => {
        productImg.innerHTML =
            `
                        <img src="${cart.imageUrl}" alt="${cart.altTxt}">
                        `;

        productName.innerHTML = cart.name;

        productPrice.innerHTML = cart.price;

        productDescription.innerHTML = cart.description;

        for (let color of cart.colors) {
            productColors.innerHTML += `<option value="${color}">${color}</option>`;
        }
        addToCart.addEventListener('click', function () {
            if (productColors.value == "") {
                alert("Choisissez un couleur valid pour ajouter ce produit au panier :) ");
            } else if (productQuantity.value <= 0) {
                alert("Choisissez une quantité valide pour ajouter ce produit au panier :)")
            } else {
                var newCart;
                let product = {
                    id: productId,
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
                location.assign("cart.html");
            }
        })
    })