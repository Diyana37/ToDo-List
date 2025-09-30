import { attachEventListenersToEditButtonsAndDeleteTaskButtons } from "./event-listeners.js";
import { Task } from "./models.js";
import { addTasksInHTML } from "./tasks-view.js";
import { getStatistics } from "./utils.js";

export let tasks = [];

export function getNewId() {
  const sortedTasks = tasks.slice().sort((a, b) => a.id - b.id);

  const newId =
    sortedTasks.length > 0 ? sortedTasks[sortedTasks.length - 1].id + 1 : 1;

  return newId;
}

export const addTask = (task) => {
  tasks.push(task);
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

export function addTaskInModal() {
  const title = document.querySelector("#new-task-title");

  if (!title.value) {
    alert("Title is required!");
    return;
  }

  const priorityText = document.querySelector("#priority-text");
  const statusText = document.querySelector("#status-text");

  const priority = priorityText.textContent === "Priority" ? "High" : priorityText.textContent;
  const status = statusText.textContent === "Status" ? "Not-Started" : statusText.textContent;

  const newId = getNewId();

  let task = new Task(newId, title.value, priority, status);

  addTask({
    id: task.id,
    title: task.title,
    priority: task.priority,
    status: task.status,
  });

  addTasksInHTML(task.id, task.title, task.priority, task.status);
  attachEventListenersToEditButtonsAndDeleteTaskButtons();

  getStatistics();
}

export function clearTasks() {
  tasks = [];
  localStorage.removeItem("tasks");
}
