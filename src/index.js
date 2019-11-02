import createNewTaskElement from './helpers/template';
import { filteredData } from './helpers/sortItems';
import { generateData, checkLocalStorage } from './helpers/generateData';

const addButton = document.querySelector('.submit-button');
const saveButton = document.querySelector('.save-button');
const createButton = document.querySelector('.create-button');
const form = document.querySelector('form');

const getTitle = document.getElementById('title');
const getDescription = document.getElementById('description');
const getPriority = document.getElementById('priority');

const searchForm = document.querySelector('.search');
const priorityForm = document.querySelector('#exampleFormControlSelect2');
const statusForm = document.querySelector('#exampleFormControlSelect1');

const searchParams = {
  search: '',
  priority: '',
  status: '',
};

const saveToLocalStorage = document.getElementById('save');
const deleteToLocalStorage = document.getElementById('delete');

saveToLocalStorage.addEventListener('click', () => localStorage.setItem('ToDo', JSON.stringify(data)));
deleteToLocalStorage.addEventListener('click', () => localStorage.removeItem('ToDo'));

const checkForms = () => !!searchForm.value || !!priorityForm.value || !!statusForm.value;

let data = checkLocalStorage();

const addTask = function addTaskToTaskContainer() {
  console.log('Add Task...');
  const taskHolder = document.getElementById('task-container');
  if (!checkForms()) { init(data); }

  if (!getTitle.checkValidity()
    && !getDescription.checkValidity()
    && !getPriority.checkValidity()) {
    addButton.removeAttribute('data-dismiss', 'modal');
  } else {
    const title = getTitle.value;
    const description = getDescription.value;
    const priority = getPriority.value;
    const listItem = createNewTaskElement(title, description, priority);

    addButton.setAttribute('data-dismiss', 'modal');
    taskHolder.prepend(listItem);
    bindTaskEvents(listItem);
  }
  data = generateData();
};

createButton.addEventListener('click', () => {
  console.log('createButton');

  addButton.style.display = '';
  saveButton.style.display = 'none';
  addButton.addEventListener('click', addTask);
  form.reset();
});

const deleteTask = function deleteTaskFromDom() {
  console.log('Delete Task...');

  const listItem = this.closest('.task');
  const taskTitle = listItem.querySelector('.task-title');
  const taskDescription = listItem.querySelector('.task-description');
  const taskPriority = listItem.querySelector('.task-priority');
  const index = data.findIndex((elem) => elem.title === taskTitle.innerHTML
                                        && elem.description === taskDescription.innerHTML
                                        && elem.priority === taskPriority.innerHTML);

  form.reset();
  data.splice(index, 1);
  console.log(data);
  init(data);
};


const editTask = function editTaskContent() {
  console.log('Edit Task...');

  const listItem = this.closest('.task');
  const taskTitle = listItem.querySelector('.task-title');
  const taskDescription = listItem.querySelector('.task-description');
  const taskPriority = listItem.querySelector('.task-priority');

  const index = data.findIndex((elem) => elem.title === taskTitle.innerHTML
                                        && elem.description === taskDescription.innerHTML
                                        && elem.priority === taskPriority.innerHTML);

  addButton.style.display = 'none';
  saveButton.style.display = '';
  form.reset();

  getTitle.value = taskTitle.innerHTML;
  getDescription.value = taskDescription.innerHTML;
  getPriority.value = taskPriority.innerHTML.toLowerCase();

  const save = () => {
    taskTitle.innerHTML = getTitle.value;
    taskDescription.innerHTML = getDescription.value;
    taskPriority.innerHTML = getPriority.value;
    taskPriority.removeAttribute('class');
    taskPriority.setAttribute('class', `task-priority ${getPriority.value}`);
    saveButton.removeEventListener('click', save);
    data[index].title = getTitle.value;
    data[index].description = getDescription.value;
    data[index].priority = getPriority.value;
    console.log(checkForms());
    if (!checkForms()) { init(data); }
  };
  saveButton.addEventListener('click', save);
};

const doneTask = function toggleTaskStatus() {
  console.log('Done/Undone Task...');
  const taskHolder = document.getElementById('task-container');
  const listItem = this.closest('.task');
  const taskTitle = listItem.querySelector('.task-title');
  const taskDescription = listItem.querySelector('.task-description');
  const taskPriority = listItem.querySelector('.task-priority');

  listItem.classList.toggle('done');
  listItem.classList.toggle('open');

  const index = data.findIndex((elem) => elem.title === taskTitle.innerHTML
                                        && elem.description === taskDescription.innerHTML
                                        && elem.priority === taskPriority.innerHTML);

  data[index].status = listItem.className.slice(listItem.className.length - 4) === 'done' ? 'done' : 'open';
  if (checkForms()) { init(data); form.reset(); }
  [...taskHolder.children]
    .sort((a, b) => {
      if (a.className < b.className) return 1;
      if (a.className > b.className) return -1;
      return 0;
    })
    .map((node) => taskHolder.appendChild(node));
  data = generateData();
};

const bindTaskEvents = (taskListItem) => {
  console.log('bind list item events');

  const doneButton = taskListItem.querySelector('.done');
  const editButton = taskListItem.querySelector('.edit');
  const deleteButton = taskListItem.querySelector('.delete');

  editButton.addEventListener('click', editTask, false);
  deleteButton.addEventListener('click', deleteTask, false);
  doneButton.addEventListener('click', doneTask, false);
};

const init = (array) => {
  const taskHolder = document.getElementById('task-container');
  const container = document.createElement('div');
  array.forEach(({
    title, description, priority, status,
  }) => {
    const listItem = createNewTaskElement(title, description, priority, status);
    container.appendChild(listItem);
  });

  taskHolder.innerHTML = container.innerHTML;
  const task = document.querySelectorAll('.task');
  const taskArray = [...task];

  taskArray.forEach((el) => bindTaskEvents(el));
};
init(data);

searchForm.addEventListener('keyup', () => { searchParams.search = searchForm.value; init(filteredData(data, searchParams)); });
priorityForm.addEventListener('change', () => { searchParams.priority = priorityForm.value; init(filteredData(data, searchParams)); });
statusForm.addEventListener('change', () => { searchParams.status = statusForm.value; init(filteredData(data, searchParams)); });
