import { noteService } from "../../services/note-service.js";
import MarkupGenerator from "../utils/markup-generator.js";

const notesContainer = document.querySelector("#notes-container");
let searchFilter = "";
const sortNote = { field: "dueDate", sort: -1 };

const searchInput = document.querySelector("#search");
const createButton = document.querySelector("#button-create");

async function renderNotes() {
  const notes = await noteService.getNotes(searchFilter, sortNote);
  notesContainer.innerHTML = MarkupGenerator.generateNotes(notes);
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

async function toggleFinishState(element) {
  const note = await noteService.getNote(element.dataset.noteId);

  await noteService.updateNote({ ...note, completed: element.checked });
  socket.emit("message", element.dataset.noteId);
}

async function handleManipulateNoteEvent(event) {
  const clickedElement = event.target;

  switch (clickedElement.id) {
    case "delete-button":
      if (clickedElement.textContent === "Delete") {
        clickedElement.textContent = "Confirm";
        clickedElement.style.background = getComputedStyle(
          document.body
        ).getPropertyValue("--warn-color");
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

  if (clickedElement.type === "checkbox") {
    await toggleFinishState(clickedElement);
  }
}

async function initEventHandlers() {
  notesContainer?.addEventListener("click", async (event) => {
    await handleManipulateNoteEvent(event);
  });

  createButton.addEventListener("click", () => {
    window.location.href = "create";
  });

  const sortButtons = document.querySelectorAll(".btn.sort");
  sortButtons.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      sortNote.field = event.target.dataset.field;
      sortNote.sort *= -1;
      await renderNotes();
    });
  });

  searchInput.addEventListener("keyup", async (event) => {
    const stringLength = event.target.value.length;
    if (stringLength === 0 || stringLength > 2) {
      searchFilter = event.target.value;
      await renderNotes();
    }
  });
}

async function init() {
  // for sake of simplicity we reload all data
  socket.on("message", () => {
    renderNotes();
  });
  await initEventHandlers();
  await renderNotes();
}

init();
