//check if price is 0
//products out of stock
//input type of product, and check if all have the same price

let invited = 0;

chrome.runtime.onMessage.addListener(gotMessage);
console.log("lodaded");
function gotMessage(message, sender, sendResponse){
    if(message.txt === "hello"){  
        console.log("Entro padentro");
        autoInvite(0, 0);
    }
}

function autoInvite(p, a){
    let prevLength = p;
    let actualLength = a;
    
        let buttons = document.querySelectorAll('._4t2a ._42ft');
        actualLength = buttons.length;

        for(let i = prevLength; i < actualLength; i++){
            console.log(buttons[i].getAttribute('ajaxify'));
            if(buttons[i].getAttribute('ajaxify') != null){
                if(buttons[i].getAttribute('ajaxify').indexOf('invite') != -1){
                    buttons[i].click();
                    invited++;
                }
            }
        }
        let seeMore = document.querySelector("#reaction_profile_pager > div > a");
        if(seeMore != null){
            seeMore.click();
        }
        setTimeout(function(){
            prevLength = actualLength;
            let buttons = document.querySelectorAll('._4t2a ._42ft');
            actualLength = buttons.length;
            if(prevLength !== actualLength){
                autoInvite(prevLength, actualLength);
            }
        }, 2000)
    
}