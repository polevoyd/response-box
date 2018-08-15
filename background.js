
//---------------------------------------------------------------------------
// templates map { menuID : templateMessage }
let templates = 
{
  'responsebox-template1' : 'Hello! This is a value of first template!',
};

//---------------------------------------------------------------------------
// Add a context menu action on selected text on a page
browser.contextMenus.create(
  {
    id: 'responsebox-template1',
    title: 'Template1',
  });

//---------------------------------------------------------------------------
// keep last selected template here
let lastMenuClicked = '';

//---------------------------------------------------------------------------
// sending a template to active tab
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

//---------------------------------------------------------------------------
// listener on a context menu click
browser.contextMenus.onClicked.addListener((clickedMenu) =>
{
  // keep last clicked menu in a global variable
  lastMenuClicked = clickedMenu.menuItemId;

  // select active tab and send template there
  browser.tabs.query(
    {
      currentWindow: true,
      active: true
    }
  ).then(sendMessageToTabs);
});