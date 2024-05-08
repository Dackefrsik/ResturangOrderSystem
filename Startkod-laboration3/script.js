"use strict";


// #region timer för klockan i menyn 
window.oGlobalObject = {
    sec : new Date().getSeconds(),
    hours : new Date().getHours(),
    min : new Date().getMinutes()
}

window.addEventListener("load", () => {

    let info_timerRef = document.querySelector("#info_timer");

    info_timerRef.textContent = "";

    let timer = setInterval(() =>{
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

// #region Modal för pågående beställning

    let nuvarandeBeställning = [];

    if(nuvarandeBeställning.length == 0){
        let modalBodyRef = document.querySelector(".modal-body-nuvarandeBeställning");
        modalBodyRef.innerHTML = "";
        let h3Ref = document.createElement("h3");
        h3Ref.innerHTML = "Tom beställning";
        h3Ref.classList.add("text-danger");
        modalBodyRef.appendChild(h3Ref);
    }
    else if(nuvarandeBeställning.length > 0){
        let modalBodyRef = document.querySelector(".modal-body-nuvarandeBeställning");
        modalBodyRef.innerHTML = "";
        let h3Ref = document.createElement("h3");
        h3Ref.innerHTML = "Pågående beställning";
        modalBodyRef.appendChild(h3Ref);
    }
// #endregion