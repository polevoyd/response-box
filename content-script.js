


// send data to a backnote
function sendTextToBacknote()
{
  // capture selected text 
  var selectedText = window.getSelection().toString().trim();

  // send it to edit-note.js with key : backnote_data
  chrome.runtime.sendMessage({backnoteData: selectedText}, function(){});
}

// // Add copySelection() as a listener to mouseup events.
document.addEventListener('mouseup', sendTextToBacknote);