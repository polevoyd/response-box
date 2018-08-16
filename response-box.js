//----------------------------------------------------------------
// initializing what already there
var inputTitle = document.querySelector('.new-template input');
var inputBody = document.querySelector('.new-template textarea');

var templateContainer = document.querySelector('.template-container');

var addBtn = document.querySelector('.add');

//----------------------------------------------------------------
// adding listeners to buttons

addBtn.addEventListener('click', addTemplate);

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
    var templateKeys = Object.keys(results);
    for (let templateKey of templateKeys) 
    {
      var curValue = results[templateKey];
      displayTemplate(templateKey,curValue);
    }
  }, onError);
}

//----------------------------------------------------------------
// adding template to display and to storage

function addTemplate() {
  var templateTitle = inputTitle.value;
  var templateBody = inputBody.value;
  var gettingItem = browser.storage.local.get(templateTitle);
  gettingItem.then((result) =>
  {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && templateTitle !== '' && templateBody !== '') 
    {
      inputTitle.value = '';
      inputBody.value = '';
      storeTemplate(templateTitle,templateBody);
    }
  }, onError);
}

//----------------------------------------------------------------
// store new template

function storeTemplate(title, body)
{
  var storingTemplate = browser.storage.local.set({ [title] : body });
  storingTemplate.then(() =>
  {
    displayTemplate(title,body);
  }, onError);
}

//----------------------------------------------------------------
// to display template in a box 

function displayTemplate(title, body)
{
  // create new desplay box 
  var template = document.createElement('div');
  var templateDisplay = document.createElement('div');
  var templateH = document.createElement('h2');
  var templatePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  template.setAttribute('class','template');

  templateH.textContent = title;
  templatePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete template';
  clearFix.setAttribute('class','clearfix');

  templateDisplay.appendChild(templateH);
  templateDisplay.appendChild(templatePara);
  templateDisplay.appendChild(deleteBtn);
  templateDisplay.appendChild(clearFix);

  template.appendChild(templateDisplay);

  // setting up listener to delete function

  deleteBtn.addEventListener('click',(e) =>
  {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  });

  // creating a editing box 

  var templateEdit = document.createElement('div');
  var templateTitleEdit = document.createElement('input');
  var templateBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('button');
  var cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class','update');
  updateBtn.textContent = 'Update template';
  cancelBtn.setAttribute('class','cancel');
  cancelBtn.textContent = 'Cancel update';

  templateEdit.appendChild(templateTitleEdit);
  templateTitleEdit.value = title;
  templateEdit.appendChild(templateBodyEdit);
  templateBodyEdit.textContent = body;
  templateEdit.appendChild(updateBtn);
  templateEdit.appendChild(cancelBtn);

  templateEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  template.appendChild(templateEdit);

  templateContainer.appendChild(template);
  templateEdit.style.display = 'none';

  // adding listeners to update functionality

  templateH.addEventListener('click',() =>
  {
    templateDisplay.style.display = 'none';
    templateEdit.style.display = 'block';
  });

  templatePara.addEventListener('click',() =>
  {
    templateDisplay.style.display = 'none';
    templateEdit.style.display = 'block';
  });

  cancelBtn.addEventListener('click',() =>
  {
    templateDisplay.style.display = 'block';
    templateEdit.style.display = 'none';
    templateTitleEdit.value = title;
    templateBodyEdit.value = body;
  });

  updateBtn.addEventListener('click',() =>
  {
    if(templateTitleEdit.value !== title || templateBodyEdit.value !== body)
    {
      updateTemplate(title, templateTitleEdit.value,templateBodyEdit.value);
      template.parentNode.removeChild(template);
    }
  });
}

//----------------------------------------------------------------
// function to update templates
function updateTemplate(delTemplate,newTitle,newBody)
{
  var storingTemplate = browser.storage.local.set({ [newTitle] : newBody });
  storingTemplate.then(() =>
  {
    if(delTemplate !== newTitle)
    {
      var removingTemplate = browser.storage.local.remove(delTemplate);
      removingTemplate.then(() =>
      {
        displayTemplate(newTitle, newBody);
      }, onError);
    }
    else
    {
      displayTemplate(newTitle, newBody);
    }
  }, onError);
}
