let openSidebar = document.querySelector('.open-sidebar');
let sidebar = document.querySelector('.sidebar')
let closeSidebar = document.querySelector('.closeSidebar');
let body = document.querySelector('body');
let list = document.querySelector('.coffee-list');
let listedCoffee = document.querySelector('.listed-coffees');
let quantity = document.querySelector('.quantity');
let total = document.querySelector('.total');



openSidebar.addEventListener('click' , () => {
    body.classList.add('active');
    
})

closeSidebar.addEventListener('click' , ()=> {
    body.classList.remove('active')
})



let products = [
    {
        id : 1,
        name : 'Cafe Macchiato',
        image : 'CafeMacchiato.png',
        price : 200
    },

    {
        id : 2,
        name : 'Cappuccino',
        image : 'Cappuccino.png',
        price : 100
    },

    {
        id : 3,
        name : 'Latte',
        image : 'Latte.png',
        price : 200
    },

    {
        id : 4,
        name : 'Coffee Doppio',
        image : 'CoffeeDoppio.png',
        price : 300
    },

    {
        id : 5,
        name : 'Espresso',
        image : 'Espresso.png',
        price : 200
    },

    {
        id : 6,
        name : 'Flat White',
        image : 'Flatwhite.png',
        price : 500
    },
];

let coffeeList = [];

function initCoffee() {
    products.forEach((value,key)=> {
        let newDiv = document.createElement('div');
        newDiv.classList.add('items')
        newDiv.innerHTML = `
            <img src=${value.image}>
            <div class="info">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>

            <button onclick="addToCart(${key})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    })
}

initCoffee();

function addToCart(key) {
    if(coffeeList[key] == null) {
        coffeeList[key] = JSON.parse(JSON.stringify(products[key]));
        coffeeList[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart(){
    listedCoffee.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    coffeeList.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src=${value.image}></div>

            <div>${value.name}</div>

            <div>${value.price.toLocaleString()}</div>

            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listedCoffee.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

}

function changeQuantity(key, quantity) {
    if(quantity == 0) {
        delete coffeeList[key];
    } 
    else {
        coffeeList[key].quantity = quantity;
        coffeeList[key].price = quantity * products[key].price;
    }
    reloadCart();
}