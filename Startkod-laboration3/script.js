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

        let textNodeRef = document.createTextNode(oGlobalObject.hours + " : " + oGlobalObject.min);

        info_timerRef.textContent = oGlobalObject.hours + " : " + oGlobalObject.min;

    },1000)
})

// #endregion