
chrome.storage.local.set({'menu1': 'value1'}, function() {});
chrome.storage.local.set({'menu2': 'value2'}, function() {});
chrome.storage.local.set({'menu3': 'value3'}, function() {});

//---------------------------------------------------------------------------
// keep last selected template here
let lastMenuClicked = '';
let lastTemplateSent = '';

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
// listener on a context menu click
chrome.contextMenus.onClicked.addListener((clickedMenu) =>
{

  console.log('We need to send: ' + clickedMenu.menuItemId);


  // get a entry we need to send
  chrome.storage.local.get(clickedMenu.menuItemId, function(entry) 
  {
    lastTemplateSent = Object.values(entry)[0];
    console.log('In between: ' + lastTemplateSent);
  });
  

  console.log('We send: ' + lastTemplateSent);

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








