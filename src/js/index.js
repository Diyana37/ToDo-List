import "../scss/styles.scss";
import { attachEventListenersToMenuButtonsAndFooterLinks } from "./event-listeners.js";
import { loadTasks } from "./tasks-service.js";
import { renderTasksInHTML } from "./tasks-view.js";

loadTasks();
attachEventListenersToMenuButtonsAndFooterLinks();
renderTasksInHTML();
