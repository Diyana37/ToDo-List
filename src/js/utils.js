export function cleanSlate() {
  const newTaskTitleInput = document.querySelector("#new-task-title");
  const priorityText = document.querySelector("#priority-text");
  const statusText = document.querySelector("#status-text");

  newTaskTitleInput.value = "";
  priorityText.textContent = "Priority";
  statusText.textContent  = "Status";
}
