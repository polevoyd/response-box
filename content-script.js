
//----------------------------------------------------------------
// keep an object of clicked field in global variable
let inputFieldClicked;
let recievedTemplate;

//----------------------------------------------------------------
// listener for a right mouse click to save input field object reference
window.addEventListener('contextmenu', function(e)
{
  inputFieldClicked = e.target;
});

//----------------------------------------------------------------
// listener for a message to fill a field with template
browser.runtime.onMessage.addListener(request =>
{
  /* -------------------------------------------- */
  // // add template to a innerText
  // inputFieldClicked.innerText += request.template;
  /* -------------------------------------------- */

  // keep a recieved template in a global variable
  recievedTemplate = request.template;

  // working through a copy event
  document.addEventListener('copy', function(e)
  {
    e.clipboardData.setData('text/plain', recievedTemplate);
    e.preventDefault();
  });

  // firing copy event
  document.execCommand('copy');

  // pasting
  document.execCommand('paste');
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
