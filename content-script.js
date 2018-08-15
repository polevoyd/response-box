
//----------------------------------------------------------------
// keep an object of clicked field in global variable
let inputFieldClicked;

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
  inputFieldClicked.value += request.template;
});


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


