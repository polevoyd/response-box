
// object clicked
let clickedTextarea;

// to capture object
document.addEventListener('contextmenu', function(event)
{
  console.log(event.target);
  clickedTextarea = event.target;
});


//----------------------------------------------------------------
// listener for a message to fill a field with template
chrome.runtime.onMessage.addListener(request =>
{
  /* -------------------------------------------- */
  // // add template to a innerText
  // inputFieldClicked.innerText += request.template;
  /* -------------------------------------------- */

  // working through a copy event
  document.addEventListener('copy', function(e)
  {
    e.clipboardData.setData('text/plain', request.template);

    console.log('We recieve: ' + request.template);
    
    e.preventDefault();
  });

  // firing copy event
  document.execCommand('copy');

  // focus on area
  clickedTextarea.focus();

  clickedTextarea.innerHTML = request.template;
  // clickedTextarea.innerText = request.template;

  // pasting
  // document.execCommand('paste');




});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
