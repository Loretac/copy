function showFriendMsg(msg){

};

function showYourMsg(msg){

};


// Asymnchronous request using AJAX
var request = new XMLHttpRequest();


request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    // Set the conversation date
    document.getElementById("conversation-date").textContent = data["data"]["conversationDate"];

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


