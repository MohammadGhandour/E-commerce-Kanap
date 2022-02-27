// Récupérer les données du localStorage et les afficher sur la page
const cartItems = document.getElementById("cart__items");
var products;
products = JSON.parse(localStorage.getItem('cart'));

function addItemsToStorage() {
    if (localStorage !== null) {
        for (let product of products) {
            cartItems.innerHTML +=
                `
            <article class="cart__item" data-id="${product.id}" data-color="${product.Color}">
                <div class="cart__item__img">
                    <img src="${product.ImgUrl}" alt="${product.ImgAlt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.Name}</h2>
                        <p>${product.Color}</p>
                        <p>${product.Price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.Quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `
        }
    }
}
addItemsToStorage();




// Calculer le prix total des données récupérées
const totalPrice = document.getElementById('totalPrice');
function getTotal() {
    let total = 0;
    products.forEach(product => {
        total += (product.Price * product.Quantity)
    });
    totalPrice.innerText = total;
}
getTotal();


// Supprimer un produit 
const deleteBtns = document.querySelectorAll('.deleteItem');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const articleToRemove = btn.closest('article');
        const idProductToDelete = articleToRemove.getAttribute('data-id');
        const colorProductToDelete = articleToRemove.getAttribute('data-color');
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === idProductToDelete && products[i].Color === colorProductToDelete) {
                // Supprimer l'élément du localStorage
                products.splice(i, 1);
                i--;
                localStorage.setItem(('cart'), JSON.stringify(products));
                // Supprimer l'élément du DOM
                articleToRemove.remove();
                // Mettre le total à jour
                getTotal();
            }
        }
    })
});

// Changer la quantité d'un produit
const quantityInputs = document.querySelectorAll('.itemQuantity');
quantityInputs.forEach(input => {
    input.addEventListener('input', () => {
        const articleToRemove = input.closest('article');
        const idProductToChange = articleToRemove.getAttribute('data-id');
        const colorProductToChange = articleToRemove.getAttribute('data-color');
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === idProductToChange && products[i].Color === colorProductToChange) {
                // Mettre à jour la carte 
                products[i].Quantity = input.value;
                // Mettre à jour le localStorage 
                localStorage.setItem(('cart'), JSON.stringify(products));
                // Mettre le total à jour
                getTotal();
            }
        }
    })
})

// Analyse des données saisies par l’utilisateur dans le formulaire

// Name actions
const firstName = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

firstName.addEventListener('input', function () {
    validateFirstName(this);
});
const validateFirstName = function (inputFirstName) {
    let NameRegEx = new RegExp("[a-zA-Z]$", 'g');
    if (NameRegEx.test(inputFirstName.value)) {
        firstNameErrorMsg.style.display = "none";
        return true;
    } else {
        firstNameErrorMsg.style.display = "block";
        firstNameErrorMsg.innerHTML = "Un prénom doit contenir juste des lettres";
        firstNameErrorMsg.style.color = "black";
        firstNameErrorMsg.style.padding = "5px";
        return false;
    }
}

lastName.addEventListener('input', function () {
    validateLastName(this);
});
const validateLastName = function (inputLastName) {
    let NameRegEx = new RegExp("[a-zA-Z]$", 'g');
    if (NameRegEx.test(inputLastName.value)) {
        lastNameErrorMsg.style.display = "none";
        return true;
    } else {
        lastNameErrorMsg.style.display = "block";
        lastNameErrorMsg.innerHTML = "Un nom doit contenir juste des lettres";
        lastNameErrorMsg.style.color = "black";
        lastNameErrorMsg.style.padding = "5px";
        return false;
    }
}

// Email actions
const email = document.getElementById('email');
const emailValidation = document.getElementById('emailErrorMsg');
email.addEventListener('input', function () {
    validateEmail(this);
});

const validateEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", 'g'
    );

    if (emailRegExp.test(inputEmail.value)) {
        emailValidation.style.display = 'none';
        return true;
    } else {
        emailValidation.style.display = "block";
        emailValidation.innerHTML = "Invalid email address.";
        emailValidation.style.color = "black";
        emailValidation.style.padding = "5px";
        return false;
    }
};


const orderBtn = document.getElementById('order');
orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateEmail(email) &&
        validateFirstName(firstName) &&
        validateLastName(lastName) &&
        document.getElementById('city').value !== '' &&
        document.getElementById('address').value !== ''
    ) {
        var contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: email.value
        }
        let products = []
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify({ contact, products }),
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                let orderId = data.orderId;
                location.assign("confirmation.html?orderId=" + orderId);
            })
            .catch(err => console.log(err))

    } else {
        alert('Veuillez vérifier la saisie de tous les champs de la formulaire.');
    }
})