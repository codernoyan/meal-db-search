// array for get total items
const cartArray = [];

const addToCart = element => {
    const itemName = element.parentNode.parentNode.children[0].innerText;
    console.log(itemName);

    const itemObj = {
        mealName: itemName
    }
    cartArray.push(itemObj);
    console.log(cartArray);

    // set the value to cart total
    const cartTotal = document.getElementById('cart-total');
    cartTotal.innerText = cartArray.length;
}

