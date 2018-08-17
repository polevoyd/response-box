
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
  // working through a copy event
  document.addEventListener('copy', function(e)
  {
    e.clipboardData.setData('text/plain', request.template);
    e.preventDefault();
  });

  // firing copy event
  document.execCommand('copy');

  // pasting
  inputFieldClicked.click();
  document.execCommand('paste');
  inputFieldClicked.focus();
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
