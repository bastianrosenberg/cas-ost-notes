import { noteService } from "../../services/note-service.js";
import Note from "../../services/note.js";

const form = document.querySelector("form");

const formTitle = document.querySelector("#title");
const formDescription = document.querySelector("#description");
const submitButton = document.querySelector("#submit-button");

async function saveNote() {
  const newNote = new Note(formTitle.value, formDescription.value);
  await noteService.createNote(newNote);
}
function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function updateNote() {
  const note = new Note(formTitle.value, formDescription.value, getId());
  await noteService.updateNote(note);
}

async function handleFormSubmitEvent(event) {
  event.preventDefault();

  if (getId()) {
    await updateNote();
  } else {
    await saveNote();
  }

  window.location.href = "/";
}

function initEventHandlers() {
  form?.addEventListener("submit", async (event) => {
    await handleFormSubmitEvent(event);
  });
}

async function handleEdit() {
  const id = getId();
  if (id) {
    const note = await noteService.getNote(id);
    formTitle.value = note.title;
    formDescription.value = note.description;
    submitButton.textContent = "Update";
  }
}

async function init() {
  await handleEdit();
  initEventHandlers();
}

init();
