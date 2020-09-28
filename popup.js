//https://stackoverflow.com/questions/34170032/how-to-get-selected-text-in-chrome-extension-development?noredirect=1&lq=1
$(document).ready(() => {
  $.get("https://www.groklingua.com/login/extension", function(result) {
    if (!result.loggedIn) {
      window.location.href = "signin.html";
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
    source = tabs[0].url;
    title = tabs[0].title;
    chrome.tabs.executeScript({
      file: "contentScript.js"
    }, function(selectedText) {
      if(selectedText != ''){
        console.log(selectedText[0]);

        $.ajax({
          url: "https://www.groklingua.com/search/extension",
          type: 'POST',
          data: {
            listname: title,
            listsource: source,
            word: selectedText[0]
          },
          success: function(result){
            
            showDef(JSON.parse(result));
          },
          error: function(xhr, textStatus, errorThrown){
            alert(xhr.responseText);
            $("#selectedText").text("didn't work");
          }
        });//ajax call
      }else{
        $("#selectedText").text("Select text on the page to search");
      }
      //document is the popup.html
    }); //executeScript
  });//query tabs

function showDef(result){
  $('#selectedText').append()
  $('#mainWord').text(result[0].mainWord);
  $('#altKanji').text(result[0].altKanjiWords);
  $('#readings').text(result[0].readings);
  $('#definitions').text(result[0].definitions);
  for(i = 1; i < result.length; i++){
    let mainWord = '<h1>'+result[i].mainWord+'</h1>';
    let altK = '<h4>'+result[i].altKanjiWords+'</h4>';
    let readings = '<h3>'+result[i].readings+'</h3>';
    let definitions = '<p>'+result[i].definitions+'</p>';
    toAppend = '<div class="def">'+mainWord+altK+readings+definitions+'</div>'
    $('.def').last().append(toAppend);
  }

}

});
