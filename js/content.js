//check if price is 0
//products out of stock
//input type of product, and check if all have the same price


chrome.runtime.onMessage.addListener(gotMessage);
console.log("lodaded");
function gotMessage(message, sender, sendResponse){
    if(message.txt === "hello"){  
        console.log("Entro padentro");
        autoInvite();
    }
}

function autoInvite(p, a){
    let prevLength = p;
    let actualLength = a;
    
        let buttons = document.getElementsByClassName('_42fr');
        actualLength = buttons.length;

        for(let i = prevLength; i < actualLength; i++){
            // console.log($(buttons[i]).attr("disabled"));
            if($(buttons[i]).attr("disabled") !== "disabled"){
                buttons[i].click();
            }
        }
        let seeMore = document.querySelector("#reaction_profile_pager > div > a");
        if(seeMore != null){
            seeMore.click();
        }
        setTimeout(function(){
            prevLength = actualLength;
            buttons = document.getElementsByClassName('_42fr');
            actualLength = buttons.length;
            if(prevLength !== actualLength){
                autoInvite(prevLength, actualLength);
            }
        }, 2000)
    
}