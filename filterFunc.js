import {
  starBtn,
  calenderBtn,
  starIcon,
  calenderIcon,
  nContainer,
} from "./variables.js";
import { notesArray } from "./script.js";
import { createElementFunction } from "./createElementFunc.js";

let starFiltered = false;
let dateFiltered = false;
let starClick = false;
let dateClick = false;

function starBtnNavBar(myArrayStar) {
  const starArray = [];
  for (let i = 0; i < myArrayStar.length; i++) {
    if (myArrayStar[i].isStar === true) {
      starArray.push(myArrayStar[i]);
      nContainer.replaceChildren();
      starFiltered = true;
      starArray.forEach((object) => {
        createElementFunction(object);
      });
    }
  }
}

function dateBtnNavBar(myArrayDate) {
  const dateArray = [];
  for (let i = 0; i < myArrayDate.length; i++) {
    if (myArrayDate[i].dueIn != "") {
      dateArray.push(myArrayDate[i]);
    }
    nContainer.replaceChildren();
    dateFiltered = true;
    sortDateNotes(dateArray);
    dateArray.forEach((object) => {
      createElementFunction(object);
    });
  }
}

function sortDateNotes(funcArray) {
  funcArray = funcArray.sort((note1, note2) => {
    let noteOne = new Date(note1.dueIn);
    let noteTwo = new Date(note2.dueIn);

    return noteOne - noteTwo;
  });
}

starBtn.addEventListener("click", () => {
  console.log(starClick);
  console.log(starFiltered);
  if (starClick === false && starFiltered === false) {
    starBtn.classList.add("active");
    starIcon.classList.add("active");
    localStorage.setItem("starFilterOn", true);
    starBtnNavBar(notesArray);

    return (starClick = true), (starFiltered = true);
  } else {
    starBtn.classList.remove("active");
    starIcon.classList.remove("active");
    localStorage.setItem("starFilterOn", false);
    nContainer.replaceChildren();
    notesArray.forEach((object) => {
      createElementFunction(object);
    });
    starClick = false;
    starFiltered = false;
  }
});

calenderBtn.addEventListener("click", () => {
  if (dateClick === false && dateFiltered === false) {
    calenderBtn.classList.add("active");
    calenderIcon.classList.add("active");
    localStorage.setItem("dateFilterOn", true);
    dateBtnNavBar(notesArray);

    return (dateClick = true), (dateFiltered = true);
  } else {
    calenderBtn.classList.remove("active");
    calenderIcon.classList.remove("active");
    localStorage.setItem("dateFilterOn", false);
    nContainer.replaceChildren();
    notesArray.forEach((object) => {
      createElementFunction(object);
    });
    dateClick = false;
    dateFiltered = false;
  }
});

export { starBtnNavBar, dateBtnNavBar };
