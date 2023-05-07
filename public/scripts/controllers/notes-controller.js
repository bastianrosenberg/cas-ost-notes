import { noteService } from "../../services/note-service.js";
import MarkupGenerator from "../utils/markup-generator.js";

const notesContainer = document.querySelector("#notes-container");

const form = document.querySelector("form");
const formSearch = document.querySelector("#search");

async function renderNotes(searchString) {
  const notes = await noteService.getNotes(searchString);
  notesContainer.innerHTML = MarkupGenerator.generateNotes(notes);
}

async function handleFormSubmitEvent(event) {
  event.preventDefault();
  await renderNotes(formSearch.value);
}

function initEventHandlers() {
  form?.addEventListener("submit", async (event) => {
    await handleFormSubmitEvent(event);
  });
}

async function init() {
  initEventHandlers();
  await renderNotes();
}

init();
