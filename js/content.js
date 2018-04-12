//check if price is 0
//products out of stock
//input type of product, and check if all have the same price


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    if(message.txt === "hello"){  
        console.log("Entro padentro");
        autoInvite();
    }
}

function autoInvite(){
    while(document.querySelector("#reaction_profile_pager > div > a") != null){
        console.log("Veo mas")
        document.querySelector("#reaction_profile_pager > div > a").click();
    }
    
    let buttons = document.getElementsByClassName('_42fr');
    
    for(elm of buttons){
        console.log("Te invito y te golpeo")
        elm.click();
    }
}