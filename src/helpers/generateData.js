const defaultData = [
  {
    title: 'Task 1', description: 'Task 1 description', priority: 'high', status: 'open',
  },
  {
    title: 'Task 2', description: 'Task 2 description', priority: 'low', status: 'open',
  },
  {
    title: 'Task 3', description: 'Task 3 description', priority: 'norm', status: 'open',
  },
  {
    title: 'Task 4', description: 'Task 4 description', priority: 'high', status: 'done',
  },
  {
    title: 'Task 5', description: 'Task 5 description', priority: 'low', status: 'done',
  },
];

const generateData = () => {
  const title = document.querySelectorAll('.task-title');
  const description = document.querySelectorAll('.task-description');
  const priority = document.querySelectorAll('.task-priority');
  const status = document.querySelectorAll('.task');
  const data = [];

  for (let i = 0; i < status.length; i += 1) {
    data[i] = {
      title: title[i].innerHTML,
      description: description[i].innerHTML,
      priority: priority[i].innerHTML,
      status: status[i].className.slice(status[i].className.length - 4),
    };
  }
  return data;
};

const checkLocalStorage = () => (localStorage.getItem('ToDo') ? JSON.parse(localStorage.getItem('ToDo')) : defaultData);


export { generateData, checkLocalStorage, defaultData };
