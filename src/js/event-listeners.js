import * as bootstrap from "bootstrap";
import { AddTaskInModal, saveTasks } from "./tasks-service.js";
import { cleanSlate } from "./utils.js";

const addModal = new bootstrap.Modal(
  document.querySelector("#add-task-modal")
);

let selectedPriority = "High";
let selectedStatus = "Not-Started";

export function attachEventListenersToButtonsAndDropDowns() {
  const menuButtons = Array.from(document.querySelectorAll(".btn-menu"));

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (e.target.getAttribute("id") === "add-task-button") {
        addModal.show();
      }
    });
  });

  const priorityText = document.querySelector("#priority-text");
  const priorityItems = Array.from(document.querySelectorAll(".priority-item"));

  priorityItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      selectedPriority = e.target.getAttribute("data-value");
      priorityText.textContent = selectedPriority;
    });
  });

  const statusText = document.querySelector("#status-text");
  const statusItems = Array.from(document.querySelectorAll(".status-item"));

  statusItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      selectedStatus = e.target.getAttribute("data-value");
      statusText.textContent = selectedStatus;
    });
  });


  const saveCahngesAddTaskModalBtn = document.querySelector(
    "#save-changes-add-task-modal"
  );

  saveCahngesAddTaskModalBtn.addEventListener("click", function (e) {
    AddTaskInModal(selectedPriority, selectedStatus);
    addModal.hide();
    cleanSlate();
    saveTasks();
  });

  const closeAddTaskModalBtn = document.querySelector("#close-add-task-modal");

  closeAddTaskModalBtn.addEventListener("click", function (e) {
    cleanSlate();
  });
}
