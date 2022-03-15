// Récupérer les données du localStorage et les afficher sur la page
const cartItems = document.getElementById("cart__items");
var products;
products = JSON.parse(localStorage.getItem('cart'));

if (products == null || products.length < 1) {
    cartItems.innerHTML = 'Votre panier est vide.';
    document.getElementById('order').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Votre panier est vide.');
    })
} else {

    function addItemsToThePage() {
        if (localStorage !== null && products.length > 0) {
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
        } else {
            cartItems.innerHTML = 'Votre panier est vide.'
        }
    }
    addItemsToThePage();




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
                    if (products.length < 1) {
                        cartItems.innerHTML = 'Votre panier est vide.';
                    }
                    // Supprimer l'élément du DOM
                    articleToRemove.remove();
                    // Mettre le total à jour
                    getTotal();
                    getArticlesQuantity();
                }
            }
        })
    });

    // Changer la quantité d'un produit
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const articleToRemove = input.closest('article');
            const idProductToChange = articleToRemove.getAttribute('data-id');
            const colorProductToChange = articleToRemove.getAttribute('data-color');
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === idProductToChange && products[i].Color === colorProductToChange) {
                    // Mettre à jour la carte 
                    if (input.value < 0) {
                        alert("Choisissez une quantité valide pour changer :)")
                    } else if (input.value == 0 && products[i].id === idProductToChange && products[i].Color === colorProductToChange) {
                        products.splice(i, 1);
                        i--;
                        localStorage.setItem(('cart'), JSON.stringify(products));
                        if (products.length < 1) {
                            cartItems.innerHTML = 'Votre panier est vide.';
                        }
                        // Supprimer l'élément du DOM
                        articleToRemove.remove();
                        getTotal();
                    } else {
                        products[i].Quantity = input.value;
                        // Mettre à jour le localStorage 
                        localStorage.setItem(('cart'), JSON.stringify(products));
                        // Mettre le total à jour
                        getTotal();
                    }
                }
            }
        })
        input.addEventListener('change', () => {
            getArticlesQuantity();
        })
    })

    // Le nombre des articles
    const articlesQuantity = document.getElementById('totalQuantity');
    function getArticlesQuantity() {
        let totalQuantity = 0;
        products.forEach(product => {
            totalQuantity += parseInt(product.Quantity);
        });
        articlesQuantity.innerHTML = totalQuantity;
    }
    getArticlesQuantity();

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

    // Address and city actions
    const cityInput = document.getElementById('city');
    const addressInput = document.getElementById('address');
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    const addressErrorMsg = document.getElementById('addressErrorMsg');

    cityInput.addEventListener('input', function () {
        validateCityInput();
    })
    const validateCityInput = function () {
        if (cityInput.value !== '') {
            cityErrorMsg.style.display = "none";
            return true;
        } else {
            cityErrorMsg.style.display = "block";
            cityErrorMsg.innerHTML = "Il faut remplir le champs ' Ville ' pour continuer.";
            cityErrorMsg.style.color = "black";
            cityErrorMsg.style.padding = "5px";
            return false;
        }
    }

    addressInput.addEventListener('input', function () {
        validateAddressInput();
    })
    const validateAddressInput = function () {
        if (addressInput.value !== '') {
            addressErrorMsg.style.display = "none";
            return true;
        } else {
            addressErrorMsg.style.display = "block";
            addressErrorMsg.innerHTML = "Il faut remplir le champs ' Adresse ' pour continuer.";
            addressErrorMsg.style.color = "black";
            addressErrorMsg.style.padding = "5px";
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
        if (products.length < 1) {
            alert('Votre panier est vide.')
        } else {
            if (validateEmail(email) &&
                validateFirstName(firstName) &&
                validateLastName(lastName) &&
                validateAddressInput(addressInput) &&
                validateCityInput(cityInput)
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
                        localStorage.removeItem('cart')
                        location.assign("confirmation.html?orderId=" + orderId);
                    })
                    .catch(err => console.log(err));

            } else {
                console.log(products);
                alert('Veuillez vérifier la saisie de tous les champs du formulaire.');
            }
        }
    })
}