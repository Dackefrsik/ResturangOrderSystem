/*
Deltagare:
Daniel Frisk - 000824
Johan Hertz - 970422 
Hannah Uhlán - 950901
*/

"use strict";

// #region timer för klockan i menyn 
window.oGlobalObject = {
    day : new Date().getDate(),
    month : new Date().getMonth(),
    year : new Date().getFullYear(),
    sec : new Date().getSeconds(),
    hours : new Date().getHours(),
    min : new Date().getMinutes()
}
// #endregion

// #region Modal för vektorer som sparar ordrar och produkter i den ordern som läggs

let orders = [];
let productsCurrentOrder = [];
let priceCurrentOrder = [];
let tables = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let kvitton = [];

// #endregion

// #region Modal klassen för genomförd produkt

class Order {
    constructor(orderNumber, table, products, price, otherInformation){
        this.orderNumber = orderNumber,
        this.table = table,
        this.products = products,
        this.price = price,
        this.otherInformation = otherInformation

    }

}
class kvitto{
    constructor(kvittoNummer, day, month, year, hours, min , orderNumber, products, price, totalprice){
        this.kvittoNummer = kvittoNummer;
        this.day = day,
        this.month = month,
        this.year = year,
        this.hours = hours,
        this.min = min,
        this.orderNumber = orderNumber,
        this.products = Array.isArray(products) ? products : [],
        this.price = Array.isArray(price) ? price : []
        this.totalprice = totalprice
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
    let selcetRef = document.createElement("select");
    selcetRef.classList.add("form-control", "mb-1", "fs-5");
    selcetRef.setAttribute("id", "selectTable")
    
    tables.forEach(table => {
        let optionRef = document.createElement("option");
        optionRef.innerHTML = (table + 1);
        optionRef.classList.add("fs-5");
        selcetRef.appendChild(optionRef);
    })
    


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
            labelRef.setAttribute("for", "#selectTable");
            labelRef.classList.add("fs-3");
            modalBodyRef.appendChild(labelRef);
            
            modalBodyRef.appendChild(selcetRef);
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
    let select = document.querySelector("#selectTable");
    let otherInformation = document.querySelector("#otherInformation")
    
    let modalBodyRef = document.querySelector(".modal-body-laggdaBeställning");
    modalBodyRefOrders.innerHTML = "";
    modalBodyRef.innerHTML = "";
    
    let newOrder = new Order(h3Ref.innerHTML, select.value, productsCurrentOrder, countPrice(), otherInformation.value);
    
    orders.push(newOrder);
    if(orders.length > 0){
        console.log("order");
        orders.forEach(order => {
            modalBodyRef.classList.remove("text-danger", "fs-3");
            let divRef = document.createElement("div");
            divRef.classList.add("d-flex", "justify-content-between", "border", "p-2", "m-1", "rounded-2");
            
            let innerDivRef = document.createElement("div");
            innerDivRef.classList.add("w-100");
            let h3Ref = document.createElement("h3");
            let tableRef = document.createElement("h6");
            console.log(order);
            h3Ref.innerHTML = order.orderNumber;
            tableRef.innerHTML = "Table " + order.table;

            innerDivRef.appendChild(h3Ref);
            innerDivRef.appendChild(tableRef);

            order.products.forEach(product => {
                let pRef = document.createElement("p");
                pRef.innerHTML = product;
                innerDivRef.appendChild(pRef);
            })

            let otherHeader = document.createElement("H6");
            otherHeader.innerHTML = "Övrigt:";
            innerDivRef.appendChild(otherHeader);
            let otherText = document.createElement("p");
            otherText.innerText = order.otherInformation;
            innerDivRef.appendChild(otherText);

            let btnRef = document.createElement("button");
            btnRef.classList.add("btn", "btn-danger", "h-25", "d-flex", "align-items-end");
            btnRef.style.margin = "0.25rem";
            btnRef.innerHTML = "Ta bort";

            btnRef.addEventListener("click", () => {  
                modalBodyRef.removeChild(divRef);
                let index = orders.indexOf(order);
                if(index !== -1){
                    orders.splice(index, 1);
                    
                }

                if(orders.length == 0){
                    modalBodyRef.innerHTML = "Finns inga ordrar!";
                    modalBodyRef.classList.add("text-danger", "fs-3");
                    let placeOrderRef = document.querySelector("#placeOrder");
                    placeOrderRef.classList.add("d-none");

                }

            })
            
            divRef.appendChild(innerDivRef);
            let divPrice = document.createElement("div");
            let pRef = document.createElement("p");
            let pRef2 = document.createElement("p");
            pRef.innerText = "Totalsumma: ";
            pRef2.innerText = newOrder.price + "kr";
            divPrice.appendChild(pRef);
            divPrice.appendChild(pRef2);
            divPrice.appendChild(btnRef);
            divPrice.classList.add("d-flex", "justify-content-between", "align-items-end");

            innerDivRef.appendChild(divPrice);
            modalBodyRef.appendChild(divRef);

        });
    }
    placeOrderRef.removeEventListener("click", null);

    //Skapar ett kvitto

    let newKvitto = new kvitto(kvitton.length + 1 ,oGlobalObject.day, oGlobalObject.month, oGlobalObject.year, oGlobalObject.hours, oGlobalObject.min, newOrder.orderNumber, newOrder.products, priceCurrentOrder, countPrice());
    kvitton.push(newKvitto);

    createkvitto(newKvitto);
    productsCurrentOrder = [];
    priceCurrentOrder = [];

    buttonOrder();
    countPrice();
    
});

// #endregion

// #region Kvitto

let closeReceiptRef = document.querySelector("#closeReceipt");
closeReceiptRef.addEventListener("click", () => {
    let receiptModalBodyRef = document.querySelector(".modal-body-kvitto");

    receiptModalBodyRef.innerHTML = "";
});

// #endregion

// #region för att visa nuvarande beställning

function showOrder(modalBodyRef){
    if(productsCurrentOrder.length > 0){
        
        let inDiv = document.createElement("div");
        let divRef = document.createElement("div");
        placeOrderRef.classList.remove("d-none");
        productsCurrentOrder.forEach((products, index) => {
            let innerDivRef = document.createElement("div");    
            let inputDiv = document.createElement("div");
            let inputRef =  document.createElement("input");
            inputRef.classList.add("w-100", "form-control", "fs-5");
            inputRef.setAttribute("type", "text");
            inputRef.setAttribute("placeholder", "Ändring av ingredienser");

            innerDivRef.classList.add("d-flex", "justify-content-between", "fs-5");
            let pRef = document.createElement("p");
            pRef.textContent = products;
            pRef.classList.add("mt-2");
            innerDivRef.appendChild(pRef);
            let pRef2 = document.createElement("p");
            pRef2.classList.add("mt-2");
            pRef2.textContent = priceCurrentOrder[index] + "kr";
            innerDivRef.appendChild(pRef2);
            
            let buttonRef = document.createElement("button");
            buttonRef.setAttribute("data-name", products);
            buttonRef.innerHTML = "Ta bort";
            buttonRef.classList.add("btn", "btn-danger");
            buttonRef.style.margin = "0.25rem";
            buttonRef.addEventListener("click", (event) => {
                innerDivRef.removeChild(buttonRef);
                innerDivRef.removeChild(pRef);
                innerDivRef.removeChild(pRef2);
                inputDiv.firstChild.remove();
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
            
            innerDivRef.appendChild(buttonRef);
            inputDiv.appendChild(inputRef);
            inDiv.appendChild(innerDivRef);
            inDiv.appendChild(inputDiv);
            divRef.appendChild(inDiv);
        })

        let textArea = document.createElement("textarea");
        textArea.classList.add("form-control", "fs-5")
        textArea.setAttribute("rows", "4");
        textArea.setAttribute("cols", "10");
        textArea.style.resize = "none";
        textArea.setAttribute("placeholder", "Övrig information");
        textArea.setAttribute("id", "otherInformation");
        
        let diveTotalSumma = document.createElement("div");
        diveTotalSumma.classList.add("d-flex", "justify-content-between", "flex-wrap", "mt-2");
        let pRef = document.createElement("p");
        pRef.setAttribute("id", "TotalsummaOrder");
        pRef.classList.add("fs-5");
        let pRef2 = document.createElement("p");
        pRef2.classList.add("fs-5");
        pRef.textContent = "Totalsumma:";
        let pricelable = " "; 
        let totalprice = 0;
        priceCurrentOrder.forEach(price => {
            totalprice += parseInt(price); 
        }); 
        pricelable = totalprice;
        pRef2.textContent = pricelable + " kr";
        diveTotalSumma.appendChild(textArea);
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

    return totalprice;
}

// #endregion

// #region för att kolla om knappen för att visa order ska gå att klicka på

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

// #region visa alla kvitton

let kvittoKnappRef = document.querySelector("#kvittoKnapp");

kvittoKnappRef.addEventListener("click", () => {
    let allaKvittonBody = document.querySelector(".modal-body-allaKvitton");
    allaKvittonBody.innerHTML = "";

    kvitton.forEach(kvitto => {

        let divRef = document.createElement("div");
        divRef.classList.add("border", "p-2", "m-1", "rounded-2", "d-flex", "justify-content-between");
        let innerDiv = document.createElement("div");
        let innerDiv2 = document.createElement("div");
        innerDiv2.classList.add("d-flex", "align-items-end");
        let h5Ref = document.createElement("h5");
        h5Ref.textContent = "Kvittonummer: " + kvitto.kvittoNummer;
        let pRef = document.createElement("p");
        pRef.textContent = kvitto.orderNumber;

        innerDiv.appendChild(h5Ref);
        innerDiv.appendChild(pRef);

        let btnRef = document.createElement("button");
        btnRef.classList.add("btn", "btn-success");
        btnRef.innerText = "Visa kvitto";
        btnRef.addEventListener("click", () =>{
            createkvitto(kvitto);
        }) 
        innerDiv2.appendChild(btnRef);
        divRef.appendChild(innerDiv);
        divRef.appendChild(innerDiv2);

        divRef.setAttribute("data-bs-toggle", "modal");
        divRef.setAttribute("data-bs-target", "#kvittoModal");
        divRef.setAttribute("data-order", kvitto.kvittoNummer);
        allaKvittonBody.appendChild(divRef);
        
    });
    
})

//#endregion 

//#region För att skapa kvitton
function createkvitto(Kvitto){
    let modalBodyKvittonRef = document.querySelector(".modal-body-kvitto");

    let divRef = document.createElement("div");
    divRef.classList.add("d-flex", "align-items-center", "flex-column");
    let h1Ref = document.createElement("h1");
    h1Ref.textContent = Kvitto.kvittoNummer;
    let h2Ref = document.createElement("h2");
    h2Ref.textContent = Kvitto.orderNumber;
    let h4Ref = document.createElement("h4");

    if(Kvitto.min < 10){
        h4Ref.textContent = Kvitto.hours + ":0" + Kvitto.min; 
    }
    else{
        h4Ref.textContent = Kvitto.hours + ":" + Kvitto.min; 
    }

    let h5Ref = document.createElement("h5");
    h5Ref.textContent = Kvitto.day + "/" + Kvitto.month + "-" + Kvitto.year;

    divRef.appendChild(h1Ref);
    divRef.appendChild(h2Ref);
    divRef.appendChild(h4Ref);
    divRef.appendChild(h5Ref);

    modalBodyKvittonRef.appendChild(divRef);
    let productDiv = document.createElement("div");


    for(let i = 0; i < Kvitto.products.length; i++){
        let productInnerDiv = document.createElement("div");
        productInnerDiv.classList.add("d-flex", "justify-content-between");
        let pRef2 = document.createElement("p");
        pRef2.textContent = Kvitto.products[i];
        productInnerDiv.appendChild(pRef2);

        let pRef3 = document.createElement("p");
        pRef3.textContent = Kvitto.price[i] + "kr";
    
        productInnerDiv.appendChild(pRef3);

        productDiv.appendChild(productInnerDiv);
        modalBodyKvittonRef.appendChild(productDiv);

    }
    

    let totalpriceDiv = document.createElement("div");
    totalpriceDiv.classList.add("d-flex", "justify-content-between");
    let pRef2 = document.createElement("p");
    let pRef3 = document.createElement("p");

    pRef2.textContent = "Total: ";
    pRef3.textContent = Kvitto.totalprice + "kr";

    totalpriceDiv.appendChild(pRef2);
    totalpriceDiv.appendChild(pRef3);
    modalBodyKvittonRef.appendChild(totalpriceDiv);

    buttonOrder();
}

//#endregion