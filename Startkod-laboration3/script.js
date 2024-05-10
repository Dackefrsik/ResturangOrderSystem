"use strict";

// #region timer för klockan i menyn 
window.oGlobalObject = {
    sec : new Date().getSeconds(),
    hours : new Date().getHours(),
    min : new Date().getMinutes()
}
// #endregion

// #region Modal för vektorer som sparar ordrar och produkter i den ordern som läggs

let orders = [];
let productsCurrentOrder = [];


// #endregion

// #region Modal klassen för genomförd produkt

class Order {
    constructor(orderNumber, table, products){
        this.orderNumber = orderNumber,
        this.table = table,
        this.products = products
    }
}

//hej

// #endregion

// #region skirver ut alla produktyer vid load
window.addEventListener("load", () => {

    var menu = {
        "pizza_class_1": [
            {"name": "Margherita", "contents": ["Tomatsås", "Ost"], "price": 65 },
            {"name": "Vesuvio", "contents": ["Tomatsås", "Ost", "Skinka"], "price": 65 },
            {"name": "Altono", "contents": ["Tomatsås", "Ost", "Tonfisk"], "price": 65 }
        ],
        "pizza_class_2": [
            {"name": "Calzone", "contents": ["Tomatsås", "Ost", "Skinka"], "price": 80 },
            {"name": "Capricciosa", "contents": ["Tomatsås", "Ost", "Skinka", "Champinjoner" ], "price": 70 },
            {"name": "Tomaso", "contents": ["Tomatsås", "Ost", "Skinka", "a:Räkor" ], "price": 70 },
            {"name": "Hawaii", "contents": ["Tomatsås", "Ost", "Skinka", "Ananas" ], "price": 70 },
            {"name": "Oriental", "contents": ["Tomatsås", "Ost", "Skinka", "Köttfärs" ], "price": 70 },
            {"name": "Venezia", "contents": ["Tomatsås", "Ost", "Skinka", "Tonfisk" ], "price": 70 },
            {"name": "Bolognese", "contents": ["Tomatsås", "Ost", "Köttfärs", "Lök" ], "price": 70 },
            {"name": "Napoli", "contents": ["Tomatsås", "Ost", "Räkor", "Champinjoner" ], "price": 70 }
        ],
        "pizza_class_3": [
            {"name": "Bravo", "contents": ["Tomatsås", "Ost", "Skinka", "Bacon", "Lök", "a:Ägg" ], "price": 75 },
            {"name": "Princessa", "contents": ["Tomatsås", "Ost", "Skinka", "a:Räkor", "Champinjoner" ], "price": 75 },
            {"name": "Kroppkärr", "contents": ["Tomatsås", "Ost", "Skinka", "Köttfärs", "Champinjoner" ], "price": 75 },
            {"name": "Afrikano", "contents": ["Tomatsås", "Ost", "Skinka", "Ananas", "Curry", "Banan" ], "price": 75 },
            {"name": "Önska", "contents": ["Tomatsås", "Ost", "Skinka", "a:Räkor", "Champinjoner" ], "price": 85 },
            {"name": "Lambada", "contents": ["Tomatsås", "Ost", "Skinka", "Köttfärs", "a:Räkor" ], "price": 75 },
            {"name": "Alsterdalen", "contents": ["Tomatsås", "Ost", "Skinka", "a:Crabfish", "a:Räkor" ], "price": 75 },
            {"name": "Paradis", "contents": ["Tomatsås", "Ost", "Skinka", "a:Räkor", "Ananas" ], "price": 75 },
            {"name": "Roma", "contents": ["Tomatsås", "Ost", "Skinka", "Kantareller", "Tomater (färska)" ], "price": 75 },
            {"name": "Banjogatan", "contents": ["Tomatsås", "Ost", "Skinka", "Salami", "Paprika" ], "price": 75 },
            {"name": "Rimini", "contents": ["Tomatsås", "Ost", "Köttfärs", "Gorgonzolaost", "Lök" ], "price": 75 },
            {"name": "Opera", "contents": ["Tomatsås", "Ost", "Köttfärs", "Ananas", "Curry", "Banan" ], "price": 75 },
            {"name": "Mesopotamia", "contents": ["Tomatsås", "Ost", "Salami", "Köttfärs", "a:Nötter"], "price": 75 }
        ],
        "sauces": [
            {"name": "Bearnaisesås 10 cl ", "price":  10 },
            {"name": "Kebabsås mild 10 cl ", "price":  10 },
            {"name": "Kebabsås stark 10 cl ", "price":  10 },
            {"name": "Kebabsås blandad 10 cl ", "price":  10 },
            {"name": "Tzatzikisås 10 cl ", "price":  10 },
            {"name": "Vitlökssås 10 cl ", "price": 10}
        ],
        "drinks": [
            {"name": "Coca-Cola 33 cl ", "price":  15 },
            {"name": "Coca-Cola light 33 cl ", "price":  15 },
            {"name": "Fanta 33 cl ", "price":  15  },
            {"name": "Sprite 33 cl ", "price":  15 },
            {"name": "Mineralvatten 33 cl ", "price":  15 },
            {"name": "Lättöl 33 cl ", "price":  15 },
            {"name": "Coca-Cola 50 cl ", "price":  20 },
            {"name": "Fanta 50 cl ", "price":  20 }
        ]
    }

    //Pizzor klass 1
    let tableClass_1Ref = document.querySelector("#class_1");
    let pizza_class_1Ref = menu["pizza_class_1"];

    pizza_class_1Ref.forEach(pizza => {
        let trRef = document.createElement("tr");
        let tdRef1 = document.createElement("td");
        let tdRef2 = document.createElement("td");
        let tdRef3 = document.createElement("td");

        let btnRef = document.createElement("input");
        btnRef.setAttribute("type", "button");
        btnRef.classList.add("btn");
        btnRef.classList.add("btn-success");
        btnRef.setAttribute("value", "Lägg till");
        btnRef.setAttribute("data-name", pizza.name);

        addEventListenerTobutton(btnRef);

        tdRef1.textContent = pizza.name;
        tdRef2.textContent = pizza.contents;
        tdRef3.textContent = pizza.price + " kr";
        trRef.appendChild(tdRef1);
        trRef.appendChild(tdRef2);
        trRef.appendChild(tdRef3);
        trRef.appendChild(btnRef);
        tableClass_1Ref.appendChild(trRef);
    });

    //Pizzor klass 2
    let tableClass_2Ref = document.querySelector("#class_2");
    let pizza_class_2Ref = menu["pizza_class_2"];

    pizza_class_2Ref.forEach(pizza => {
        let trRef = document.createElement("tr");
        let tdRef1 = document.createElement("td");
        let tdRef2 = document.createElement("td");
        let tdRef3 = document.createElement("td");
        
        let btnRef = document.createElement("input");
        btnRef.setAttribute("type", "button");
        btnRef.classList.add("btn");
        btnRef.classList.add("btn-success");
        btnRef.setAttribute("value", "Lägg till");
        btnRef.setAttribute("data-name", pizza.name);

        addEventListenerTobutton(btnRef);

        tdRef1.textContent = pizza.name;
        tdRef2.textContent = pizza.contents;
        tdRef3.textContent = pizza.price + " kr";
        trRef.appendChild(tdRef1);
        trRef.appendChild(tdRef2);
        trRef.appendChild(tdRef3);
        trRef.appendChild(btnRef);
        tableClass_2Ref.appendChild(trRef);
    });

    //Pizzor klass 3
    let tableClass_3Ref = document.querySelector("#class_3");
    let pizza_class_3Ref = menu["pizza_class_3"];

    pizza_class_3Ref.forEach(pizza => {
        let trRef = document.createElement("tr");
        let tdRef1 = document.createElement("td");
        let tdRef2 = document.createElement("td");
        let tdRef3 = document.createElement("td");

        let btnRef = document.createElement("input");
        btnRef.setAttribute("type", "button");
        btnRef.classList.add("btn");
        btnRef.classList.add("btn-success");
        btnRef.setAttribute("value", "Lägg till");
        btnRef.setAttribute("data-name", pizza.name);

        addEventListenerTobutton(btnRef);

        tdRef1.textContent = pizza.name;
        tdRef2.textContent = pizza.contents;
        tdRef3.textContent = pizza.price + " kr";
        trRef.appendChild(tdRef1);
        trRef.appendChild(tdRef2);
        trRef.appendChild(tdRef3);
        trRef.appendChild(btnRef);
        tableClass_3Ref.appendChild(trRef);
    })

    //Såser
    let tableSoserRef = document.querySelector("#soser");
    let soserRef = menu["sauces"];

    soserRef.forEach(sauce => {
        let trRef = document.createElement("tr");
        let tdRef1 = document.createElement("td");
        let tdRef2 = document.createElement("td");
        let tdRef3 = document.createElement("td");
        
        let btnRef = document.createElement("input");
        btnRef.setAttribute("type", "button");
        btnRef.classList.add("btn");
        btnRef.classList.add("btn-success");
        btnRef.setAttribute("value", "Lägg till");
        btnRef.setAttribute("data-name", sauce.name);

        addEventListenerTobutton(btnRef);

        let sauceAmount = sauce.name.split(" ");        

        if (sauceAmount.length == 4) {
            tdRef1.textContent = sauceAmount[0];
            tdRef2.textContent = sauceAmount[1] + " " + sauceAmount[2];
        }
        else if(sauceAmount.length == 5){
            tdRef1.textContent = sauceAmount[0] + " " + sauceAmount[1];
            tdRef2.textContent = sauceAmount[2] + " " + sauceAmount[3];
        }
        
        tdRef3.textContent = sauce.price + " kr";
        trRef.appendChild(tdRef1);
        trRef.appendChild(tdRef2);
        trRef.appendChild(tdRef3);
        trRef.appendChild(btnRef);
        tableSoserRef.appendChild(trRef);
    })

    //Drycker        
    let tableDyckRef = document.querySelector("#drycker");
    let dryckRef = menu["drinks"];

    dryckRef.forEach(dryck => {
        let trRef = document.createElement("tr");
        let tdRef1 = document.createElement("td");
        let tdRef2 = document.createElement("td");

        let btnRef = document.createElement("input");
        btnRef.setAttribute("type", "button");
        btnRef.classList.add("btn");
        btnRef.classList.add("btn-success");
        btnRef.setAttribute("value", "Lägg till");
        btnRef.setAttribute("data-name", dryck.name);

        addEventListenerTobutton(btnRef);
        
        tdRef1.textContent = dryck.name;
        tdRef2.textContent = dryck.price + " kr";

        trRef.appendChild(tdRef1);
        trRef.appendChild(tdRef2);
        trRef.appendChild(btnRef);
        tableDyckRef.appendChild(trRef);
    })

    let info_timerRef = document.querySelector("#info_timer");

    info_timerRef.textContent = "";

    setInterval(() =>{
        oGlobalObject.sec += 1;
        if(oGlobalObject.sec == 60){
            oGlobalObject.min += 1;
            oGlobalObject.sec = 0;
        }
        else if(oGlobalObject.min == 60){
            oGlobalObject.hours += 1;
            oGlobalObject.min = 0;
        }
        
        if(oGlobalObject.min > 9){
            info_timerRef.textContent = oGlobalObject.hours + " : " + oGlobalObject.min;
        }
        else{
            info_timerRef.textContent = oGlobalObject.hours + " : 0" + oGlobalObject.min;
        }
    },1000)

})

// #endregion

// #region Funktion för att addera lyssnre till knappen vid varje produkt
function addEventListenerTobutton(btnRef){
    let h3Ref = "";
    let inputRef = "";
    inputRef = document.createElement("input");
    inputRef.setAttribute("type", "number");
    inputRef.setAttribute("id", "NumberTable");
    inputRef.setAttribute("min", 1);
    inputRef.setAttribute("max", 16);
    inputRef.setAttribute("value", 1);
    btnRef.addEventListener("click", () => {
        productsCurrentOrder.push(btnRef.getAttribute("data-name"));

        if(productsCurrentOrder.length > 0){
            //placeOrderRef.classList.remove("d-none");
            let modalBodyRef = document.querySelector(".modal-body-nuvarandeBeställning");
            modalBodyRef.innerHTML = "";
            h3Ref = document.createElement("h3");
            h3Ref.innerHTML = "Order: " + (orders.length + 1);
            h3Ref.setAttribute("id", "orderNumber")
            modalBodyRef.appendChild(h3Ref);
            let labelRef = document.createElement("label");
            labelRef.innerHTML = "Bord"
            labelRef.setAttribute("for", "#NumberTable");
            modalBodyRef.appendChild(labelRef);
            
            modalBodyRef.appendChild(inputRef);
            showOrder(modalBodyRef);
            
        }
        else if(productsCurrentOrder.length == 0){
            let modalBodyRef = document.querySelector(".modal-body-nuvarandeBeställning");
            modalBodyRef.innerHTML = "";
            let h3Ref = document.createElement("h3");
            h3Ref.innerHTML = "Tom beställning";
            h3Ref.classList.add("text-danger");
            modalBodyRef.appendChild(h3Ref);
        }  
        
    }) 
}

// #endregion

// #region modal för att lägga en order och visa lagda ordrar 

let placeOrderRef = document.querySelector("#placeOrder");
placeOrderRef.addEventListener("click", () => {
    let modalBodyRefOrders = document.querySelector(".modal-body-nuvarandeBeställning");
    let h3Ref = document.querySelector("#orderNumber");
    let inputRef = document.querySelector("[type='number']");
    console.log("modal");
    
    let modalBodyRef = document.querySelector(".modal-body-laggdaBeställning");
    modalBodyRefOrders.innerHTML = "";
    modalBodyRef.innerHTML = "";
    let newOrder = new Order(h3Ref.innerHTML, inputRef.getAttribute("value"), productsCurrentOrder);

    orders.push(newOrder);
    productsCurrentOrder = [];

    if(orders.length > 0){
        orders.forEach(order => {
            let divRef = document.createElement("div");
            divRef.classList.add("d-flex");
            divRef.classList.add("justify-content-between");
            let innerDivRef = document.createElement("div");
            let h3Ref = document.createElement("h3");
            let tableRef = document.createElement("h6");
        
            h3Ref.innerHTML = order.orderNumber;
            tableRef.innerHTML = "table" + order.table;

            innerDivRef.appendChild(h3Ref);
            innerDivRef.appendChild(tableRef);

            order.products.forEach(product => {
                
                let pRef = document.createElement("p");
                pRef.innerHTML = product;
                innerDivRef.appendChild(pRef);
            })
            
            let btnRef = document.createElement("button");
            btnRef.classList.add("btn");
            btnRef.classList.add("btn-danger");
            btnRef.classList.add("h-25")
            btnRef.style.margin = "0.25rem";
            btnRef.innerHTML = "Ta bort";

            btnRef.addEventListener("click", (event) => {
                modalBodyRef.removeChild(divRef);
                let index = orders.indexOf(order);
                if(index !== -1){
                    orders.splice(index, 1);
                }
            })

            divRef.appendChild(innerDivRef);
            divRef.appendChild(btnRef);
            modalBodyRef.appendChild(divRef);
        });
    }
    placeOrderRef.removeEventListener("click", null);
    
});

// #endregion

// #region för att visa nuvarande beställning

function showOrder(modalBodyRef){
    if(productsCurrentOrder.length > 0){
        placeOrderRef.classList.remove("d-none");
        productsCurrentOrder.forEach(products => {
            
        let divRef = document.createElement("div");
        divRef.classList.add("d-flex");
        divRef.classList.add("justify-content-between");
        let pRef = document.createElement("p");
        pRef.textContent = products;
        let buttonRef = document.createElement("button");
        buttonRef.setAttribute("data-name", products);
        buttonRef.innerHTML = "Ta bort";
        buttonRef.classList.add("btn");
        buttonRef.classList.add("btn-danger");
        buttonRef.style.margin = "0.25rem";
        buttonRef.addEventListener("click", (event) => {
            divRef.removeChild(buttonRef);
            divRef.removeChild(pRef);
            let productName = event.target.getAttribute("data-name");
            let index = productsCurrentOrder.indexOf(productName)
            if(index !== -1){
                productsCurrentOrder.splice(index, 1);
            }
            if(productsCurrentOrder.length == 0){
                modalBodyRef.innerHTML = "";
                placeOrderRef.classList.add("d-none");
            }
        })
        divRef.appendChild(pRef);
        divRef.appendChild(buttonRef);
        modalBodyRef.appendChild(divRef);
            
            
        })
    }
}

// #endregion

//Hannah


