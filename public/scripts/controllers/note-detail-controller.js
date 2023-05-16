import { noteService } from "../../services/note-service.js";
import Note from "../../services/note.js";

const form = document.querySelector("form");
const cancelButton = document.getElementById("btn-cancel");

const title = document.querySelector("h1");
const formTitle = document.querySelector("#title");
const formDescription = document.querySelector("#description");
const formDueDate = document.querySelector("#duedate");
const submitButton = document.querySelector("#submit-button");
const formCompleted = document.querySelector("#completed");

const getImportance = () =>
  document.querySelector('input[name="importance"]:checked').value;

async function saveNote() {
  const newNote = new Note(
    formTitle.value,
    formDescription.value,
    moment(formDueDate.value).format(),
    getImportance(),
    formCompleted.checked
  );
  await noteService.createNote(newNote);
}
function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function updateNote() {
  const note = new Note(
    formTitle.value,
    formDescription.value,
    moment(formDueDate.value).format(),
    getImportance(),
    formCompleted.checked,
    getId()
  );
  await noteService.updateNote(note);
}

async function handleFormSubmitEvent(event) {
  event.preventDefault();

  if (getId()) {
    await updateNote();
  } else {
    await saveNote();
  }
  socket.emit("message", getId());
  window.location.href = "/";
}

function initEventHandlers() {
  form?.addEventListener("submit", async (event) => {
    await handleFormSubmitEvent(event);
  });

  cancelButton.addEventListener("click", () => {
    window.location.href = "/";
  });
}

async function handleEdit() {
  const id = getId();
  if (id) {
    const note = await noteService.getNote(id);
    const starSelector = `star${note.importance}`;
    formTitle.value = note.title;
    formDescription.value = note.description;
    formDueDate.value = moment(note.dueDate).format("yyyy-MM-DD");
    formCompleted.checked = note.completed;
    submitButton.textContent = "Update";
    title.textContent = "Update Note";
    document.getElementById(starSelector).checked = true;
  } else {
    document.getElementById("star3").checked = true;
    formDueDate.value = moment().format("yyyy-MM-DD");
    formCompleted.checked = false;
  }
}

async function init() {
  await handleEdit();
  initEventHandlers();
}

init();
