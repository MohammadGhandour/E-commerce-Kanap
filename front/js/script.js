// GET products data
fetch('http://localhost:3000/api/products')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => {

        // Display products on the page
        let affichage = '';
        for (let product of data) {
            affichage +=
                `
                    <a href="./product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>
                    `
        }
        document.getElementById('items').innerHTML = affichage
    })
    .catch(err => console.log("Nous n'avons pas pu afficher les produits: " + err))
