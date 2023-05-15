import { noteService } from "../../services/note-service.js";
import MarkupGenerator from "../utils/markup-generator.js";

const notesContainer = document.querySelector("#notes-container");

// const form = document.querySelector("form");
const searchInput = document.querySelector("#search");

const createButton = document.getElementById("button-create");

async function renderNotes(searchString) {
  const notes = await noteService.getNotes(searchString);
  notesContainer.innerHTML = MarkupGenerator.generateNotes(notes);
}

async function handleSearchInputEvent(searchString) {
  await renderNotes(searchString);
}

async function deleteNote(clickedElem) {
  await noteService
    .deleteNote(clickedElem.dataset.noteId)
    .then(() => {
      const noteElement = clickedElem.closest(".note");
      noteElement.remove();
      socket.emit("message", clickedElem.dataset.noteId);
    })
    .catch((err) => console.log("client error - TODO handle errors", err));
}

async function handleManipulateNoteEvent(event) {
  const clickedElement = event.target;

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
}

function initEventHandlers() {
  // form?.addEventListener("submit", async (event) => {
  //   await handleFormSubmitEvent(event);
  // });

  notesContainer?.addEventListener("click", async (event) => {
    await handleManipulateNoteEvent(event);
  });

  createButton.addEventListener("click", () => {
    window.location.href = `create`;
  });

  searchInput.addEventListener("keyup", async (event) => {
    if (event.target.value.length === 0 || event.target.value.length > 2) {
      await handleSearchInputEvent(event.target.value);
    }
  });
}

async function init() {
  // for sake of simplicity we get reload all notes but could also manipulate DOM by payload (id)
  socket.on("message", () => {
    renderNotes();
  });
  initEventHandlers();
  await renderNotes();
}

init();
