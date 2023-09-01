import { nContainer } from "./variables.js";
import { notesArray } from "./script.js";

function createElementFunction(object) {
  const elementContainer = document.createElement("div");
  const nBody = document.createElement("div");
  const nTitle = document.createElement("p");
  const nBodyDueInDate = document.createElement("p");
  const nBodyText = document.createElement("p");
  const starBody = document.createElement("i");
  const options = document.createElement("i");
  const optionsDiv = document.createElement("div");
  const edit = document.createElement("i");
  const starOp = document.createElement("i");
  const acceptChanges = document.createElement("i");
  const deleteOp = document.createElement("i");
  const nBodyFooter = document.createElement("div");
  const nBodyCreatedDate = document.createElement("p");

  let createDate = new Date().toLocaleDateString("he-IL");
  let acceptDisplay = false;
  let starActive = false;

  elementContainer.className = "elementContainer";
  nBody.className = "nBody";
  nTitle.className = "nTitle";
  nBodyDueInDate.className = "nBodyDueInDate";
  nBodyText.className = "nBodyText";
  starBody.className = "bi-star-fill body";
  options.className = "bi-three-dots-vertical";
  options.id = object.id;
  optionsDiv.className = "optionsDiv";
  edit.className = "bi-pencil-square";
  starOp.className = "bi-star";
  starOp.id = object.id;
  acceptChanges.className = "bi-check2";
  deleteOp.className = "bi-trash3-fill";
  nBodyFooter.className = "nBodyFooter";
  nBodyCreatedDate.className = "nBodyCreatedDate";

  let noteTitleVar = object.title;
  let noteTitleVar2 =
    noteTitleVar.charAt(0).toUpperCase() + noteTitleVar.slice(1);
  nTitle.maxLength = 15;
  nTitle.textContent = noteTitleVar2;
  nTitle.contentEditable = false;
  nBodyDueInDate.textContent = `Due in: ${inputFormatDate(object.dueIn)}`;
  let noteTextVar = object.text;
  let noteTextVar2 = noteTextVar.charAt(0).toUpperCase() + noteTextVar.slice(1);
  nBodyText.maxLength = 180;
  nBodyText.textContent = noteTextVar2;
  nBodyText.contentEditable = false;
  nBodyCreatedDate.textContent = createDate;

  nContainer.appendChild(elementContainer);
  elementContainer.appendChild(nBody);
  elementContainer.appendChild(optionsDiv);
  nBody.appendChild(options);
  optionsDiv.appendChild(starOp);
  optionsDiv.appendChild(edit);
  optionsDiv.appendChild(deleteOp);
  if (object.title) {
    nBody.appendChild(nTitle);
  }
  if (
    object.dueIn != "Invalid Date" &&
    object.dueIn != "" &&
    object.dueIn != "undefined" &&
    object.dueIn != null
  ) {
    nBody.appendChild(nBodyDueInDate);
  }
  nBody.appendChild(nBodyText);
  nBody.appendChild(nBodyFooter);
  nBodyFooter.appendChild(nBodyCreatedDate);
  nBodyFooter.appendChild(starBody);

  if (object.bodyColor == 1) {
    nBody.style.backgroundColor = "var(--blueColor)";
  } else if (object.bodyColor == 2) {
    nBody.style.backgroundColor = "var(--greenColor)";
  } else if (object.bodyColor == 3) {
    nBody.style.backgroundColor = "var(--pinkColor)";
  } else if (object.bodyColor == 4) {
    nBody.style.backgroundColor = "var(--purpleColor)";
  } else if (object.bodyColor == 5) {
    nBody.style.backgroundColor = "var(--orangeColor)";
  } else if (object.bodyColor == 6) {
    nBody.style.backgroundColor = "var(--redColor)";
  } else {
    nBody.style.backgroundColor = "var(--yellowColor)";
  }

  if (object.isStar == true) {
    starOp.className = "bi-star-fill starOp";
    starBody.style.visibility = "visible";
    starBody.style.opacity = "0.5";
    starActive = true;
  }

  starOp.addEventListener("click", () => {
    starOpFunc();
  });

  options.addEventListener("click", (e) => {
    isVisible(options.id);
  });

  edit.addEventListener("click", () => {
    editFunc(options.id);
  });

  deleteOp.addEventListener("click", () => {
    nContainer.removeChild(elementContainer);
    notesArray.splice(object.id, 1);

    localStorage.setItem("notes", JSON.stringify(notesArray));

    return (object.id = 0);
  });

  function isStar(id) {
    if (notesArray[id].isStar == false) {
      return (notesArray[id].isStar = true);
    } else {
      return (notesArray[id].isStar = false);
    }
  }

  function isVisible(id) {
    if (notesArray[id].isVisible === false) {
      optionsDiv.style.transform = "translate(80px)";
      options.className = "bi-x";

      return (notesArray[id].isVisible = true);
    } else {
      optionsDiv.style.transform = "translate(-90px)";
      options.className = "bi-three-dots-vertical";

      return (notesArray[id].isVisible = false);
    }
  }

  function editFunc(id) {
    if (acceptDisplay === false) {
      nTitle.disabled = false;
      nBodyText.disabled = false;
      edit.className = "bi-check2";
      nBodyText.contentEditable = true;
      nTitle.contentEditable = true;
      // notesArray[id].isVisible = 0;

      return (acceptDisplay = true);
    } else {
      nTitle.disabled = true;
      nBodyText.disabled = true;
      edit.className = "bi-pencil-square";
      nBodyText.contentEditable = false;
      nTitle.contentEditable = false;

      notesArray[id]["text"] = nBodyText.textContent;
      notesArray[id]["title"] = nTitle.textContent;

      localStorage.setItem("notes", JSON.stringify(notesArray));

      return (acceptDisplay = false);
    }
  }

  function starOpFunc() {
    if (starActive === false) {
      starOp.className = "bi-star-fill starOp";
      starBody.style.visibility = "visible";
      starBody.style.opacity = "0.5";

      isStar(options.id);

      localStorage.setItem("notes", JSON.stringify(notesArray));

      return (starActive = true);
    } else {
      starOp.className = "bi-star";
      starBody.style.visibility = "hidden";
      starBody.style.opacity = "0";

      isStar(options.id);

      localStorage.setItem("notes", JSON.stringify(notesArray));

      return (starActive = false);
    }
  }
}

function inputFormatDate(inputDate) {
  if (inputDate) {
    const parsedDate = new Date(inputDate);
    const day = String(parsedDate.getDate()).padStart(1);
    const month = String(parsedDate.getMonth() + 1);
    const year = parsedDate.getFullYear();

    return `${day}.${month}.${year}`;
  }
}

export { createElementFunction };
