$.get("https://www.groklingua.com/login/extension", function(result) {
  if (result.loggedIn) {
    window.location.href = "popup.html";
    chrome.runtime.sendMessage({
      greeting: "grokgrok",
      confirm: "signin_js",
      loggedIn: result.loggedIn
    });
  }
});

$("#loginform").submit(function() {
  un = $('#loginform__email').val();
  ps = $('#loginform__password').val();
  console.log(un);
  console.log(ps);
  $.ajax({
    url: "https://www.groklingua.com/login",
    type: 'POST',
    data: {
      username: un,
      password: ps
    },
    success: function(result){
      console.log(result);
      chrome.runtime.sendMessage({
        greeting: "grokgrok",
        loggedIn: true,
        confirm: "loggin in"}, function(response) {
          if (response.greeting === "grokgrok") {
            window.location.href = "popup.html";
          }

        });
    }
  });
  return false; // VERY IMPORTANT!!!
});

// chrome.runtime.sendMessage({
//   greeting: "grokgrok",
//   loggedIn: true,
//   confirm: "loggin in"}, function(response) {
//     if (response.greeting === "grokgrok") {
//       window.location.href = "popup.html";
//     }
//
//   });

function onLogInSuccess(result) {
  console.log(result);
  chrome.runtime.sendMessage({
    greeting: "grokgrok",
    loggedIn: true,
    success: true });
  // }, function(response) {
  //   if (response.greeting === "grokgrok") {
  //     window.location.href = "popup.html";
  //   }
  //
  // });
}
