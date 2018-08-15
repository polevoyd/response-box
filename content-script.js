// make message to send which context menu clicked 
// and send back some message and paste it into a field


function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  function notifyBackgroundPage(e) {
    var sending = browser.runtime.sendMessage({
      greeting: "Greeting from the content script"
    });
    sending.then(handleResponse, handleError);  
  }
  
  window.addEventListener("click", notifyBackgroundPage);