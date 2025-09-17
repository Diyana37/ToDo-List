import { attachEventListenersToEditModalButtonsAndDropDownsAndDeleteTaskButtons } from "./event-listeners.js";
import { addTask, clearTasks, saveTasks, tasks } from "./tasks-service.js";
import { addTasksInHTML } from "./tasks-view.js";

export function getStatistics() {
  const tasksCount = document.querySelector("#task-left-count");
  const tasksAll = Array.from(document.querySelectorAll(".task-card"));

  tasksCount.textContent = tasksAll.filter(
    (task) => !task.classList.contains("hide-element")
  ).length;
}

export function cleanSlate() {
  const newTaskTitleInput = document.querySelector("#new-task-title");
  const priorityText = document.querySelector("#priority-text");
  const statusText = document.querySelector("#status-text");

  newTaskTitleInput.value = "";
  priorityText.textContent = "Priority";
  statusText.textContent = "Status";
}

export function deleteAllTasks() {
  clearTasks();

  const parent = document.querySelector(".tasks-parent-container");
  const tasksContainer = document.querySelector(".tasks-container");

  parent.removeChild(tasksContainer);

  getStatistics();

  const tasksContainerNew = document.createElement("div");
  tasksContainerNew.setAttribute("id", "show-all");
  tasksContainerNew.classList.add("tasks-container");

  parent.appendChild(tasksContainerNew);
}

export function completeAllTasks() {
  const tasksCopy = tasks.slice();
  deleteAllTasks();

  tasksCopy.forEach((task) => {
    addTasksInHTML(task.id, task.title, task.priority, "Completed");
    attachEventListenersToEditModalButtonsAndDropDownsAndDeleteTaskButtons();

    addTask({
      id: task.id,
      title: task.title,
      priority: task.priority,
      status: "Completed",
    });
  });
  getStatistics();
  saveTasks();
}

export function removeTaskClasses() {
  const tasksAll = Array.from(document.querySelectorAll(".task-card"));

  tasksAll.forEach((task) => {
    task.classList.remove("hide-element");
  });
}

export function clearCompletedTasks() {
  const tasksCopy = tasks.slice();
  deleteAllTasks();

  tasksCopy
    .filter((task) => task.status !== "Completed")
    .forEach((task) => {
      addTasksInHTML(task.id, task.title, task.priority, task.status);

      addTask({
        id: task.id,
        title: task.title,
        priority: task.priority,
        status: task.status,
      });
    });
  getStatistics();
  saveTasks();
  attachEventListenersToEditModalButtonsAndDropDownsAndDeleteTaskButtons();
}

export function deleteTask(buttonId) {
  const tasksCopy = tasks.slice();
  deleteAllTasks();

  tasksCopy
    .filter((task) => `delete-task-${task.id}` !== buttonId)
    .forEach((task) => {
      addTasksInHTML(task.id, task.title, task.priority, task.status);

      addTask({
        id: task.id,
        title: task.title,
        priority: task.priority,
        status: task.status,
      });
    });

  getStatistics();
  saveTasks();
  attachEventListenersToEditModalButtonsAndDropDownsAndDeleteTaskButtons();
}
