// make message to send which context menu clicked
// and send back some message and paste it into a field
var templateMessageFromBackground = '';

//----------------------------------------------------------------
// taking back response message with a templated message
function handleResponse(message)
{
  // console.log(`Message from the background script:  ${message.response}`);
  templateMessageFromBackground = message.response;
}

//----------------------------------------------------------------
// log an error
function handleError(error)
{
  // console.log(`Error: ${error}`);
}

//----------------------------------------------------------------
// send message to a background and take a response after
function notifyBackgroundPage(e)
{
  console.log(e);




  var sending = browser.runtime.sendMessage(
    {
      template: 'Here a send a ID of a context menu and been clicked and wait for a template with same ID'
    });
  sending.then(handleResponse, handleError);
}

//----------------------------------------------------------------
// listener for a context menu click
window.addEventListener('contextmenu', function(e)
{
  // here we can save current value in a variable and then send message to a  background script with ID of template we need
  // then, after we recieve it, we can add it to a current input value in that variable

  // saving current value
  var currentValue = e.target.value;

  // send a request to background script for a template
  notifyBackgroundPage(e);






  // set templated message from a background as a imput field value
  e.target.value = templateMessageFromBackground;

});