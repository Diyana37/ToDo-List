import { clearTasks } from "./tasks-service.js";

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

// export function completeAllTasks() {
//   tasks.forEach(task => {
//     task._status = "Completed";
//   });
// }

export function removeTaskClasses() {
  const tasksAll = Array.from(document.querySelectorAll(".task-card"));

  tasksAll.forEach((task) => {
    task.classList.remove("hide-element");
  });
}
