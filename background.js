// in this script we are:
// 1 - listening for a context menu click with spcific template
// 2 - sending this  templated message to a content script, which injects it

/*-----------------------------------------------------------------------*/
// adding listener to our button on top right
// browser.browserAction.onClicked.addListener(openEditNotesTab);

// template to send
var messageToSend = 'HELLO!';



// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: 'paste-message-template1',
    title: 'Template1',
  });


function happensOnMenuClick(e)
{
  console.log();
}

// background-script.js

function handleMessage(request, sender, sendResponse)
{
  // message is: request.greeting
  sendResponse({response: messageToSend});
}

browser.runtime.onMessage.addListener(handleMessage);


// // adding listener to a context menu
// /*
// The click event listener, where we perform the appropriate action given the
// ID of the menu item that was clicked.
// */
// browser.menus.onClicked.addListener((info, tab) => 
// {
//   console.log
// info.menuItemId

// });