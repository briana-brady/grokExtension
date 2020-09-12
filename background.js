chrome.runtime.onInstalled.addListener(function(){
  console.log('startup!')
  cookie = chrome.cookies.getAll({domain:"localhost", name: "connect.sid"}, function(cookies){
    if(!cookies.length){
      chrome.browserAction.setPopup({popup: "signin.html"});
      console.log("cookie removed");
    }else{
      cookies.forEach(cookie => {
        console.log(cookie.value);
      });
    }
  });
  chrome.cookies.onChanged.addListener(function(changeInfo){
    if(changeInfo.removed){
      chrome.browserAction.setPopup({popup: "signin.html"});
      console.log("cookie removed");
    }else{
      chrome.browserAction.setPopup({popup: "popup.html"});
      console.log("cookie added");
    }
  });

});

chrome.runtime.onMessage.addListener(
  function(req, sender, sendResponse){
    console.log(sender.id);
    console.log(req);
    if(req.greeting == "grokgrok" && req.loggedIn){
      console.log("setpopup")
      chrome.browserAction.setPopup({popup: "popup.html"});
      sendResponse({greeting: "grokgrok"});
    }else{
      console.log("setsignin");
      chrome.browserAction.setPopup({popup: "signin.html"});
      sendResponse({greeting: "grokgrok"});
    }
  }
)
