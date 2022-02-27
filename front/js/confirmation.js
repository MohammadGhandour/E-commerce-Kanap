let orderIdDansUrl
function getProductIdFromUrl() {
    let str = window.location.href;
    let url = new URL(str);
    orderIdDansUrl = url.searchParams.get('orderId');

    document.getElementById("orderId").innerText = orderIdDansUrl
}
getProductIdFromUrl();