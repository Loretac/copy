
// Asynchronous request using AJAX
var request = new XMLHttpRequest();

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ]

    const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    ]

    // https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/

    // Do not do this below!!
    // var convoDate = new Date(data["data"]["conversationDate"]);

    // instead...

    // Set the conversation date
    var date = data["data"]["conversationDate"];

    var str = date.split("-");
    console.log(str);


    convoDate = new Date(str[0], str[1]-1, str[2]);

    document.getElementById("conversation-date").textContent = days[convoDate.getDay()] + ", " + months[convoDate.getMonth()] + " " + convoDate.getDate() + ", " + convoDate.getFullYear();

    console.log(data);

    // document.getElementById("conversation-date").textContent = data["data"]["conversationDate"];

    // Define who the main user is... 
    var mainUser = getMainUser();

 
    for(var i = 0; i < data["data"]["messages"].length; i++){
        addMessage(data["data"]["messages"][i], mainUser);
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

var d = new Date(messageObject["timestamp"]);
// alert(d.getTime());
// alert(d.toLocaleTimeString(undefined));

time.textContent = d.toLocaleTimeString(undefined, {
    hour:'numeric',
    minute:'2-digit'
});






    console.log("adding child");
    document.getElementById("chat-region").appendChild(msgDiv);

    

};
