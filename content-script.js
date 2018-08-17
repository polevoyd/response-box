//----------------------------------------------------------------
// object clicked
let clickedTextarea;

//----------------------------------------------------------------
// capture object and keep global
document.addEventListener('contextmenu', function(event)
{
  clickedTextarea = event.target;
});

//----------------------------------------------------------------
// listener for a message to fill a field with template
chrome.runtime.onMessage.addListener(request =>
{
  clickedTextarea.addEventListener('copy', function(e)
  {
    e.clipboardData.setData('text/plain', request.template);
    e.preventDefault();
  });

  document.execCommand('copy');

  clickedTextarea.click();
  document.execCommand('paste');
  clickedTextarea.focus();
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
