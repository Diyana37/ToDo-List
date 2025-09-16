import * as bootstrap from "bootstrap";
import { addTaskInModal, saveTasks } from "./tasks-service.js";
import {
  cleanSlate,
  clearCompletedTasks,
  completeAllTasks,
  deleteAllTasks,
  getStatistics,
  removeTaskClasses,
} from "./utils.js";
import {
  renderCompletedTasksInHTML,
  renderInProgressTasksInHTML,
  renderNotStartedTasksInHTML,
} from "./tasks-view.js";

const addModal = new bootstrap.Modal(document.querySelector("#add-task-modal"));

let selectedPriority = "High";
let selectedStatus = "Not-Started";

export function attachEventListenersToMenuButtonsAndFooterLinks() {
  const menuButtons = Array.from(document.querySelectorAll(".btn-menu"));

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const buttonId = e.target.getAttribute("id");

      if (buttonId === "add-task-button") {
        attachEventListenersToAddModalButtonsAndDropDowns();
        addModal.show();
      }
      if (buttonId === "delete-all-button") {
        deleteAllTasks();
      } else if (buttonId === "check-all-button") {
        completeAllTasks();
      } else if (buttonId === "clear-completed-button") {
        clearCompletedTasks();
      }
    });
  });

  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const buttonId = e.target.getAttribute("id");

      if (buttonId === "show-all") {
        localStorage.setItem("selectedStatus", "All");
        removeTaskClasses();
      } else if (buttonId === "show-completed") {
        localStorage.setItem("selectedStatus", "Completed");
        removeTaskClasses();
        renderCompletedTasksInHTML();
      } else if (buttonId === "show-in-progress") {
        localStorage.setItem("selectedStatus", "In-Progress");
        removeTaskClasses();
        renderInProgressTasksInHTML();
      } else if (buttonId === "show-not-started") {
        localStorage.setItem("selectedStatus", "Not-Started");
        removeTaskClasses();
        renderNotStartedTasksInHTML();
      }

      getStatistics();
    });
  });
}

function attachEventListenersToAddModalButtonsAndDropDowns() {
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

  function saveChanges(e) {
    addTaskInModal(selectedPriority, selectedStatus);
    addModal.hide();
    cleanSlate();
    saveTasks();
    saveCahngesAddTaskModalBtn.removeEventListener("click", saveChanges);
  }

  saveCahngesAddTaskModalBtn.addEventListener("click", saveChanges);

  const closeAddTaskModalBtn = document.querySelector("#close-add-task-modal");

  closeAddTaskModalBtn.addEventListener("click", function (e) {
    cleanSlate();
  });
}

export function attachEventListenersToAddModalButtonsAndDropDownsAndDeleteTaskButtons() {
  const deleteTaskButtons = Array.from(
    document.querySelectorAll(".delete-task")
  );
 
}
