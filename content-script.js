//----------------------------------------------------------------
// object clicked
let clickedTextarea;

// capture object and keep global
document.addEventListener('contextmenu', function(event)
{
  clickedTextarea = event.target;
});

//----------------------------------------------------------------
// listener for a message to fill a field with template
chrome.runtime.onMessage.addListener(request =>
{
  // working through a copy event
  clickedTextarea.addEventListener('copy', function(e)
  {
    e.clipboardData.setData('text/plain', request.template);
    e.preventDefault();
  });

  // firing copy event
  document.execCommand('copy');

  // click, paste, focus
  clickedTextarea.click();
  document.execCommand('paste');
  clickedTextarea.focus();
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
