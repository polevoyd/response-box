
// test function
function consoleTemplateMessage(event)
{
  // at this point I can log info to a console on a click
  console.log("hello, this is a test");

}


/*-----------------------------------------------------------------------*/
// adding listener to our button on top right
// browser.browserAction.onClicked.addListener(openEditNotesTab);

// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: "paste-message-template",
    title: "Response Box",
  });

// adding listener to a context menu
browser.contextMenus.onClicked.addListener(consoleTemplateMessage);



// background-script.js

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);