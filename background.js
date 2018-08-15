// in this script we are:
// 1 - listening for a context menu click with spcific template
// 2 - sending this  templated message to a content script, which injects it

/*-----------------------------------------------------------------------*/
// adding listener to our button on top right
// browser.browserAction.onClicked.addListener(openEditNotesTab);

// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: "paste-message-template",
    title: "Response Box",
  });




// background-script.js

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.template);
  sendResponse({response: "TEMPLATED MESSAGE1"});
}

browser.runtime.onMessage.addListener(handleMessage);


// adding listener to a context menu
// browser.contextMenus.onClicked.addListener(consoleTemplateMessage);
