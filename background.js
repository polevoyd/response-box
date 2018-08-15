// in this script we are:
// 1 - listening for a context menu click with spcific template
// 2 - sending this  templated message to a content script, which injects it

/*-----------------------------------------------------------------------*/

// template to send
var messageToSend = 'Hello!';



// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: 'paste-message-template1',
    title: 'Template1',
  });


// function happensOnMenuClick(e)
// {
//   console.log();
// }


// function handleMessage(request, sender, sendResponse)
// {
//   // message is: request.greeting
//   sendResponse({response: messageToSend});
// }

// browser.runtime.onMessage.addListener(handleMessage);




// adding listener to a context menu
/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
// browser.contextMenus.onClicked.addListener((info) =>
// {
//   // console.log(info.menuItemId);

//   // send to context script to set a template
//   function sendMessageToTabs(tabs) 
//   {
//     for (let tab of tabs) 
//     {
//       browser.tabs.sendMessage(
//         tab.id,
//         {request: "Hi from background script"}
//       );
//     }
//   }


// });







function onError(error) 
{
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) 
{
  for (let tab of tabs) 
  {
    browser.tabs.sendMessage(
      tab.id,
      {greeting: "Hi from background script"}
    );
  }
}



browser.contextMenus.onClicked.addListener((clickedMenu) => {

  console.log(clickedMenu.menuItemId);




  browser.tabs.query(
    {
      currentWindow: true,
      active: true
    }
  ).then(sendMessageToTabs).catch(onError);
});