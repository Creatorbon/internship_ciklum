const todoListTemplate = (title, description, priority, status = 'open') => `
<div class="task p-4 m-4 ${status}">
<div class="task-title">${title}</div>
<div class="task-description">${description}</div>
<div class="row justify-content-between px-4">
  <span class="task-priority ${priority}">${priority}</span>
  <span class="dropdown">
    <button class="btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
      aria-expanded="false">
      <i class="fas fa-ellipsis-h"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item done" type="button">Done</button>
      <button class="dropdown-item edit" type="button" data-toggle="modal" data-target=".bd-example-modal-lg">Edit</button>
      <button class="dropdown-item delete" type="button">Delete</button>
    </div>
  </span>
</div>`;

const createNewTaskElement = (title, description, priority, status) => {
  const nodeElem = todoListTemplate(title, description, priority, status);
  const wrapper = document.createElement('div');

  wrapper.innerHTML = nodeElem;

  return wrapper.firstElementChild;
};

export default createNewTaskElement;
