// make message to send which context menu clicked
// and send back some message and paste it into a field
// var templateMessageFromBackground = '';

// //----------------------------------------------------------------
// // taking back response message with a templated message
// function handleResponse(message)
// {
//   // console.log(`Message from the background script:  ${message.response}`);
//   templateMessageFromBackground = message.response;
//   console.log(message);
// }

// //----------------------------------------------------------------
// // log an error
// function handleError(error)
// {
//   console.log(`Error: ${error}`);
// }


//----------------------------------------------------------------
// listener for a context menu click
// window.addEventListener('contextmenu', function(e)
// {
//   // here we can save current value in a variable and then send message to a  background script with ID of template we need
//   // then, after we recieve it, we can add it to a current input value in that variable

//   // saving current value
//   // var currentValue = e.target.value;
//   console.log(e);

//   // send a request to background script for a template
//   var sending = browser.runtime.sendMessage(
//     {
//       request: 'Here a send a ID of a context menu and been clicked and wait for a template with same ID'
//     });
//   sending.then(handleResponse, handleError);






//   // set templated message from a background as a imput field value
//   e.target.value = templateMessageFromBackground;

// });






// browser.runtime.onMessage.addListener( function(request, sender, sendResponse)
// {
//   // message is: request.greeting
//   console.log(request);
// });





browser.runtime.onMessage.addListener(request =>
{
  console.log('Message from the background script:');
  console.log(request.greeting);
  
});