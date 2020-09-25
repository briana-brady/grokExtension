//https://stackoverflow.com/questions/34170032/how-to-get-selected-text-in-chrome-extension-development?noredirect=1&lq=1
$(document).ready(()=>{
  $.get("https://www.groklingua.com/login/extension", function(result){
    if(!result.loggedIn){
      window.location.href="signin.html";
    }
    chrome.runtime.sendMessage({
      greeting: "grokgrok",
      confirm: "popup.js",
      loggedIn: result.loggedIn
    });
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
      console.log("url: " + tabs[0].url);
      console.log("title: " + tabs[0].title);
      chrome.tabs.executeScript({
        file: "contentScript.js"
    }, function(selectedText) {
        console.log(selectedText[0]);
        $("#selectedText").text(selectedText[0]); //document is the popup.html
    });

  });

  function showResults(tab, selectedText){

  }
})
