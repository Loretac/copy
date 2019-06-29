
// Asynchronous request using AJAX
var request = new XMLHttpRequest();


request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    // Set the conversation date
    document.getElementById("conversation-date").textContent = data["data"]["conversationDate"];

    // Define who the main user is... 
    var mainUser = getMainUser();

    // addMessage(data["data"]["messages"][0], mainUser);

    console.log(data["data"]);

    console.log(data["data"]["conversationDate"]);

    for(var i = 0; i < data["data"]["messages"].length; i++){
        addMessage(data["data"]["messages"][i], mainUser);
        console.log(i);
    }


  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.open('GET', 'https://api.myjson.com/bins/18ce70', true);
request.send(); 


function getMainUser(){
    return "Charlie Hemn";
}


// Adds a message to the DOM
function addMessage(messageObject, mainUser){

    var chatRegion = document.getElementById("chat-region");
    var messageNum = chatRegion.childElementCount+1;



    console.log(messageObject);
    console.log(mainUser);

    // create an HTML div
    var msgDiv = document.createElement("div");




    msgDiv.innerHTML = 
    `
               

                <img class="avatar">

                <span class="message-bubble">
                    <span class="message-arrow">
                    </span>
                    <span class="message-text-container">
                      
                    
                    </span>


                    <div class="message-footer">
                        <span class="name">
                            
                        </span>
                        <span class="clock">
                            <img src="clock_icon.png">
                        </span>
                        <span class="time">
                            1:41 PM
                        </span>

                    </div>

                </span>

    `

msgDiv.classList.add("message");
msgDiv.classList.add("clearfix");


// assign correct classes
    if(messageObject["username"] == mainUser){
        msgDiv.classList.add("user");
        console.log("user: " + messageObject["message"]);
    }
    else{
        msgDiv.classList.add("friend");
        console.log("friend: " + messageObject["message"]);
    }

    if(messageObject["focused"] == true){
        msgDiv.classList.add("focus");
    }

// Add avatar
var avatar = msgDiv.querySelector(".avatar");
avatar.src = messageObject["image"];

var container = msgDiv.querySelector(".message-bubble > .message-text-container");
container.textContent = messageObject["message"];

var name = msgDiv.querySelector(".message-bubble > .message-footer > .name");
name.textContent = messageObject["username"];

var time = msgDiv.querySelector(".message-bubble > .message-footer > .time");
time.textContent = messageObject["timestamp"];






    console.log("adding child");
    document.getElementById("chat-region").appendChild(msgDiv);

    

};
