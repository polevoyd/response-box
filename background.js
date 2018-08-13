// current toggle state: true - active, false - not active
var currentState = true;

/*-----------------------------------------------------------------*/
// move existing backnote tab to last place or create a new
function openResponsesTab()
{
  // checker to see if tab is already exist (doesnt by default)
  var backnoteTabId = undefined;
  // request to show all tabs
  chrome.tabs.query({}, function(tabs)
  {
    // run loop throught all tabs
    for (var t of tabs)
    {
      // check if current tab is "Backnote"
      if (t.title === 'Response Box')
      {
        // if yes, save ID and jump out
        backnoteTabId = t.id;
        break;
      }
    }
    // if ID is not undefined
    if (backnoteTabId)
    {
      // to create a new window and put existing backnote tab in there
      chrome.windows.create(
        {
          tabId: backnoteTabId,
          type: 'popup',
          height: 720,
          width: 540,
        });
    }
    else
    {
      // to create a new window and open tab in there
      chrome.windows.create(
        {
          url: './edit-note.html',
          type: 'popup',
          height: 720,
          width: 540,
        });
    }
  });
}

/*-----------------------------------------------------------------*/
// function to attach and detach listener depending on currentStateIsOn
// function switchCurrentState()
// {
//   // console.log(chrome.commands.onCommand);
//   // if on - then turn off
//   if (currentState)
//   {
//     chrome.commands.onCommand.removeListener(createOrSwitchToBacknoteTab);
//     // change current state
//     currentState = false;
//     // change icon on top to red
//     chrome.browserAction.setIcon({path:'./images/icon_off.png'});
//   }
//   else
//   {
//     // set listener to open a tab with notes
//     chrome.commands.onCommand.addListener(createOrSwitchToBacknoteTab);
//     // change current state
//     currentState = true;
//     // change icon on top to green
//     chrome.browserAction.setIcon({path:'./images/icon_on.png'});
//   }
// }
/*-----------------------------------------------------------------*/
// attach listener to upper right icon to toggle extension
chrome.browserAction.onClicked.addListener(openResponsesTab);
// set listener to open a tab with notes
// chrome.commands.onCommand.addListener(createOrSwitchToBacknoteTab);









// // background-script.js

// browser.runtime.onMessage.addListener(notify);

// function notify(message)
// {
//   browser.notifications.create(
//     {
//       'type': 'basic',
//       'iconUrl': browser.extension.getURL('link.png'),
//       'title': 'You clicked a link!',
//       'message': message.url
//     });
// }






