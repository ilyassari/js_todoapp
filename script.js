
// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
// const items = ['item1', 'item2', 'item3'];
let items;

//load items
loadItems();

//call event listeners
eventListeners();

function eventListeners(){
  // submit event
  form.addEventListener('submit',addNewItem);

  //delete an Item
  taskList.addEventListener('click', deleteItem);

  // delete all items
  btnDeleteAll.addEventListener('click', deleteAllItems);

}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}


// get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// delete item from local storage
function deleteItemFromLS(text){
  items = getItemsFromLS();
  items.forEach(function(item,index){
    if(item === text){
      items.splice(index,1);
    }
  });
  localStorage.setItem('items',JSON.stringify(items));

}

function createItem(text){

  //create li
  const li = document.createElement('li');

  li.className='list-group-item list-group-item-secondary';
  li.appendChild(document.createTextNode(text));

  // create a
  const a = document.createElement('a');
  a.classList='delete-item float-right';
  a.setAttribute('href','#');
  a.innerHTML='<i class="fas fa-times"></i>';

  // add a to li and add li to ul
  li.appendChild(a);
  taskList.appendChild(li);
}

// add New Item
function addNewItem(e) {
  if(input.value === ''){
    alert('add new item');
  }else {

    // create item
    createItem(input.value);

    // save to Local storage
    setItemToLS(input.value);

    //clear input
    input.value = '';

  }

  e.preventDefault();
}

// delete an Item
function deleteItem(e){
  if(e.target.className === 'fas fa-times'){
    if (confirm('Are yoe sure ?')){
      e.target.parentElement.parentElement.remove();

      // deleteitem from local storage
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

// delete all items
function deleteAllItems(e){

  // li öğelerine tek tek ulaşığ silme -- düzgün çalışmadı
  if (confirm('Are you sure ?')) {
    // taskList.innerHTML='';
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}


// UI vars
