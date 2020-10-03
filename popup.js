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

  title="";
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
        $('.spinner').toggle();
        $.ajax({
          url: "https://www.groklingua.com/search/extension",
          type: 'POST',
          data: {
            listname: title,
            listsource: source,
            word: selectedText[0]
          },
          success: function(result){
              $('.spinner').toggle();
            showDef(JSON.parse(result));
            $('.title__link').attr('href', "https://www.groklingua.com/dashboard/");
          },
          error: function(xhr, textStatus, errorThrown){
            alert(xhr.responseText);
              $('.spinner').toggle();
            $("#selectedText").text("didn't work");
          }
        });//ajax call
      }else{
        $("#selectedText").text("Select text on the page to search grokLingua, then Alt + G.");
        $('#note').text('A new list will automatically be created for each webpage you search within.');
      }
      //document is the popup.html
    }); //executeScript
  });//query tabs

function showDef(result){
  $('#selectedText').append()
  // $('#mainWord').text(result[0].mainWord);
  // $('#altKanji').text(result[0].altKanjiWords);
  // $('#readings').text(result[0].readings);
  // $('#definitions').text(result[0].definitions);
  for(i = 0; i < result.length; i++){

    let span = "";
    if(!Array.isArray(result[i].mainWord)){
      span = '' + result[i].mainWord + '';
    }else{
      span = '<span class="addtoList">' + result[i].mainWord[0] + '</span>';
      if(result[i].mainWord.length > 1){
        for(j = 1; j < result[i].mainWord.length; j++){
          span += ',<span>'+ result[i].mainWord[j]+'</span>';
        }
      }
    }
    let mainWord = '<h1>'+span+'</h1>';
    let altK = '<h4>'+result[i].altKanjiWords+'</h4>';
    let readings = '<h3>'+result[i].readings+'</h3>';
    let definitions = '<p>'+result[i].definitions+'</p>';
    toAppend = '<div class="def">'+mainWord+altK+readings+definitions+'</div>'
    $('body').append(toAppend);

  }
  enableListAddition();

}
//add an element to the list if not automatically found
function enableListAddition() {
  $(".addtoList").on("click", function() {
    word = $(this).html();
    url = "https://www.groklingua.com/dashboard/"+title+"/addToList"
    $.post(url, {
      toAdd: word,
      socketId: "extension"
    }, function(result) {
      alert("word added");

    }).fail(function(err){
      alert(err.responseText);
    });

  });
}

});
