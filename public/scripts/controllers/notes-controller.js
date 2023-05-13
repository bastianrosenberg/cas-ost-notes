import { noteService } from "../../services/note-service.js";
import MarkupGenerator from "../utils/markup-generator.js";

const notesContainer = document.querySelector("#notes-container");

const form = document.querySelector("form");
const formSearch = document.querySelector("#search");

const createButton = document.getElementById("button-create");

async function renderNotes(searchString) {
  const notes = await noteService.getNotes(searchString);
  notesContainer.innerHTML = MarkupGenerator.generateNotes(notes);
}

async function handleFormSubmitEvent(event) {
  event.preventDefault();
  await renderNotes(formSearch.value);
}

async function deleteNote(clickedElem) {
  await noteService
    .deleteNote(clickedElem.dataset.noteId)
    .then((res) => {
      const noteElement = clickedElem.closest(".note");
      noteElement.remove();
    })
    .catch((err) => console.log("client error - TODO handle errors", err));
}

async function handleManipulateNoteEvent(event) {
  const clickedElement = event.target;

  // if (clickedElement.id === editButtonId) {
  // editNote(clickedElement);
  // }

  switch (clickedElement.id) {
    case "delete-button":
      if (clickedElement.value === "Delete") {
        clickedElement.value = "Confirm";
      } else {
        await deleteNote(clickedElement);
      }
      break;
    case "edit-button":
      window.location.href = `/edit?id=${clickedElement.dataset.noteId}`;
      break;
    default:
      break;
  }

  // if (clickedElement.type === "checkbox") {
  //   await toggleFinishState(clickedElement);
  // }
  // }

  // Edit Note
  // function editNote(clickedElem) {
  //   window.location.href = `edit?id=${getNoteIdFromChildElem(clickedElem)}`;
  // }
}

function initEventHandlers() {
  form?.addEventListener("submit", async (event) => {
    await handleFormSubmitEvent(event);
  });

  notesContainer?.addEventListener("click", async (event) => {
    await handleManipulateNoteEvent(event);
  });

  createButton.addEventListener("click", () => {
    window.location.href = `create`;
  });
}

async function init() {
  initEventHandlers();
  await renderNotes();
}

init();
