// Asynchronous request using AJAX
var request = new XMLHttpRequest();

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    // Set the conversation date
    setConvoDate(data);

    // Define who the main user is... 
    var mainUser = getMainUser();

    // Add all messages
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


/* ==========================================================================
   The chat transcript will show through this person's point of view.
   Their messages will show the left, and their avatar on the right.
   ========================================================================== */
function getMainUser(){
    return "Charlie Hemn";
}

/* ==========================================================================
   Sets the date of the conversation
   ========================================================================== */
function setConvoDate(data){
    /*

    https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/

    DO NOT do this:
    var convoDate = new Date(data["data"]["conversationDate"]);

    Creating date objects from strings leads to inconsistency between browsers.
    Instead, create date object using arguments.

    */


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

    var dateStr = data["data"]["conversationDate"];
    // Date as string: "2018-10-14"

    var dateArr = dateStr.split("-");
    // Now in format ["2018", "10", "14"]

    var convoDate = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);

    document.getElementById("conversation-date").textContent = 
        days[convoDate.getDay()] +
        ", " + months[convoDate.getMonth()] +
        " " + convoDate.getDate() +
        ", " + convoDate.getFullYear();
}



/* ==========================================================================
   Adds a message to the DOM
   ========================================================================== */
function addMessage(messageObject, mainUser){

    // create an HTML div
    var msgDiv = document.createElement("div");

    // Fill div with message template
    msgDiv.innerHTML = 
    `
        <img class="avatar">

        <span class="message-bubble">
            <span class="message-arrow"></span>
            <span class="message-text-container"></span>


            <div class="message-footer">
                <span class="name"></span>

                <span class="clock">
                    <img src="clock_icon.png">
                </span>

                <span class="time"></span>

            </div>

        </span>
    `

    // Assign correct classes to message
    msgDiv.classList.add("message");
    msgDiv.classList.add("clearfix"); // has children of position:absolute

    // User or friend?
    if(messageObject["username"] == mainUser){
        msgDiv.classList.add("user");
    }
    else{
        msgDiv.classList.add("friend");
    }

    // Focused?
    if(messageObject["focused"] == true){
        msgDiv.classList.add("focus");
    }

    // Add avatar
    var avatar = msgDiv.querySelector(".avatar");
    avatar.src = messageObject["image"];


    // Add message to text container
    var container = msgDiv.querySelector(".message-bubble > .message-text-container");
    container.textContent = messageObject["message"];


    // Add username
    var name = msgDiv.querySelector(".message-bubble > .message-footer > .name");
    name.textContent = messageObject["username"];


    // Add timestamp
    var time = msgDiv.querySelector(".message-bubble > .message-footer > .time");

    var rawTime = new Date(messageObject["timestamp"]);

    // Convert raw time to 1:30 PM format
    time.textContent = rawTime.toLocaleTimeString(undefined, {
        hour:'numeric',
        minute:'2-digit'
    });

    // Add the completed message element to the chat region
    document.getElementById("chat-region").appendChild(msgDiv);
}
