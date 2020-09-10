//https://stackoverflow.com/questions/34170032/how-to-get-selected-text-in-chrome-extension-development?noredirect=1&lq=1
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  console.log("url: " + tabs[0].url);
  console.log("title: " + tabs[0].title);
  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, function(selectedText) {
    console.log(selectedText[0]);
    document.getElementById("selectedText").innerText = selectedText[0];
  });

});

function showResults(tab, selectedText){
  
}
