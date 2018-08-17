//---------------------------------------------------------------------------
// on a first installation
function installTemplatesPreset() 
{
  var follow_up = "Hi NAME,\n\nHope you’re doing well! I just wanted to follow up and ask whether you have any updates on ISSUE? Looking forward to hearing from you.\n\nBest regards,\nMY_NAME.";
  chrome.storage.local.set({follow_up});

  var issue_response = 'Hey CUSTOMER,\n\nI wanted to update you about the status of your issue. Your issue is in progress and is being worked on by our product team. We\'re prioritizing your request, and I will make sure it\'s resolved ASAP. Thanks for your patience!\n\nTake care,\nYOUR_NAME';
  chrome.storage.local.set({issue_response});

  var not_interested = 'Hi, NAME\n\nThanks for reaching out, but I’m not interested.\n\nBest regards,\nMY_NAME';
  chrome.storage.local.set({not_interested});
}

// set listener to a first installation
chrome.runtime.onInstalled.addListener(installTemplatesPreset);

//---------------------------------------------------------------------------
// keep last selected template here
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
  // get a entry we need to send
  chrome.storage.local.get(clickedMenu.menuItemId, function(entry) 
  {
    // template to send storing in global variable
    lastTemplateSent = Object.values(entry)[0];
    
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
});

//---------------------------------------------------------------------------
// on change of local storage recreate a context menus
chrome.storage.onChanged.addListener(function()
{
  // remove all current menu items
  chrome.contextMenus.removeAll();
  
  // get all items from a storage and recreate menus
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
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////








