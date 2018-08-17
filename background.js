//---------------------------------------------------------------------------
// on a first installation
function installTemplatesPreset() 
{
  var follow_up = "Hi NAME,\n\nHope you’re doing well! I just wanted to follow up and ask whether you have any updates on ISSUE? Looking forward to hearing from you.\n\nBest regards,\nMY_NAME.";
  browser.storage.local.set({follow_up});

  var issue_response = 'Hey CUSTOMER,\n\nI wanted to update you about the status of your issue. Your issue is in progress and is being worked on by our product team. We\'re prioritizing your request, and I will make sure it\'s resolved ASAP. Thanks for your patience!\n\nTake care,\nYOUR_NAME';
  browser.storage.local.set({issue_response});

  var not_interested = 'Hi, NAME\n\nThanks for reaching out, but I’m not interested.\n\nBest regards,\nMY_NAME';
  browser.storage.local.set({not_interested});
}

// set listener to a first installation
browser.runtime.onInstalled.addListener(installTemplatesPreset);

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

//---------------------------------------------------------------------------
// on change of local storage recreate a context menus
browser.storage.onChanged.addListener(function()
{
  // remove all current menu items
  browser.menus.removeAll();
  
  // get all items from a storage
  let gettingItem = browser.storage.local.get();
  gettingItem.then(onGot, onError);
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
