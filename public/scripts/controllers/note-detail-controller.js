import { noteService } from "../../services/note-service.js";
import { Note } from "../../services/note.js";

const form = document.querySelector('form');

const formTitle = document.querySelector('#title');
const formDescription = document.querySelector('#description');


async function handleFormSubmitEvent(event){
    event.preventDefault();

    await saveNote();

    window.location.href = "/";
}

async function saveNote() {
    const newNote = new Note(undefined, formTitle.value, formDescription.value);
    await noteService.createNote(newNote);
}

function initEventHandlers() {
    form?.addEventListener('submit', async (event) => {
        await handleFormSubmitEvent(event);
    });
}

function init() {
    initEventHandlers()
}

init();