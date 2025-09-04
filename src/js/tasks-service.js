import { Task } from "./models.js";
let tasks = [];

function getNewId() {
  const sortedTasks = tasks.slice().sort((a, b) => a.id - b.id);

  const newId =
    sortedTasks.length > 0 ? sortedTasks[sortedTasks.length - 1].id + 1 : 1;

  return newId;
}

export const addTask = (task) => {
  const newId = getNewId();

  tasks.push({ ...task, id: newId });
};

export const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = () => {
  const tasksJSONString = localStorage.getItem("tasks");

  if (tasksJSONString) {
    const tasksParsed = JSON.parse(tasksJSONString);
    tasks = tasksParsed;
  }
};

export function AddTaskInModal(priority, status) {
  const newTaskTitleInput = document.querySelector("#new-task-title");

  let task = new Task(newTaskTitleInput.value, priority, status);

  loadTasks();
  addTask({ title: task.title, priority: task.priority, status: task.status });

  AddTasksInHTML(newTaskTitleInput.value, task.priority, task.status);
}

function AddTasksInHTML(title, priority, status) {
  const tasksContainer = document.querySelector(".tasks-container");

  const taskCard = document.createElement("div");
  const newId = getNewId();
  taskCard.setAttribute("id", `t${newId}`);
  taskCard.classList.add("task-card");

  const statusIcon = document.createElement("div");
  statusIcon.classList.add("status-icon");

  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-text");
  taskTitle.textContent = title;

  const taskPriority = document.createElement("p");
  taskPriority.classList.add("task-priority", "bold");
  taskPriority.textContent = priority;

  const taskStatus = document.createElement("p");
  taskStatus.classList.add("task-status");
  taskStatus.textContent = status;

  if (status === "Not-Started") {
    statusIcon.classList.add("not-started");
    taskStatus.classList.add("color-red");
  } else if (status === "In-Progress") {
    statusIcon.classList.add("in-progress");
    taskStatus.classList.add("color-blue");
  } else if (status === "Completed") {
    statusIcon.classList.add("completed");
    taskStatus.classList.add("color-green");
  }

  if (priority === "High") {
    taskPriority.classList.add("color-red");
  } else if (priority === "Medium") {
    taskPriority.classList.add("color-blue");
  } else if (priority === "Low") {
    taskPriority.classList.add("color-green");
  }

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("task-buttons-div");

  const editButton = document.createElement("button");
  editButton.setAttribute("id", `edit-task-${newId}`);
  editButton.setAttribute("type", "button");
  editButton.classList.add("btn", "btn-warning");
  const editButtonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
              viewBox="0 0 16 16">
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>`;

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", `delete-task-${newId}`);
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("btn", "btn-danger");
  const deleteButtonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
              viewBox="0 0 16 16">
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>`;

  tasksContainer.appendChild(taskCard);
  taskCard.appendChild(statusIcon);
  taskCard.appendChild(taskTitle);
  taskCard.appendChild(taskPriority);
  taskCard.appendChild(taskStatus);
  taskCard.appendChild(buttonsDiv);
  buttonsDiv.appendChild(editButton);
  editButton.insertAdjacentHTML("beforeend", editButtonIcon);
  buttonsDiv.appendChild(deleteButton);
  deleteButton.insertAdjacentHTML("beforeend", deleteButtonIcon);
}
