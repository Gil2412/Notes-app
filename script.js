import {
  delAllPopUP,
  delAllBtn,
  acceptBtn,
  cancelBtn,
  popUpBackground,
  searchLine,
  starBtn,
  calenderBtn,
  starIcon,
  calenderIcon,
  sidebar,
  nTitle,
  nTitleLabel,
  nBodyText,
  nBodyTextLabel,
  nDate,
  nColor,
  submitBtn,
  nContainer,
} from "./variables.js";
import { createElementFunction } from "./createElementFunc.js";
import { starBtnNavBar, dateBtnNavBar } from "./filterFunc.js";
import { search } from "./searchFunc.js";
import { showSidebar } from "./designFunc.js";

let idCounter = -1;
let notesArray = [];

let localStorageObjects = localStorage.getItem("notes");
let localStorageStarFilter = localStorage.getItem("starFilterOn");
let localStorageDateFilter = localStorage.getItem("dateFilterOn");
let objectsFromLocalStorage = JSON.parse(localStorageObjects);

if (objectsFromLocalStorage) {
  objectsFromLocalStorage.forEach((item) => {
    if (item.isVisible === true) {
      item.isVisible = false;
    }
    notesArray.push(item);
    item.id = idCounter += 1;
    createElementFunction(notesArray[notesArray.length - 1]);
  });
}

if (localStorageStarFilter === "true") {
  starBtn.classList.add("active");
  starIcon.classList.add("active");
  starBtnNavBar(notesArray);
}

if (localStorageDateFilter === "true") {
  calenderBtn.classList.add("active");
  calenderIcon.classList.add("active");
  dateBtnNavBar(notesArray);
}

sidebar.addEventListener("click", () => {
  showSidebar();
});

submitBtn.addEventListener("click", () => {
  notesArray.push({
    id: (idCounter += 1),
    bodyColor: nColor.value,
    title: nTitle.value,
    dueIn: nDate.value,
    text: nBodyText.value,
    isVisible: false,
    isStar: false,
    isDate: false,
  });

  searchLine.value = null;
  nTitle.value = null;
  nBodyText.value = null;
  nDate.value = null;

  nTitleLabel.style.transform = "translateY(50%)";
  nBodyTextLabel.style.transform = "translateY(50%)";
  nBodyTextLabel.style.backgroundColor = "var(--formBackground)";
  nBodyTextLabel.style.padding = "0";

  localStorage.setItem("notes", JSON.stringify(notesArray));

  createElementFunction(notesArray[notesArray.length - 1]);
});

delAllBtn.addEventListener("click", () => {
  delAllPopUP.style.display = "flex";
  popUpBackground.style.display = "block";
  acceptBtn.addEventListener("click", () => {
    localStorage.clear();
    notesArray = [];
    nContainer.textContent = null;
    idCounter = -1;

    delAllPopUP.style.display = "none";
    popUpBackground.style.display = "none";
  });
  cancelBtn.addEventListener("click", () => {
    popUpBackground.style.display = "none";
    delAllPopUP.style.display = "none";
  });
});

//Design functions
nTitle.addEventListener("keyup", (e) => {
  if (nTitle.value != "") {
    nTitleLabel.style.padding = "0 1em";
    nTitleLabel.style.transform = "translateY(-50%) scale(0.9)";
  }
});

nTitle.addEventListener("focusin", () => {
  nTitleLabel.style.padding = "0 1em";
  nTitleLabel.style.transform = "translateY(-50%) scale(0.9)";
});

nTitle.addEventListener("focusout", () => {
  if (nTitle.value != "") {
    return;
  }
  nTitleLabel.style.transform = "translateY(50%)";
});

nBodyText.addEventListener("keyup", (e) => {
  if (nBodyText.value != "") {
    nBodyTextLabel.style.padding = "0 1em";
    nBodyTextLabel.style.transform = "translateY(-50%) scale(0.9)";
  }
});

nBodyText.addEventListener("focusin", () => {
  nBodyTextLabel.style.padding = "0 1em";
  nBodyTextLabel.style.backgroundColor = "var(--formBackground)";
  nBodyTextLabel.style.transform = "translateY(-50%) scale(0.9)";
});

nBodyText.addEventListener("focusout", () => {
  if (nBodyText.value != "") {
    return;
  }
  nBodyTextLabel.style.transform = "translateY(50%)";
  nBodyTextLabel.style.backgroundColor = "var(--formBackground)";
  nBodyTextLabel.style.padding = "0";
});

window.addEventListener("keydown", (e) => {
  if (
    nBodyText === document.activeElement &&
    e.key === "Enter" &&
    (e.metaKey || e.ctrlKey)
  ) {
    notesArray.push({
      id: (idCounter += 1),
      bodyColor: nColor.value,
      title: nTitle.value,
      dueIn: nDate.value,
      text: nBodyText.value,
      isVisible: false,
      isStar: false,
      isDate: false,
    });

    searchLine.value = null;
    nTitle.value = null;
    nBodyText.value = null;
    nDate.value = null;

    nTitleLabel.style.transform = "translateY(50%)";

    localStorage.setItem("notes", JSON.stringify(notesArray));

    createElementFunction(notesArray[notesArray.length - 1]);
  }
});

export { notesArray };
