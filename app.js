const dropDowns = document.querySelectorAll('.drop-down');
const remove = document.querySelectorAll('.item-quantity button');
const addToCart = document.querySelectorAll('.items button');
const itemPrice = document.querySelectorAll('.item-price span');
const totalAmount = document.querySelector('.total-amount');
const proceed = document.querySelector('.proceed-btn button');

dropDowns.forEach(dropDown => {
    dropDown.addEventListener('click', () => {
        const chevron = dropDown.querySelector('.bi-chevron-right');
        chevron.classList.toggle('rotate');
    });
});

remove.forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
        udpateAmount();
    });
});

addToCart.forEach(button => {
    button.addEventListener('click', (e) => {
        let exit = false;
        const selectText = e.target.parentElement.parentElement;
        const imgSrc = selectText.querySelector('img').src;
        const itemName = selectText.querySelectorAll('.mb-0 .btn div')[0].innerHTML;
        const itemPrice = selectText.querySelectorAll('.mb-0 .btn div')[1].innerHTML;
        const itemExists = document.querySelectorAll('.item-name span');
        itemExists.forEach(item => {
            if (item.innerHTML === itemName) {
                alert('Item is already added to cart.');
                exit = true;
                return;
            }
        });
        if (exit) return;
        const addToCart = document.querySelector('.cart-items');
        addToCart.innerHTML += `
        <div class="item-sub row">
            <div class="item-name col col-4">
                <img src="${imgSrc}"
                    alt="">
                <span>${itemName}</span>
            </div>
            <div class="item-price col col-4">
                <span>${itemPrice}</span>
            </div>
            <div class="item-quantity col col-4">
                <input class="item-quantity-input" type="number" value="1">
                <button type="button" class="btn btn-danger">REMOVE</button>
            </div>
        </div>
        `
        udpateAmount();
        document.querySelectorAll('.item-quantity-input').forEach(quantity => {
            quantity.addEventListener('change', (e) => {
                let value = e.target.value;
                if (isNaN(value) || value <= 0) {
                    e.target.value = 1;
                }
                udpateAmount();
            });
        });
        document.querySelectorAll('.item-quantity button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.parentElement.parentElement.remove();
                udpateAmount();
            });
        });
    });
});

const udpateAmount = () => {
    let totalPrice = 0
    document.querySelectorAll('.item-price span').forEach((item, index) => {
        let itemQuantity = document.querySelectorAll('.item-quantity-input')[index].value;
        const itemPrice = parseFloat(item.innerHTML.replace('$', ''));
        totalPrice += (itemQuantity * itemPrice);
        totalPrice = Math.round(totalPrice * 100) / 100;
    });
    
    totalAmount.innerHTML = totalPrice;
};

proceed.addEventListener('click', () => {
    if(document.querySelectorAll('.item-sub').length === 0) {
        alert('Your cart is empty. Please enter items to your cart.');
        return;
    }
    alert('Thank you for your purchase!');
    document.querySelectorAll('.item-sub').forEach(item => {
        item.remove();
        udpateAmount();
    });
});