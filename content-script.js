

//----------------------------------------------------------------
// listener for a message to fill a field with template
chrome.runtime.onMessage.addListener(request =>
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
  document.execCommand('paste');
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
