//----------------------------------------------------------------
// initializing what already there
var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');

var noteContainer = document.querySelector('.note-container');

var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');

//----------------------------------------------------------------
// adding listeners to buttons

addBtn.addEventListener('click', addNote);
clearBtn.addEventListener('click', clearAll);

//----------------------------------------------------------------
// to handle errors (generic)
function onError(error) 
{
  console.log(error);
}

//----------------------------------------------------------------
// display stored templates

initialize();

function initialize() 
{
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) =>
  {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) 
    {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}

//----------------------------------------------------------------
// adding template to display and to storage

function addNote() {
  var noteTitle = inputTitle.value;
  var noteBody = inputBody.value;
  var gettingItem = browser.storage.local.get(noteTitle);
  gettingItem.then((result) =>
  {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && noteTitle !== '' && noteBody !== '') 
    {
      inputTitle.value = '';
      inputBody.value = '';
      storeNote(noteTitle,noteBody);
    }
  }, onError);
}

//----------------------------------------------------------------
// store new template

function storeNote(title, body)
{
  var storingNote = browser.storage.local.set({ [title] : body });
  storingNote.then(() =>
  {
    displayNote(title,body);
  }, onError);
}

//----------------------------------------------------------------
// to display template in a box 
function displayNote(title, body)
{

  // create new desplay box 
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('h2');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');

  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  // setting up listener to delete function

  deleteBtn.addEventListener('click',(e) =>
  {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  });

  // creating a editing box 
  var noteEdit = document.createElement('div');
  var noteTitleEdit = document.createElement('input');
  var noteBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('button');
  var cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class','update');
  updateBtn.textContent = 'Update note';
  cancelBtn.setAttribute('class','cancel');
  cancelBtn.textContent = 'Cancel update';

  noteEdit.appendChild(noteTitleEdit);
  noteTitleEdit.value = title;
  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = body;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  note.appendChild(noteEdit);

  noteContainer.appendChild(note);
  noteEdit.style.display = 'none';

  // adding listeners to update functionality

  noteH.addEventListener('click',() =>
  {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  });

  notePara.addEventListener('click',() =>
  {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  });

  cancelBtn.addEventListener('click',() =>
  {
    noteDisplay.style.display = 'block';
    noteEdit.style.display = 'none';
    noteTitleEdit.value = title;
    noteBodyEdit.value = body;
  });

  updateBtn.addEventListener('click',() =>
  {
    if(noteTitleEdit.value !== title || noteBodyEdit.value !== body)
    {
      updateNote(title,noteTitleEdit.value,noteBodyEdit.value);
      note.parentNode.removeChild(note);
    }
  });
}

//----------------------------------------------------------------
// function to update notes
function updateNote(delNote,newTitle,newBody)
{
  var storingNote = browser.storage.local.set({ [newTitle] : newBody });
  storingNote.then(() =>
  {
    if(delNote !== newTitle)
    {
      var removingNote = browser.storage.local.remove(delNote);
      removingNote.then(() =>
      {
        displayNote(newTitle, newBody);
      }, onError);
    }
    else
    {
      displayNote(newTitle, newBody);
    }
  }, onError);
}

//----------------------------------------------------------------
// function to clear all templates from display & storage
function clearAll() 
{
  while (noteContainer.firstChild)
  {
    noteContainer.removeChild(noteContainer.firstChild);
  }
  browser.storage.local.clear();
}
