
//---------------------------------------------------------------------------
// create a context menus from a storage.local entries
chrome.storage.local.get((storageEntries) =>
{
  Object.keys(storageEntries).forEach((entry) =>
  {
    chrome.contextMenus.create(
      {
        id: entry,
        title: entry,
        contexts: ['editable']
      });
  });
});

//---------------------------------------------------------------------------
// open a tab with different templates
chrome.browserAction.onClicked.addListener(() =>
{
  chrome.tabs.create({url: './response-box.html'});
});

//---------------------------------------------------------------------------
// keep last selected template here
let lastMenuClicked = '';
let lastTemplateSent = '';

//---------------------------------------------------------------------------
// sending a template to active tab
// function sendMessageToTabs(tabs)
// {
//   for (let tab of tabs)
//   {
//     chrome.tabs.sendMessage(
//       tab.id,
//       {
//         template: lastTemplateSent
//       }
//     );
//   }
// }

// //---------------------------------------------------------------------------
// // listener on a context menu click
// chrome.contextMenus.onClicked.addListener((clickedMenu) =>
// {
//   // keep last clicked menu in a global variable
//   lastMenuClicked = clickedMenu.menuItemId;

//   // get a entry we need and keep it global to send
//   chrome.storage.local.get(lastMenuClicked).then(function(entry)
//   {
//     lastTemplateSent = Object.values(entry)[0];
//   });

//   // select active tab and send template there
//   chrome.tabs.query(
//     {
//       currentWindow: true,
//       active: true
//     }
//   ).then(sendMessageToTabs);
// });

// //---------------------------------------------------------------------------
// // on change of local storage recreate a context menus
// chrome.storage.onChanged.addListener(function()
// {
//   // remove all current menu items
//   chrome.menus.removeAll();
  
//   // get all items from a storage
//   let gettingItem = chrome.storage.local.get();
//   gettingItem.then(onGot, onError);
// });

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


chrome.storage.local.set({'menu1': 'value1'}, function() {});
chrome.storage.local.set({'menu2': 'value2'}, function() {});
chrome.storage.local.set({'menu3': 'value3'}, function() {});


//---------------------------------------------------------------------------
// listener on a context menu click
chrome.contextMenus.onClicked.addListener((clickedMenu) =>
{
  // keep last clicked menu in a global variable
  lastMenuClicked = clickedMenu.menuItemId;

  // get a entry we need and keep it global to send
  chrome.storage.local.get(lastMenuClicked, function(entry)
  {
    lastTemplateSent = Object.values(entry)[0];
  });
  
  // select active tab and send template there
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true
    }, function(tabs)
    {
      for (let tab of tabs)
      {
        chrome.tabs.sendMessage(
          tab.id,
          {
            template: lastTemplateSent
          }
        );
      }
    }
  );
});



