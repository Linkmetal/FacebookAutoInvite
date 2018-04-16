//check if price is 0
//products out of stock
//input type of product, and check if all have the same price


let invited = 0; //people invited
let index = 0; //index of the actual post
let posts; //collection of posts

chrome.runtime.onMessage.addListener(gotMessage);
console.log("FacebookAutoInvite loaded.");
function gotMessage(message, sender, sendResponse){
    if(message.txt === "start"){  
        posts = document.querySelectorAll("._1xnd ._2x4v");
        console.log(posts);
        openPost(index);
    }
}

function openPost(ind){ //open a post
    if(ind < posts.length){
        posts[ind].scrollIntoView({block: "start", behavior: "instant"});
        posts[ind].click();
        autoInvite(0, 0);
    }
}

function autoInvite(p, a){
    let prevLength = p; //previous length of likers
    let actualLength = a; //actual length of likers
    
    let buttons = document.querySelectorAll('._4t2a ._42ft'); //get invite buttons
    actualLength = buttons.length;

    for(let i = prevLength; i < actualLength; i++){
        buttons[i].scrollIntoView({block: "start", behavior: "smooth"});
        if(buttons[i].getAttribute('ajaxify') != null && buttons[i].getAttribute('ajaxify').indexOf('invite') != -1){ //check if the button is an invite button and if its active
            buttons[i].click();
            invited++;
            console.log(invited);
 
        }
    }

    let seeMore = document.querySelector("#reaction_profile_pager > div > a"); // get "see more" links
    if(seeMore != null){
        seeMore.click();
    }
    setTimeout(function(){
        prevLength = actualLength;
        let buttons = document.querySelectorAll('._4t2a ._42ft');
        actualLength = buttons.length;
        if(prevLength !== actualLength){ //check if the previous and the actual lenght is different to continue scrapping or not
            autoInvite(prevLength, actualLength);
        }
        else{
            document.querySelector("._4t2a .layerCancel").click(); //get the close button
            window.scrollTo(0,document.body.scrollHeight);
            posts = document.querySelectorAll("._1xnd ._2x4v");
            index++;
            setTimeout(function(){
                openPost(index);
            }, 1000);
        }
    }, 2000);
}