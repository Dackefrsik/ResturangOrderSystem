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
let priceCurrentOrder = [];


// #endregion

// #region Modal klassen för genomförd produkt

class Order {
    constructor(orderNumber, table, products){
        this.orderNumber = orderNumber,
        this.table = table,
        this.products = products,
        this.sum = () => {
            let sum = 0;
            this.products.forEach(product => {
                sum += product.price;
            });
            return sum;
        }

    }

}



// #endregion



// #region skirver ut alla produktyer vid load
window.addEventListener("load", () => {
    
    createMenu();
    
    updateDatum();

    // #region timer i menyraden
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

    // #endregion

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
        priceCurrentOrder.push(btnRef.getAttribute("data-price"));
        let modalBodyRef = document.querySelector(".modal-body-nuvarandeBeställning");

        if(productsCurrentOrder.length > 0){
            countPrice();
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
        modalBodyRef.classList.remove("text-danger");
        buttonOrder();
    })   
}

// #endregion

// #region modal för att lägga en order och visa lagda ordrar 

let placeOrderRef = document.querySelector("#placeOrder");
placeOrderRef.addEventListener("click", () => {
    let pRef = document.querySelector(".priceInfo");
    pRef.innerHTML = "0 kr";
    let modalBodyRefOrders = document.querySelector(".modal-body-nuvarandeBeställning");
    let h3Ref = document.querySelector("#orderNumber");
    let inputRef = document.querySelector("[type='number']");
    
    let modalBodyRef = document.querySelector(".modal-body-laggdaBeställning");
    modalBodyRefOrders.innerHTML = "";
    modalBodyRef.innerHTML = "";
    let newOrder = new Order(h3Ref.innerHTML, inputRef.getAttribute("value"), productsCurrentOrder);

    orders.push(newOrder);
    productsCurrentOrder = [];

    if(orders.length > 0){
        orders.forEach(order => {
            let divRef = document.createElement("div");
            divRef.classList.add("d-flex", "justify-content-between");
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
            btnRef.classList.add("btn", "btn-danger", "h-25");
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
        let divRef = document.createElement("div");
        placeOrderRef.classList.remove("d-none");
        productsCurrentOrder.forEach(products => {
            let innerDivRef = document.createElement("div");    
            
            innerDivRef.classList.add("d-flex", "justify-content-between");
            let pRef = document.createElement("p");
            pRef.textContent = products;
            let buttonRef = document.createElement("button");
            buttonRef.setAttribute("data-name", products);
            buttonRef.innerHTML = "Ta bort";
            buttonRef.classList.add("btn", "btn-danger");
            buttonRef.style.margin = "0.25rem";
            buttonRef.addEventListener("click", (event) => {
                
                innerDivRef.removeChild(buttonRef);
                innerDivRef.removeChild(pRef);
                let productName = event.target.getAttribute("data-name");
                let index = productsCurrentOrder.indexOf(productName);
                if(index !== -1){
                    productsCurrentOrder.splice(index, 1);
                    priceCurrentOrder.splice(index, 1);
                    countPrice();
                    if(productsCurrentOrder.length == 0){
                        modalBodyRef.innerHTML = "Tom beställning";
                        modalBodyRef.classList.add("text-danger");
                        let placeOrderRef = document.querySelector("#placeOrder");
                        placeOrderRef.classList.add("d-none");

                    }
                    
                    let pricelable = " "; 
                    let totalprice = 0;
                    priceCurrentOrder.forEach(price => {
                        totalprice += parseInt(price); 
                    });

                    pricelable = totalprice;
                    pRef2.textContent = pricelable + " kr"; 
                }
                buttonOrder();
            })
            innerDivRef.appendChild(pRef);
            innerDivRef.appendChild(buttonRef);
            divRef.appendChild(innerDivRef);
        })
        
        let diveTotalSumma = document.createElement("div");
        diveTotalSumma.classList.add("d-flex", "justify-content-between");
        let pRef = document.createElement("p");
        pRef.setAttribute("id", "TotalsummaOrder");
        let pRef2 = document.createElement("p");
        pRef.textContent = "Totalsumma:";
        let pricelable = " "; 
        let totalprice = 0;
        priceCurrentOrder.forEach(price => {
            totalprice += parseInt(price); 
        }); 
        pricelable = totalprice;
        pRef2.textContent = pricelable + " kr"; 
        diveTotalSumma.appendChild(pRef);
        diveTotalSumma.appendChild(pRef2);
        modalBodyRef.appendChild(divRef); 
        modalBodyRef.appendChild(diveTotalSumma);
    }
}

// #endregion

// #region räknar ut totalsumman för en beställning 

function countPrice(){
    let pPriceRef = document.querySelector(".priceInfo");
    let pricelable = " "; 
    let totalprice = 0;
    priceCurrentOrder.forEach(price => {
        totalprice += parseInt(price);
        
    }); 
    pricelable = totalprice;
    pPriceRef.innerHTML = pricelable + " kr";
}

// #endregion

// #region för att kolla om knappen för att visa order ska vara gå att klicka på

function buttonOrder(){
    console.log(productsCurrentOrder.length);
    let btnRef = document.querySelector("#buttonOrderModal");
    if(productsCurrentOrder.length > 0){
        btnRef.removeAttribute("disabled");
    }
    else if(productsCurrentOrder.length === 0){
        btnRef.setAttribute("disabled", true);
    }
}

// #endregion

// #region skapar kort för varje produkt
function createPizzaCard(item){
    //kolumn som håller kort
    let col = document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-xl-4", "col-xxl-3", "mb-2", "px-0", "px-md-2");
    
    //kort-div
    let card = document.createElement("div");
    card.classList.add("card", "h-100");

    //kort-inner-div som gör en row
    let cardInner = document.createElement("div");
    cardInner.classList.add("row", "no-gutters",  "mx-0", "h-100");

    //kort-body
    let cardBody = document.createElement("div");
    cardBody.classList.add("d-flex", "flex-column", "justify-content-between", "card-body","col-7");

    //kort-text
    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = item.name;
    let h6 = document.createElement("h6");
    h6.classList.add("card-subtitle");
    h6.textContent = `${item.price}kr`;

    cardBody.appendChild(h5);
    cardBody.appendChild(h6);

    //ingredienser
    if(item.contents != null){
    let p2 = document.createElement("p");
    p2.classList.add("card-text", "text-muted");
    let newContentArray = [];
    //byter ut a: mot strong
    item.contents.forEach(content => {
        if(content.includes("a:")){
            content = content.replace(content, "<strong>" + content.replace("a:", "") + "</strong>");
        }
        newContentArray.push(content);
    });
    p2.innerHTML = `${newContentArray.join(", ")}`;

    cardBody.appendChild(p2);
    }   

    //knapp
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-success");
    btn.textContent = "Lägg till";
    btn.setAttribute("data-name", item.name);
    btn.setAttribute("data-price", item.price);
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("col-5", "d-flex", "align-items-end", "justify-content-end", "p-3");

    //appendar allt
    buttonDiv.appendChild(btn);
    
    addEventListenerTobutton(btn);

    cardInner.appendChild(cardBody);
    cardInner.appendChild(buttonDiv);
    card.appendChild(cardInner);
    col.appendChild(card);

    return col;
}
// #endregion

// #region skapar menyn

function createMenu(){
    let class1_row = document.querySelector("#class_1");
    let pizza_class_1Ref = menu["pizza_class_1"];
    pizza_class_1Ref.forEach(pizza => {
        let col = createPizzaCard(pizza);
        class1_row.appendChild(col);
    });
    let class2_row = document.querySelector("#class_2");
    let pizza_class_2Ref = menu["pizza_class_2"];
    pizza_class_2Ref.forEach(pizza => {
        let col = createPizzaCard(pizza);
        class2_row.appendChild(col);
    });

    let class3_row = document.querySelector("#class_3");
    let pizza_class_3Ref = menu["pizza_class_3"];
    pizza_class_3Ref.forEach(pizza => {
        let col = createPizzaCard(pizza);
        class3_row.appendChild(col);
    });

    let sauces_row = document.querySelector("#soser");
    let saucesRef = menu["sauces"];
    saucesRef.forEach(sauce => {
        let col = createPizzaCard(sauce);
        sauces_row.appendChild(col);
    });

    let drinks_row = document.querySelector("#drycker");
    let drinksRef = menu["drinks"];
    drinksRef.forEach(drink => {
        let col = createPizzaCard(drink);
        drinks_row.appendChild(col);
    });

}
// #endregion


// #region skapar menyn
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
// #endregion

//#region uppdatera datum
function updateDatum() {
    let dagensDatum = new Date();
    let dag = dagensDatum.getDate();
    let månad = dagensDatum.getMonth() + 1; 
    let år = dagensDatum.getFullYear(); 

    // Formatera datumet som DD/MM/YYYY
    let datumString = padZero(dag) + "/" + padZero(månad) + "/" + år;

    // Uppdatera innehållet i datumelementet
    document.getElementById("info_datum").innerText = datumString;
  }

  // Funktion för att lägga till en nolla framför en siffra om den är mindre än 10
  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

//#endregion