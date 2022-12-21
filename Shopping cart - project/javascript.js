const btncart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const show = document.querySelector('.container');
const btnclose = document.querySelector('#cart-close');




btncart.addEventListener('click', () => {
    cart.classList.add('cart-active');
    show.classList.add('displaychange');
})

btnclose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
    show.classList.remove('displaychange');
})


document.addEventListener('DOMContentLoaded', loadfood);

function loadfood() {
    loadcontent();
}

function loadcontent() {
    //Remove Food Items From Cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    //product Item change event 
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    //To add in cart
    let CartBtns = document.querySelectorAll('.add-cart');
    CartBtns.forEach((add) => {
        add.addEventListener('click', addincart);
    });

    updatetotal();

}













// Remove Item
function removeItem() {
    let tittle = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemlist = itemlist.filter(el => el.title != tittle);
    this.parentElement.remove();
    loadcontent();
}

//change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadcontent();
};




let itemlist = [];

//Add in cart
function addincart() {
    let food = this.parentElement;
    let title = (food.querySelector('.food-title').innerHTML);
    let price = (food.querySelector('.food-price').innerHTML);
    let imgSrc = (food.querySelector('.food-image').src);
    /*console.log(title,price,imgSrc);*/

    let newProduct = { title, price, imgSrc }
    //check exist in cart
    if (itemlist.find((el) => el.title == newProduct.title)) {
        alert("Product already in Cart");
        return;
    } else {
        itemlist.push(newProduct);
    }

    let newProductElement = createCartProducts(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadcontent();
}


function createCartProducts(title, price, imgSrc) {

    return `
    <div class="cart-box">
                <img src="${imgSrc}" class="cart-image" alt="1">
                <div class="detailed-box">
                    <div class="cart-food-title">${title}</div>
                    <div class="price-box">
                        <div class="cart-price">${price}</div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <ion-icon name="trash" class="cart-remove"></ion-icon>
            </div>`;

}


function updatetotal() {

    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;
    cartItems.forEach(product => {
        let PriceElement = product.querySelector('.cart-price');
        let price = parseFloat(PriceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerHTML = "Rs." + price * qty;
    });
    totalValue.innerHTML = "Rs." + total;

    //add product Count in 
    const Cartcount = document.querySelector('.cart-count');
    let count = itemlist.length;
    Cartcount.innerHTML = count;

    if (count == 0) {
        Cartcount.style.display = 'none';
    }
    else {
        Cartcount.style.display = 'block';
    }
}