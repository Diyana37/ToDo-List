import { clearTasks, tasks } from "./tasks-service.js";

export function getStatistics() {
  const tasksCount = document.querySelector("#task-left-count");
  tasksCount.textContent = tasks.length;
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
  getStatistics();

  const parent = document.querySelector(".tasks-parent-container");
  const tasksContainer = document.querySelector(".tasks-container");

  parent.removeChild(tasksContainer);

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

// export function showCompletedTasks() {
//   const resultArray = tasks.filter((task) => task._status === "Completed")
//   console.log(resultArray);
// }
