
//---------------------------------------------------------------------------
// create a context menus from a storage.local entries
// once we got storage promise
function onGot(storageEntries)
{
  Object.keys(storageEntries).forEach(entry =>
  {
    browser.menus.create(
      {
        id: entry,
        title: entry,
        contexts: ['editable']
      });
  });
}

//---------------------------------------------------------------------------
// do this if failed to get storage entries
function onError(error)
{
  console.log(`Error: ${error}`);
}

//---------------------------------------------------------------------------
// get all items from a storage
let gettingItem = browser.storage.local.get();
gettingItem.then(onGot, onError);

//---------------------------------------------------------------------------
// open a tab with different templates
browser.browserAction.onClicked.addListener(() =>
{
  browser.tabs.create({url: './response-box.html'});
});

//---------------------------------------------------------------------------
// keep last selected template here
let lastMenuClicked = '';
let lastTemplateSent = '';

//---------------------------------------------------------------------------
// sending a template to active tab
function sendMessageToTabs(tabs)
{
  for (let tab of tabs)
  {
    browser.tabs.sendMessage(
      tab.id,
      {
        template: lastTemplateSent
      }
    );
  }
}

//---------------------------------------------------------------------------
// listener on a context menu click
browser.contextMenus.onClicked.addListener((clickedMenu) =>
{
  // keep last clicked menu in a global variable
  lastMenuClicked = clickedMenu.menuItemId;

  // get a entry we need and keep it global to send
  browser.storage.local.get(lastMenuClicked).then(function(entry)
  {
    lastTemplateSent = Object.values(entry)[0];
  });

  // select active tab and send template there
  browser.tabs.query(
    {
      currentWindow: true,
      active: true
    }
  ).then(sendMessageToTabs);
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////