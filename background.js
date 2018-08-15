// in this script we are:
// 1 - listening for a context menu click with spcific template
// 2 - sending this  templated message to a content script, which injects it

/*-----------------------------------------------------------------------*/

// template to send
let templates = 
{
  'responsebox-template1' : 'Hello! This is a value of first template!',
};



// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: 'responsebox-template1',
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



let lastMenuClicked = '';



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
      {template: templates[lastMenuClicked]}
    );
  }
}



browser.contextMenus.onClicked.addListener((clickedMenu) => {

  // console.log(clickedMenu.menuItemId); // responsebox-template1
  lastMenuClicked = clickedMenu.menuItemId;



  browser.tabs.query(
    {
      currentWindow: true,
      active: true
    }
  ).then(sendMessageToTabs).catch(onError);
});