
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

    addMessage(data["data"]["messages"][0], mainUser);

    console.log(data["data"]);

    console.log(data["data"]["conversationDate"]);


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
    console.log(messageObject);
    console.log(mainUser);

    // document.getElementById("chat-region").innerHTML =

    // `
    //             <div class="message friend" id="message1">

    //             <img class="avatar friend" src="https://randomuser.me/api/portraits/women/2.jpg">

    //             <span class="message-bubble message-1-bubble friend">
    //                 <span class="message-arrow friend">
    //                 </span>
    //                 <span class="message-text-container friend">
                      
    //                         Hi Charlie! It was good meeting you for coffee the other day, I would love to talk more about your autonomous car start up! Here's my email: webtrabel@email.com
                  
                    
    //                 </span>


    //                 <div class="message-footer">
    //                     <span class="name friend">
    //                         Mygel van Trable
    //                     </span>
    //                     <span class="clock">
    //                         <img src="clock_icon.png">
    //                     </span>
    //                     <span class="time">
    //                         1:41 PM
    //                     </span>

    //                 </div>

    //             </span>


    //         </div>
    // `;
};
