import { notesArray } from "./script.js";
import { searchLine, searchIcon, nContainer } from "./variables.js";
import { createElementFunction } from "./createElementFunc.js";

function search(keyValue, myArray) {
  const searchArray = [];
  for (let i = 0; i < myArray.length; i++) {
    if (keyValue.trim() !== "") {
      if (myArray[i].text.includes(keyValue)) {
        searchArray.push(myArray[i]);
        nContainer.replaceChildren();
        searchArray.forEach((object) => {
          createElementFunction(object);
        });
      } else if (myArray[i].title.includes(keyValue)) {
        searchArray.push(myArray[i]);
        nContainer.replaceChildren();
        searchArray.forEach((object) => {
          createElementFunction(object);
        });
      }
    }
  }
}

searchLine.addEventListener("focusin", () => {
  searchIcon.className = "bi-x-circle";
  searchIcon.addEventListener("click", () => {
    searchLine.value = null;
    searchIcon.className = "bi-search";
    if (searchLine.value == "") {
      nContainer.replaceChildren();
      notesArray.forEach((item) => {
        createElementFunction(item);
      });
    }
  });
});

searchLine.addEventListener("keyup", (e) => {
  let keyValue = e.target.value;
  keyValue.toLowerCase()

  if (searchLine.value != "") {
    setTimeout(function () {
      if (searchLine.value == "") {
        return;
      }
      search(keyValue, notesArray);
    }, 2000);
  } else if (searchLine.value == "") {
    nContainer.replaceChildren();
    notesArray.forEach((item) => {
      createElementFunction(item);
      return;
    });
  }
});

searchLine.addEventListener("focusout", () => {
  if (searchLine.value != "") {
    return;
  }
  searchIcon.className = "bi-search";
});

export { search };
