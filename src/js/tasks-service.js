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
  addTask({ title: task.title, priority: task.priority, status: task.status});
}

// export function AddTasksInHTML() {
//   const tasksContainer = document.querySelector(".tasks-container");

//   const taskCard = document.createElement("div");
//   const newId = getNewId() - 1;
//   taskCard.setAttribute("id", `t${newId}`);
//   taskCard.classList.add("task-card");

//   const taskTitle = document.createElement("p");
//   taskTitle.classList.add("task-text");
//   const newTaskTitleInput = document.querySelector("#new-task-title");

//   taskTitle.textContent = newTaskTitleInput.value;
  
//   tasksContainer.appendChild(taskCard);
//   taskCard.appendChild(taskTitle);
// }
