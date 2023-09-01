import { sidebar, formContainer } from "./variables.js";

let sideBarDisplay = false;

function showSidebar() {
  if (sideBarDisplay === false) {
    formContainer.style.transform = "translate(300px)";
    formContainer.style.opacity = "1";
    sidebar.className = "bi-x-lg";
    return (sideBarDisplay = true);
  } else {
    formContainer.style.transform = "translate(-300px)";
    formContainer.style.opacity = "0";
    sidebar.className = "bi-list";
    return (sideBarDisplay = false);
  }
}

export { showSidebar };
